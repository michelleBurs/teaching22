<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Image extends Model
{
    use HasFactory;

    protected $fillable = ['url'];

    public function offers() : HasMany {
        return $this->hasMany(Offer::class);
    }

    public function users() : HasMany {
        return $this->hasMany(User::class);
    }

}
