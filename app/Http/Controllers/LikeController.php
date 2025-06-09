<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class LikeController extends Controller
{
    public function store(Request $request, Image $image)
    {
        $like = Like::firstOrCreate([
            'image_id' => $image->id,
            'user_id' => Auth::id(),
        ]);

        if ($request->wantsJson()) {
            $image->loadCount('likes');
            return response()->json([
                'liked' => true,
                'count' => $image->likes_count,
            ]);
        }

        return Redirect::back();
    }

    public function destroy(Request $request, Image $image)
    {
        Like::where('image_id', $image->id)
            ->where('user_id', Auth::id())
            ->delete();

        if ($request->wantsJson()) {
            $image->loadCount('likes');
            return response()->json([
                'liked' => false,
                'count' => $image->likes_count,
            ]);
        }

        return Redirect::back();
    }
}
