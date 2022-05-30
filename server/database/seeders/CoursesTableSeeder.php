<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Course;


class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $course1 = new Course();
        $course1->title = "E-Learning";
        $course1->save();

        $course2 = new Course();
        $course2->title = "Programming";
        $course2->save();

        $course3 = new Course();
        $course3->title = "Online Marketing";
        $course3->save();

        $course4 = new Course();
        $course4->title = "Database";
        $course4->save();

        $course5 = new Course();
        $course5->title = "Communication Management";

        $course5->save();
    }
}
