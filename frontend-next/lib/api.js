const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

async function handleResponse(res, defaultErrorMessage) {
  if (!res.ok) {
    let message = defaultErrorMessage;
    try {
      const body = await res.json();
      if (Array.isArray(body)) {
        message = body.map((e) => `${e.field}: ${e.message}`).join(', ');
      } else if (body && body.message) {
        message = body.message;
      }
    } catch (_) {}
    throw new Error(message);
  }
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

export async function apiGet(path, params = {}) {
  const url = new URL(API_BASE + path);
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== '') {
      url.searchParams.append(key, params[key]);
    }
  });

  const res = await fetch(url.toString());
  return handleResponse(res, 'Failed to fetch data');
}

export async function apiPost(path, data) {
  const res = await fetch(API_BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res, 'Failed to create record');
}

export async function apiPut(path, data) {
  const res = await fetch(API_BASE + path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res, 'Failed to update record');
}

export async function apiDelete(path) {
  const res = await fetch(API_BASE + path, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete record');
  }
  return true;
}