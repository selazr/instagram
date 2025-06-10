import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 py-6">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full max-w-md overflow-hidden bg-white/80 backdrop-blur-md p-6 shadow-xl rounded-lg">
                {children}
            </div>
        </div>
    );
}
