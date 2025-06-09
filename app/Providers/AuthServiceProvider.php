<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

// IMPORTA LOS MODELOS Y POLÍTICAS
use App\Models\Comment;
use App\Policies\CommentPolicy;

class AuthServiceProvider extends ServiceProvider
{
    // OPCIONAL: también puedes usar este array
    protected $policies = [
        Comment::class => CommentPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        // REGISTRA LAS POLÍTICAS MANUALMENTE (opcional si ya usaste el array de arriba)
        Gate::policy(Comment::class, CommentPolicy::class);
    }
}
