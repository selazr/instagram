import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

export default function Dashboard() {
    const { props } = usePage();
    const [error, setError] = useState(null);

    const images = props.images ?? { data: [] };
    const user = props.auth?.user;

    useEffect(() => {
        try {
            if (!Array.isArray(images.data)) {
                throw new Error('❌ images.data no es un array válido.');
            }
        } catch (err) {
            console.error('🚨 Error en Dashboard.jsx:', err);
            setError(err.message);
        }
    }, [images]);

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Dashboard" />

            <div className="py-8 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Inicio</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                        ⚠️ Error: {error}
                    </div>
                )}

                {images.data.length === 0 ? (
                    <p className="text-gray-500">Encara no hi ha imatges.</p>
                ) : (
                    <div className="space-y-6">
                        {images.data.map((image) => (
                            <Link
                                key={image.id}
                                href={route('images.show', image.id)}
                                className="block bg-white shadow rounded p-4 hover:bg-gray-100 hover:shadow-md transition duration-300 ease-in-out cursor-pointer"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-gray-700">
                                        {image.user?.name}{' '}
                                        <span className="text-gray-500">@{image.user?.nick}</span>
                                    </p>
                                    <span className="text-xs text-gray-400">
                                        {moment(image.created_at).fromNow()}
                                    </span>
                                </div>

                                <img
                                    src={`/storage/${image.image_path}`}
                                    alt={image.description}
                                    className="rounded w-full mt-2"
                                    onError={() =>
                                        setError(`⚠️ No se pudo cargar la imagen: ${image.image_path}`)
                                    }
                                />

                                <p className="mt-2 text-gray-700">{image.description}</p>

                                <div className="flex items-center mt-4 text-sm text-gray-600 gap-4">
                                    <span>❤️ {image.likes?.length || 0} likes</span>
                                    <span>💬 {image.comments?.length || 0} comentarios</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
