import { useState } from 'react';

export default function LikeButton({ imageId, initialLiked, initialCount }) {
    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(initialCount);

    const toggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const request = liked
            ? window.axios.delete(route('images.unlike', imageId))
            : window.axios.post(route('images.like', imageId));

        request.then((res) => {
            if (res.data && typeof res.data.count !== 'undefined') {
                setCount(res.data.count);
            } else {
                setCount((c) => (liked ? c - 1 : c + 1));
            }
            setLiked(!liked);
        });
    };

    return (
        <button
            onClick={toggle}
            className="flex items-center gap-1 focus:outline-none"
        >
            <span className={liked ? 'text-red-600' : 'text-gray-600'}>
                {liked ? '❤️' : '♡'}
            </span>
            <span className="text-sm text-gray-600">{count}</span>
        </button>
    );
}
