import { usePage } from '@inertiajs/react';

export default function Feed() {
    const { images } = usePage().props;

    return (
        <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Instagram Feed 🖼️</h1>

            <div className="space-y-6">
                {images.data.map((image) => (
                    <div key={image.id} className="border rounded-lg shadow p-4">
                        <p className="text-sm text-gray-600 mb-1">
                            <strong>{image.user.name}</strong> @{image.user.nick}
                        </p>
                        <img
                            src={`/storage/${image.image_path}`}
                            alt={image.description}
                            className="w-full rounded"
                        />
                        <p className="mt-2 text-gray-800">{image.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
