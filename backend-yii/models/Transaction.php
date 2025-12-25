<?php

namespace app\models;

use yii\db\ActiveRecord;

class Transaction extends ActiveRecord
{
    public static function tableName()
    {
        return 'transaction';
    }

    public function rules()
    {
        return [
            [['date', 'description', 'amount', 'type'], 'required'],
            [['date'], 'date', 'format' => 'php:Y-m-d'],
            [['amount'], 'number'],
            [['type'], 'in', 'range' => ['income', 'expense']],
            [['category'], 'string', 'max' => 100],
            [['description'], 'string', 'max' => 255],
            [['account_id'], 'integer'],
            [
                ['account_id'],
                'exist',
                'skipOnError' => true,
                'targetClass' => Account::class,
                'targetAttribute' => ['account_id' => 'id']
            ],

        ];
    }

    public function fields()
    {
        return [
            'id',
            'date',
            'description',
            'amount',
            'type',
            'category',
            'account_id',
            'account_id',
            'account' => function () {
                return $this->account ? [
                    'id' => $this->account->id,
                    'name' => $this->account->name,
                    'type' => $this->account->type,
                ] : null;
            },

        ];
    }

    public function getAccount()
    {
        return $this->hasOne(Account::class, ['id' => 'account_id']);
    }
}
