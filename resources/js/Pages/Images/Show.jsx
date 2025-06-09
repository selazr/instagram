import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import LikeButton from '@/Components/LikeButton';
import moment from 'moment';
import 'moment/locale/es';
import { useState } from 'react';

moment.locale('es');

export default function Show({ image }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const { data, setData, post, processing, reset } = useForm({
        content: '',
        image_id: image.id,
    });

    const { delete: destroyImage } = useForm();

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContent, setEditingContent] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        post(route('comments.store'), {
            onSuccess: () => reset('content'),
        });
    };

    const handleEditSubmit = (e, commentId) => {
        e.preventDefault();
        e.stopPropagation();
        window.axios.put(route('comments.update', commentId), {
            content: editingContent,
        }).then(() => {
            setEditingCommentId(null);
        });
    };

    const handleDelete = (commentId, e) => {
        e?.stopPropagation();
        if (confirm('¿Seguro que quieres eliminar este comentario?')) {
            window.axios.delete(route('comments.destroy', commentId)).catch(err => {
                alert('❌ Error al eliminar el comentario.');
                console.error(err);
            });
        }
    };

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Imagen" />

            <div className="max-w-3xl mx-auto py-8 space-y-6">
                <div className="bg-white shadow rounded p-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-700">
                            {image.user.name} <span className="text-gray-400">@{image.user.nick}</span>
                        </p>
                        <span className="text-xs text-gray-400">
                            {moment(image.created_at).fromNow()}
                        </span>
                    </div>

                    <img src={`/storage/${image.image_path}`} alt={image.description} className="rounded w-full" />
                    <div className="mt-2 flex items-center gap-4">
                        <LikeButton
                            imageId={image.id}
                            initialLiked={image.likes.some(l => l.user_id === user.id)}
                            initialCount={image.likes.length}
                        />
                    </div>
                    <p className="mt-2 text-gray-800">{image.description}</p>
                    {user.id === image.user_id && (
                        <div className="mt-2 flex gap-4 text-sm">
                            <a
                                href={route('images.edit', image.id)}
                                className="text-yellow-600"
                            >
                                ✏️ Editar
                            </a>
                            <button
                                onClick={() => {
                                    if (confirm('¿Seguro que quieres eliminar esta imagen?')) {
                                        destroyImage(route('images.destroy', image.id), {
                                            onSuccess: () => router.visit(route('dashboard')),
                                        });
                                    }
                                }}
                                className="text-red-600"
                            >
                                🗑 Eliminar
                            </button>
                        </div>
                    )}

                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">💬 Comentarios</h3>
                        {image.comments.length === 0 && <p className="text-gray-500 text-sm">Aún no hay comentarios.</p>}
                        {image.comments.map(comment => (
                            <div key={comment.id} className="border-t py-2 text-sm">
                                <p className="text-gray-600 font-semibold">
                                    {comment.user.name} <span className="text-gray-400">@{comment.user.nick}</span>
                                </p>
                                {editingCommentId === comment.id ? (
                                    <form onSubmit={(e) => handleEditSubmit(e, comment.id)} className="flex gap-2 mt-1">
                                        <input
                                            type="text"
                                            className="border p-1 flex-1"
                                            value={editingContent}
                                            onChange={(e) => setEditingContent(e.target.value)}
                                            required
                                        />
                                        <button type="submit" className="text-blue-600 text-sm">💾 Guardar</button>
                                        <button type="button" className="text-gray-500 text-sm" onClick={() => setEditingCommentId(null)}>❌ Cancelar</button>
                                    </form>
                                ) : (
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-700">{comment.content}</p>
                                        {comment.user.id === user.id && (
                                            <div className="flex gap-2 text-xs">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setEditingCommentId(comment.id);
                                                        setEditingContent(comment.content);
                                                    }}
                                                    className="text-yellow-600"
                                                >
                                                    ✏️ Editar
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => handleDelete(comment.id, e)}
                                                    className="text-red-600"
                                                >
                                                    🗑 Eliminar
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleCommentSubmit} className="mt-4">
                        <label htmlFor="content" className="block text-sm text-gray-700">Añadir comentario</label>
                        <textarea
                            id="content"
                            className="mt-1 block w-full border p-2 rounded"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            required
                        />
                        <button type="submit" className="mt-2 bg-blue-600 text-white py-1 px-4 rounded text-sm" disabled={processing}>
                            Comentar
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
