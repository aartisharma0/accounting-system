import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
  { href: '/transactions', label: 'Transactions' },
  { href: '/add-transaction', label: 'Add Transaction' },
  { href: '/overview', label: 'Accounts Overview' },
  { href: '/report', label: 'Reports' },
];

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <div className="app-root">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="logo-dot" />
          <span className="logo-text">Simple Accounting</span>
        </div>
        <nav className="nav-menu">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <span className="sidebar-footer-text">Demo app · Next.js + Yii2</span>
        </div>
      </aside>
      <main className="main-content">
        <div className="main-inner">{children}</div>
      </main>
    </div>
  );
}