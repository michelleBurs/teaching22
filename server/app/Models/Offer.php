<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Offer extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'date', 'startTime', 'endTime',
        'status', 'course_id', 'user_id', 'image_id'];

    public function course() : BelongsTo {
        return $this->belongsTo(Course::class);
    }

    public function image() : BelongsTo {
        return $this->belongsTo(Image::class);
    }

    public function user() : BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function inquiries() : HasMany {
        return $this->hasMany(Inquirie::class);
    }

    /* public function isOpen():bool {
         return $this->status = 1;
     } */


}
