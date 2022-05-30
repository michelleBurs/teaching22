<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInquiriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('text')->nullable();
            $table->date('date')->useCurrent();
            $table->dateTime('startTime')->useCurrent();
            $table->dateTime('endTime')->useCurrent();
            $table->integer('status')->default(1); // 1=waiting | 2=accepted | 3=rejected |
            // 4=successfully completed | 5=NOT successfully completed
            $table->foreignId('offer_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // id from student
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inquiries');
    }
}
