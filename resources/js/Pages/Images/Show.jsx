import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
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
        window.axios.put(route('comments.update', commentId), {
            content: editingContent,
        }).then(() => {
            setEditingCommentId(null);
        });
    };

    const handleDelete = (commentId) => {
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
                    <p className="mt-2 text-gray-800">{image.description}</p>

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
                                                <button onClick={() => {
                                                    setEditingCommentId(comment.id);
                                                    setEditingContent(comment.content);
                                                }} className="text-yellow-600">✏️ Editar</button>
                                                <button onClick={() => handleDelete(comment.id)} className="text-red-600">🗑 Eliminar</button>
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
