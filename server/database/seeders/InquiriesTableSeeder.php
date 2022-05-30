<?php

namespace Database\Seeders;

use DateTime;
use Illuminate\Database\Seeder;
use App\Models\Inquirie;


class InquiriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // inquiry 1
        $inquiry1 = new Inquirie();
        $inquiry1->text = "Hello! I would be very happy to have your help. Can you do it an hour later?";
        $inquiry1->status = 1;
        $inquiry1->date = new DateTime("2022-06-06");
        $inquiry1->startTime = new DateTime("2022-06-06T14:00:00.000Z");
        $inquiry1->endTime = new DateTime("2022-06-06T16:00:00.000Z");

        $offerId_inquiry1 = \App\Models\Offer::all()->find(1);
        $inquiry1->offer()->associate($offerId_inquiry1);

        $userId_inquiry1 = \App\Models\User::all()->find(3);
        $inquiry1->user()->associate($userId_inquiry1);

        $inquiry1->save();


        // inquiry 2
        $inquiry2 = new Inquirie();
        $inquiry2->text = "";
        $inquiry2->status = 1;
        $inquiry2->date = new DateTime("2022-05-19");
        $inquiry2->startTime = new DateTime("2022-06-06T13:00:00.000Z");
        $inquiry2->endTime = new DateTime("2022-06-06T15:00:00.000Z");

        $offerId_inquiry2 = \App\Models\Offer::all()->find(1);
        $inquiry2->offer()->associate($offerId_inquiry2);

        $userId_inquiry2 = \App\Models\User::all()->find(4);
        $inquiry2->user()->associate($userId_inquiry2);

        $inquiry2->save();


        // inquiry 3
        $inquiry3 = new Inquirie();
        $inquiry3->text = "Hello Felix! I would be totally interested in your offer. Unfortunately I can only do it
         2 days later. How does it look for you?";
        $inquiry3->status = 1;
        $inquiry3->date = new DateTime("2022-06-06");
        $inquiry3->startTime = new DateTime("2022-06-06T13:00:00.000Z");
        $inquiry3->endTime = new DateTime("2022-06-06T15:00:00.000Z");

        $offerId_inquiry3 = \App\Models\Offer::all()->find(2);
        $inquiry3->offer()->associate($offerId_inquiry3);

        $userId_inquiry3 = \App\Models\User::all()->find(4);
        $inquiry3->user()->associate($userId_inquiry3);

        $inquiry3->save();
    }
}
