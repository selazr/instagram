<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Image extends Model
{
    use HasFactory;

    /**
     * Els atributs que són assignables en massa.
     *
     * @var array<string>
     */
    protected $fillable = [
        'user_id',
        'image_path',
        'description',
    ];

    /**
     * Obtenir l'usuari propietari de la imatge.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Obtenir els comentaris de la imatge.
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Obtenir els likes de la imatge.
     */
    public function likes(): HasMany
    {
        return $this->hasMany(Like::class);
    }
}
