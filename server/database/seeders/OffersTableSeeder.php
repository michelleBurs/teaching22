<?php

namespace Database\Seeders;

use DateTime;
use Illuminate\Database\Seeder;
use App\Models\Offer;

class OffersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // offer 1
        $offer1 = new Offer();
        $offer1->title = "Writing speaker texts";
        $offer1->description = "I will help you to write easy-to-understand and user-oriented texts for your e-learning
        project.";
        $offer1->date = new DateTime(2022-06-06);
        $offer1->startTime = new DateTime(  "2022-06-06T13:00:00.000Z");
        $offer1->endTime = new DateTime("2022-06-06T15:00:00.000Z");
        $offer1->status = 1;

        $courseId_offer1 = \App\Models\Course::all()->find(1);
        $offer1->course()->associate($courseId_offer1);

        $userId_offer1 = \App\Models\User::all()->find(2);
        $offer1->user()->associate($userId_offer1);

        $imageId_offer1 = \App\Models\Image::all()->find(7);
        $offer1->image()->associate($imageId_offer1);
        $offer1->save();


        // offer 2
        $offer2 = new Offer();
        $offer2->title = "Java Basics";
        $offer2->description = "This tutorial is prepared for you to help you understand the basic concepts related to
         the Java programming language.";
        $offer2->date = new DateTime("2022-06-04");
        $offer2->startTime = new DateTime(  "2022-06-06T13:00:00.000Z");
        $offer2->endTime = new DateTime("2022-06-06T15:00:00.000Z");
        $offer2->status = 1;

        $courseId_offer2 = \App\Models\Course::all()->find(2);
        $offer2->course()->associate($courseId_offer2);

        $userId_offer2 = \App\Models\User::all()->find(1);
        $offer2->user()->associate($userId_offer2);

        $imageId_offer2 = \App\Models\Image::all()->find(6);
        $offer2->image()->associate($imageId_offer2);
        $offer2->save();


        // offer 3
        $offer3 = new Offer();
        $offer3->title = "Database Basics";
        $offer3->description = "I help you understand the basics of database management systems. We use helpful
        analogies to explain a general overview of spreadsheet, table and database management systems.";
        $offer3->date = new DateTime("2022-05-29");
        $offer3->startTime = new DateTime(  "2022-06-06T13:00:00.000Z");
        $offer3->endTime = new DateTime("2022-06-06T15:00:00.000Z");
        $offer3->status = 1;

        $courseId_offer3 = \App\Models\Course::all()->find(4);
        $offer3->course()->associate($courseId_offer3);

        $userId_offer3 = \App\Models\User::all()->find(1);
        $offer3->user()->associate($userId_offer3);

        $imageId_offer3 = \App\Models\Image::all()->find(8);
        $offer3->image()->associate($imageId_offer3);
        $offer3->save();
    }
}
