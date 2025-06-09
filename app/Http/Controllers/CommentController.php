<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'image_id' => 'required|exists:images,id',
            'content' => 'required|string|max:500',
        ]);

        Comment::create([
            'user_id' => Auth::id(),
            'image_id' => $request->image_id,
            'content' => $request->content,
        ]);

        return $request->wantsJson()
            ? response()->json(['message' => 'created'])
            : back();
    }

    public function update(Request $request, Comment $comment)
    {
        if ($comment->user_id !== Auth::id()) {
            abort(403, 'No tienes permiso para editar este comentario.');
        }

        $request->validate([
            'content' => 'required|string|max:500',
        ]);

        $comment->update([
            'content' => $request->input('content'),
        ]);

        return $request->wantsJson()
            ? response()->json(['message' => 'updated'])
            : back();
    }

    public function destroy(Request $request, Comment $comment)
    {
        if ($comment->user_id !== Auth::id()) {
            abort(403, 'No tienes permiso para eliminar este comentario.');
        }

        $comment->delete();

        return $request->wantsJson()
            ? response()->json(['message' => 'deleted'])
            : back();
    }
}
