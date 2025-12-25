<?php

namespace app\controllers;

use yii\rest\Controller;
use yii\filters\Cors;
use yii\filters\ContentNegotiator;
use yii\web\Response;
use Yii;
use app\models\Transaction;

class SummaryController extends Controller
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => ['http://localhost:3000'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                'Access-Control-Request-Headers' => ['*'],
                'Allow-Credentials' => true,
            ],
        ];

        return $behaviors;
    }



    public function actionIndex()
    {
        $request = Yii::$app->request;
        $from = $request->get('from');
        $to = $request->get('to');
        $category = $request->get('category');
        $type = $request->get('type');
        $accountId = $request->get('account_id');

        $query = Transaction::find();

        if ($from) $query->andWhere(['>=', 'date', $from]);
        if ($to) $query->andWhere(['<=', 'date', $to]);
        if ($category) $query->andWhere(['category' => $category]);
        if ($type) $query->andWhere(['type' => $type]);
        if ($accountId) $query->andWhere(['account_id' => $accountId]);

        $income = clone $query;
        $expense = clone $query;

        $totalIncome = (float)$income->andWhere(['type' => 'income'])->sum('amount');
        $totalExpense = (float)$expense->andWhere(['type' => 'expense'])->sum('amount');
        $balance = $totalIncome - $totalExpense;

        return [
            'totalIncome' => $totalIncome,
            'totalExpenses' => $totalExpense,
            'balance' => $balance,
        ];
    }
}
