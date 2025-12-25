<?php

namespace app\controllers;

use yii\filters\Cors;
use yii\rest\ActiveController;

class AccountController extends ActiveController
{
    public $modelClass = 'app\models\Account';

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
}
