<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(): \Inertia\Response
    {
        $images = Image::with(['user', 'comments', 'likes']) // ⬅ Añadido eager loading
            ->orderBy('created_at', 'desc')
            ->paginate(5);

        return Inertia::render('Dashboard', [
            'images' => $images,
        ]);
    }
}
