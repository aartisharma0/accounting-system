<?php

namespace app\controllers;

use yii\rest\Controller;
use yii\filters\Cors;
use yii\filters\ContentNegotiator;
use yii\web\Response;
use Yii;
use app\models\Transaction;

class ReportController extends Controller
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


    public function actionIndex($month = null)
    {
        // month format: YYYY-MM
        if (!$month) {
            $month = date('Y-m');
        }

        $startDate = $month . '-01';
        $endDate = date('Y-m-t', strtotime($startDate));

        $query = Transaction::find()
            ->andWhere(['between', 'date', $startDate, $endDate]);

        $income = (float)(clone $query)->andWhere(['type' => 'income'])->sum('amount');
        $expense = (float)(clone $query)->andWhere(['type' => 'expense'])->sum('amount');

        return [
            'month' => $month,
            'totalIncome' => $income,
            'totalExpenses' => $expense,
        ];
    }
}