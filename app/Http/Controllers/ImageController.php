<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;


class ImageController extends Controller
{
    public function create(): \Inertia\Response
    {
        return Inertia::render('Images/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => ['nullable', 'image', 'max:4096'],
            'image_url' => ['nullable', 'url'],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        if (!$request->hasFile('image') && empty($validated['image_url'])) {
            return Redirect::back()->withErrors(['image' => 'Debe subir una imagen o indicar una URL.']);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
        } else {
            try {
                $response = Http::timeout(10)->get($validated['image_url']);
                if (!$response->successful()) {
                    return Redirect::back()->withErrors(['image_url' => 'No se pudo descargar la imagen.']);
                }
                $contents = $response->body();
                $ext = pathinfo(parse_url($validated['image_url'], PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'jpg';
                $path = 'images/' . uniqid() . '.' . $ext;
                Storage::disk('public')->put($path, $contents);
            } catch (\Exception $e) {
                return Redirect::back()->withErrors(['image_url' => 'No se pudo descargar la imagen.']);
            }
        }

        $image = Image::create([
            'user_id' => Auth::id(),
            'image_path' => $path,
            'description' => $validated['description'] ?? null,
        ]);

        return Redirect::route('images.show', $image->id);
    }

    public function edit(Image $image): \Inertia\Response
    {
        if ($image->user_id !== Auth::id()) {
            abort(403, 'No tienes permiso para editar esta imagen.');
        }

        return Inertia::render('Images/Edit', [
            'image' => $image,
        ]);
    }

    public function update(Request $request, Image $image)
    {
        if ($image->user_id !== Auth::id()) {
            abort(403, 'No tienes permiso para editar esta imagen.');
        }

        $validated = $request->validate([
            'image' => ['nullable', 'image', 'max:4096'],
            'image_url' => ['nullable', 'url'],
            'description' => ['nullable', 'string', 'max:500'],
        ]);

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($image->image_path);
            $image->image_path = $request->file('image')->store('images', 'public');
        } elseif (!empty($validated['image_url'])) {
            Storage::disk('public')->delete($image->image_path);
            try {
                $response = Http::timeout(10)->get($validated['image_url']);
                if ($response->successful()) {
                    $contents = $response->body();
                    $ext = pathinfo(parse_url($validated['image_url'], PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'jpg';
                    $path = 'images/' . uniqid() . '.' . $ext;
                    Storage::disk('public')->put($path, $contents);
                    $image->image_path = $path;
                }
            } catch (\Exception $e) {
                return Redirect::back()->withErrors(['image_url' => 'No se pudo descargar la imagen.']);
            }
        }

        $image->description = $validated['description'] ?? $image->description;
        $image->save();

        return Redirect::route('images.show', $image->id);
    }

    public function destroy(Image $image)
    {
        if ($image->user_id !== Auth::id()) {
            abort(403, 'No tienes permiso para eliminar esta imagen.');
        }

        Storage::disk('public')->delete($image->image_path);
        $image->delete();

        return Redirect::route('dashboard');
    }
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
