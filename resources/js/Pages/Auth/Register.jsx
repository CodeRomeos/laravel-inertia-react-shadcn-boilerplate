import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Link, useForm } from '@inertiajs/react';
import { Input } from '@/shadcn/ui/input';
import LoadingButton from '@/Components/LoadingButton';
import { Card, CardContent, CardHeader } from '@/shadcn/ui/card';
import ApplicationLogo from '@/Components/ApplicationLogo';

const Register = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
		<div className="relative h-screen flex-col items-center justify-center">
			<div className="h-full flex flex-col items-center justify-center">
				<div className="mx-auto mb-4 -mt-28 text-center">
					<ApplicationLogo className="brightness-100 w-44 text-white text-center"/>
				</div>
				<Card className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<CardHeader>

					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight text-center">
							Register
						</h1>
					</div>
				</CardHeader>
				<CardContent>
					<form onSubmit={submit}>
						<div>
							<InputLabel htmlFor="name" value="Name" />

							<Input
								id="name"
								name="name"
								value={data.name}
								className="mt-1 block w-full"
								autoComplete="name"
								isFocused={true}
								onChange={(e) => setData("name", e.target.value)}
								required
							/>

							<InputError message={errors.name} className="mt-2" />
						</div>

						<div className="mt-4">
							<InputLabel htmlFor="email" value="Email" />

							<Input
								id="email"
								type="email"
								name="email"
								value={data.email}
								className="mt-1 block w-full"
								autoComplete="username"
								onChange={(e) => setData("email", e.target.value)}
								required
							/>

							<InputError message={errors.email} className="mt-2" />
						</div>

						<div className="mt-4">
							<InputLabel htmlFor="password" value="Password" />

							<Input
								id="password"
								type="password"
								name="password"
								value={data.password}
								className="mt-1 block w-full"
								autoComplete="new-password"
								onChange={(e) => setData("password", e.target.value)}
								required
							/>

							<InputError message={errors.password} className="mt-2" />
						</div>

						<div className="mt-4">
							<InputLabel
								htmlFor="password_confirmation"
								value="Confirm Password"
							/>

							<Input
								id="password_confirmation"
								type="password"
								name="password_confirmation"
								value={data.password_confirmation}
								className="mt-1 block w-full"
								autoComplete="new-password"
								onChange={(e) =>
									setData("password_confirmation", e.target.value)
								}
								required
							/>

							<InputError
								message={errors.password_confirmation}
								className="mt-2"
							/>
						</div>

						<div className="flex items-center justify-end mt-4">
							<Link
								href={route("login")}
								className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
							>
								Already registered?
							</Link>

							<LoadingButton type="submit" loading={processing} className="ms-4">
								Register
							</LoadingButton>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	</div>

    );
}

Register.layout = (page) => <GuestLayout children={page} title="Register" metaDescription="Register" />

export default Register;