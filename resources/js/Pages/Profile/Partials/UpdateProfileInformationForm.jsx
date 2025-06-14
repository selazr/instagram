import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformationForm({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name ?? '',
        surname: user.surname ?? '',
        nick: user.nick ?? '',
        email: user.email ?? '',
        avatar: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update'), {
            _method: 'patch',
            preserveScroll: true,
            onSuccess: () => setData('avatar', null),
            onError: () => setData('avatar', null),
            forceFormData: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6" encType="multipart/form-data">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="surname" value="Surname" />
                    <TextInput
                        id="surname"
                        className="mt-1 block w-full"
                        value={data.surname}
                        onChange={(e) => setData('surname', e.target.value)}
                        required
                        autoComplete="family-name"
                    />
                    <InputError className="mt-2" message={errors.surname} />
                </div>

                <div>
                    <InputLabel htmlFor="nick" value="Nick" />
                    <TextInput
                        id="nick"
                        className="mt-1 block w-full"
                        value={data.nick}
                        onChange={(e) => setData('nick', e.target.value)}
                        required
                        autoComplete="nickname"
                    />
                    <InputError className="mt-2" message={errors.nick} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="email"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="avatar" value="Avatar" />
                    <input
                        id="avatar"
                        type="file"
                        className="mt-1 block w-full"
                        onChange={(e) => setData('avatar', e.target.files[0])}
                        accept="image/*"
                    />
                    <InputError className="mt-2" message={errors.avatar} />
                    {user.avatar && (
                        <div className="mt-4">
                            <span className="text-sm text-gray-600">Current avatar:</span>
                            <img
                                src={`/storage/${user.avatar}`}
                                alt="Avatar"
                                className="mt-2 h-20 w-20 rounded-full object-cover"
                            />
                        </div>
                    )}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 text-sm text-blue-600 underline"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
