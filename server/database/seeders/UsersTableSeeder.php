<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;


class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // user 1
        $lector1 = new User();
        $lector1->firstName = "Felix";
        $lector1->lastName = "Fetzig";
        $lector1->phoneNumber = "+43 123 324 435";
        $lector1->email = "felix.fetzig@gmail.com";
        $lector1->password = bcrypt('letmein');
        $lector1->language = "English";
        $lector1->education = "Hi, I'm Felix and I'm currently studying KWM in the sixth semester at FH Hagenberg. I
        love programming. I would be happy to help you get a foothold in these areas.";
        $lector1->role = 1;

        $img_lector1 = \App\Models\Image::all()->find(3);
        $lector1->image()->associate($img_lector1);

        $lector1->save();


        // user 2
        $lector2 = new User();
        $lector2->firstName = "Mia";
        $lector2->lastName = "Mauler";
        $lector2->phoneNumber = "+43 667 113 456 ";
        $lector2->email = "mia.mauler@gmail.com";
        $lector2->password = bcrypt('letmein');
        $lector2->language = "English";
        $lector2->education = "Hello you! I am Mia. I'm currently studying KWM at the FH Hagenberg. Since I'm already
        in my sixth semester and have always had a good grasp of things, I can certainly help you with some of the topics.";
        $lector2->role = 1;

        $img_lector2 = \App\Models\Image::all()->find(4);
        $lector2->image()->associate($img_lector2);

        $lector2->save();


        // user 3
        $student1 = new User();
        $student1->firstName = "Lara";
        $student1->lastName = "Well";
        $student1->phoneNumber = "+43 455 040 982";
        $student1->email = "lara.well@gmail.com";
        $student1->password = bcrypt('letmein');
        $student1->language = "English";
        $student1->education = "FH Steyr";
        $student1->role = 2;

        $img_student1 = \App\Models\Image::all()->find(5);
        $student1->image()->associate($img_student1);

        $student1->save();


        // user 4
        $student2 = new User();
        $student2->firstName = "Rainer";
        $student2->lastName = "Zufall";
        $student2->phoneNumber = "+43 113 456 029";
        $student2->email = "rainer.zufall@gmail.com";
        $student2->password = bcrypt('letmein');
        $student2->language = "English";
        $student2->education = "FH Linz";
        $student2->role = 2;

        $img_student2 = \App\Models\Image::all()->find(2);
        $student2->image()->associate($img_student2);

        $student2->save();
    }
}
