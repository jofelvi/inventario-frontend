import React, {useRef} from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@hooks/useAuth';
import { Container, ImageContainer } from './styles'
import {  Logo } from '../../../public/svg/icons'
import Link from 'next/link';

const Login = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const auth = useAuth();
    const router = useRouter();

    const submitHandle = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        auth.singIn(email, password).then(() => {
                router.push('/inventory/mainInventory')
            },
            (reason) => {
                console.log('Login Failed');
                console.error(reason);
                auth.setError('Invalid Username or Password');
            }
        );
    };

    return (
        <Container>

            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

                <div className="w-full max-w-md space-y-8">
                    <ImageContainer>
                        <Logo />
                    </ImageContainer>
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Ingresa en tu cuenta</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            O
                            <Link href="signUp" className="font-medium text-sky-800 hover:text-sky-600">Registrate</Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={submitHandle}>
                        <input type="hidden" name="remember" value="true"/>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label for="email-address" className="sr-only">Email</label>
                                <input
                                    id="email-address"
                                    name="email" type="email"
                                    autocomplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    placeholder="Email address"
                                    ref={emailRef}
                                />
                            </div>
                            <div>
                                <label for="password" className="sr-only">Contraseña</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autocomplete="current-password"
                                    required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                    placeholder="Password"
                                    ref={passwordRef}
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-sky-900 group-hover:text-sky-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                                </svg>
                            </span>
                                Ingresar
                            </button>
                        </div>
                        {auth.error ? (
                            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                <span className="font-medium">Error en login!</span> {auth.error}
                            </div>
                        ) : null}
                    </form>
                </div>
            </div>
        </Container>
    );
};

export default Login;
