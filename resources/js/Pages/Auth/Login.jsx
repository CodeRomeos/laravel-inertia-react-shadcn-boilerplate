import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Input } from "@/shadcn/ui/input";
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import PageLayout from "@/Layouts/PageLayout";
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Card, CardContent, CardHeader } from '@/shadcn/ui/card';

const Login = ({ status, canResetPassword }) => {
    const {appName} = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
		<div className="relative h-screen flex-col items-center justify-center">
			<div className="h-full flex flex-col items-center justify-center">
				<div className="mx-auto mb-4 -mt-28 text-center">
					<ApplicationLogo className="brightness-100 w-44 text-white text-center"/>
					<p className="text-lg">
						{import.meta.env.VITE_APP_NAME}
					</p>
				</div>
				<Card className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
				<CardHeader>

					<div className="flex flex-col space-y-2 text-center">
						<h1 className="text-2xl font-semibold tracking-tight text-center">
							Login
						</h1>
					</div>
				</CardHeader>
				<CardContent>
					{status && (
						<div className="mb-4 font-medium text-sm text-green-600">
							{status}
						</div>
					)}

					<form onSubmit={submit}>
						<div>
							<InputLabel htmlFor="email" value="Email" />

							<Input
								id="email"
								type="email"
								name="email"
								value={data.email}
								className="mt-1 block w-full"
								autoComplete="username"
								isFocused={true}
								onChange={(e) =>
									setData("email", e.target.value)
								}
							/>

							<InputError
								message={errors.email}
								className="mt-2"
							/>
						</div>

						<div className="mt-4">
							<InputLabel
								htmlFor="password"
								value="Password"
							/>

							<Input
								id="password"
								type="password"
								name="password"
								value={data.password}
								className="mt-1 block w-full"
								autoComplete="current-password"
								onChange={(e) =>
									setData("password", e.target.value)
								}
							/>

							<InputError
								message={errors.password}
								className="mt-2"
							/>
						</div>

						<div className="block mt-4">
							<label className="flex items-center">
								<Checkbox
									name="remember"
									checked={data.remember}
									onChange={(e) =>
										setData(
											"remember",
											e.target.checked
										)
									}
								/>
								<span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
									Remember me
								</span>
							</label>
						</div>

						<div className="flex items-center justify-end mt-4">
							{canResetPassword && (
								<Link
									href={route("password.request")}
									className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
								>
									Forgot your password?
								</Link>
							)}

							<PrimaryButton
								className="ms-4"
								disabled={processing}
							>
								Log in
							</PrimaryButton>
						</div>
					</form>
					{/* <p className="px-8 text-center text-sm text-muted-foreground">
					By clicking continue, you agree to our{" "}
					<a
						href="/terms"
						className="underline underline-offset-4 hover:text-primary"
					>
						Terms of Service
					</a>{" "}
					and{" "}
					<a
						href="/privacy"
						className="underline underline-offset-4 hover:text-primary"
					>
						Privacy Policy
					</a>
					.
				</p> */}
				</CardContent>
				</Card>
			</div>
		</div>
    );
}

Login.layout = (page) => <PageLayout children={page} title="Log in" metaDescription="Log in" />

export default Login;
