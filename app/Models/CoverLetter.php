<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CoverLetter extends Model
{
    /** @use HasFactory<\Database\Factories\CoverLetterFactory> */
    use HasFactory;
    protected $fillable = [
            'url',
            'chat',
            'company',
            'contact_name',
            'status',
            'title',
            'info',
            'content',
        ];
}
