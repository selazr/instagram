import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Edit({ image }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        image: null,
        description: image.description ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('images.update', image.id), {
            _method: 'put',
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Editar imagen" />
            <div className="max-w-xl mx-auto py-8">
                <form onSubmit={submit} className="space-y-4" encType="multipart/form-data">
                    <div>
                        <img src={`/storage/${image.image_path}`} alt="Imagen" className="mb-4 rounded" />
                        <input type="file" onChange={(e) => setData('image', e.target.files[0])} />
                        {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
                    </div>
                    <div>
                        <textarea
                            className="w-full border rounded p-2"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Descripci\u00f3n"
                        />
                        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                    </div>
                    <button type="submit" disabled={processing} className="bg-blue-600 text-white px-4 py-1 rounded">
                        Actualizar
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
