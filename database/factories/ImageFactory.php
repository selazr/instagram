<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

class ImageFactory extends Factory
{
    public function definition(): array
{
    // Usamos siempre la misma imagen
    return [
        'image_path' => 'images/gato.jpg', // o default.jpg
        'description' => fake()->sentence(),
    ];
}

}