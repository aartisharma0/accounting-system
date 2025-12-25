<?php

namespace app\controllers;

use Yii;
use yii\filters\Cors;
use yii\web\Response;
use app\models\Transaction;
use yii\rest\ActiveController;
use yii\filters\ContentNegotiator;

class TransactionController extends ActiveController
{
    public $modelClass = Transaction::class;

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

    // Override index to add filters
    public function actions()
    {
        $actions = parent::actions();

        $actions['index']['prepareDataProvider'] = function () {
            $query = Transaction::find();
            $request = Yii::$app->request;

            $from = $request->get('from');
            $to = $request->get('to');
            $type = $request->get('type');
            $category = $request->get('category');
            $accountId = $request->get('account_id');

            if ($from) {
                $query->andWhere(['>=', 'date', $from]);
            }
            if ($to) {
                $query->andWhere(['<=', 'date', $to]);
            }
            if ($type) {
                $query->andWhere(['type' => $type]);
            }
            if ($category) {
                $query->andWhere(['category' => $category]);
            }
            if ($accountId) {
                $query->andWhere(['account_id' => $accountId]);
            }

            return new \yii\data\ActiveDataProvider([
                'query' => $query->orderBy(['date' => SORT_DESC, 'id' => SORT_DESC]),
            ]);
        };

        return $actions;
    }
}
