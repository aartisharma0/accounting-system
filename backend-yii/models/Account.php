<?php

namespace app\models;

use yii\db\ActiveRecord;

class Account extends ActiveRecord
{
    public static function tableName()
    {
        return 'account';
    }

    public function rules()
    {
        return [
            [['name', 'type'], 'required'],
            [['name'], 'string', 'max' => 100],
            [['type'], 'in', 'range' => ['Cash', 'Bank', 'Credit Card']],
        ];
    }

    public function fields()
    {
        return [
            'id',
            'name',
            'type',
        ];
    }
}