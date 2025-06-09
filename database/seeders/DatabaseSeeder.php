<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Image;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Aseguramos que el usuario 4 exista o lo creamos
        $user = User::factory()->create([
            'id' => 4, // solo si la tabla está vacía o acabas de migrar
            'name' => 'César',
            'email' => 'selazr@protonmail.com',
            'nick' => 'selazr',
        ]);

        // Creamos 15 imágenes para ese usuario
        Image::factory(15)->create([
            'user_id' => $user->id,
        ]);
    }
}
