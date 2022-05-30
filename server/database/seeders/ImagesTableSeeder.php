<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Image;


class ImagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //placeholder offer
        $image1 = new Image();
        $image1->url = "https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640";
        $image1->save();

        // placeholder user
        $image2 = new Image();
        $image2->url = "https://www.pngitem.com/pimgs/m/99-998739_dale-engen-person-placeholder-hd-png-download.png";
        $image2->save();


        // user 1
        $image3 = new Image();
        $image3->url = "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
        $image3->save();

        // user 2
        $image4 = new Image();
        $image4->url = "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
        $image4->save();

        // user 3
        $image5 = new Image();
        $image5->url = "https://images.pexels.com/photos/1966002/pexels-photo-1966002.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
        $image5->save();


        // offer 1
        $image6 = new Image();
        $image6->url = "https://images.pexels.com/photos/1316897/pexels-photo-1316897.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
        $image6->save();

        // offer 2
        $image7 = new Image();
        $image7->url = "https://images.pexels.com/photos/3466163/pexels-photo-3466163.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
        $image7->save();

        // offer 3
        $image8 = new Image();
        $image8->url = "https://images.pexels.com/photos/5408005/pexels-photo-5408005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
        $image8->save();
    }
}
