# Mini Instagram con Laravel, Inertia y React

Este proyecto es un clon sencillo de Instagram construido con [Laravel](https://laravel.com), [Inertia](https://inertiajs.com) y React. Permite a los usuarios registrarse, publicar imágenes, comentar y gestionar su perfil.

## Requisitos

- PHP >= 8.2 con las extensiones **pdo_mysql** y **mbstring**
- Composer
- Node.js y npm
- MySQL u otra base de datos compatible

## Instalación

1. Clona el repositorio y accede al directorio del proyecto:
   ```bash
   git clone <repo-url>
   cd instagram
   ```
2. Instala las dependencias de PHP y JavaScript:
   ```bash
   composer install
   npm install
   ```
3. Copia el archivo `.env.example` a `.env` y ajusta la configuración de la base de datos.
4. Genera la clave de la aplicación y ejecuta las migraciones:
   ```bash
   php artisan key:generate
   php artisan migrate
   ```
5. Crea el enlace simbólico a la carpeta `storage` para servir las imágenes:
   ```bash
   php artisan storage:link
   ```

## Uso

Para iniciar el entorno de desarrollo puedes ejecutar:
```bash
composer dev
```
Este comando levanta el servidor de Laravel, la cola de trabajos y Vite de forma simultánea. También puedes ejecutarlos por separado con `php artisan serve` y `npm run dev`.

Una vez iniciado, visita `http://localhost:8000` para acceder a la aplicación.

## Pruebas

Las pruebas están escritas con [Pest](https://pestphp.com). Para ejecutarlas:
```bash
php artisan test
```

## Licencia

Este proyecto se distribuye bajo la licencia MIT.
