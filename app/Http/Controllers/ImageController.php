<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ImageController extends Controller
{
    /**
     * Display the specified image with its details.
     */
    public function show($id): \Inertia\Response
{
    $image = Image::with(['user', 'comments.user', 'likes'])->findOrFail($id);

    return Inertia::render('Images/Show', [
        'image' => $image,
    ]);

}



}
