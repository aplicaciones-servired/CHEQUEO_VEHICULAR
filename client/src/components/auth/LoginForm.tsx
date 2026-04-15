import { useState, type FormEvent } from 'react';
import { login, registerLoginSeguimiento } from '../../service/auth.service';
import { useToast } from '../toast/ToastProvider';

interface LoginFormProps {
    onSuccess: (session: { token?: string; username: string; raw: unknown }, company?: string) => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
    const { success, error: showError, warning, loading: showLoading, dismiss } = useToast();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedUsername = username.trim();
        if (!trimmedUsername || !password) {
            warning({
                title: 'Completa los campos',
                description: 'Username y password son obligatorios.',
                duration: 2500,
            });
            return;
        }

        setSubmitting(true);
        const toastId = showLoading({
            title: 'Validando credenciales',
            description: 'Conectando con la API de autenticación...',
        });

        try {
            const response = await login({ username: trimmedUsername, password });
            const token = response.token ?? response.accessToken;

            dismiss(toastId);

            success({
                title: 'Inicio de sesión correcto',
                description: response.message ?? 'Acceso concedido.',
                duration: 2200,
            });

            void registerLoginSeguimiento({
                nombre: response.user?.names ?? response.user?.name ?? trimmedUsername,
                cedula: response.user?.document ?? trimmedUsername,
                empresa: response.company ?? response.user?.company ?? 'Multired',
            }).catch(() => undefined);

            onSuccess({
                token,
                username: response.user?.username ?? trimmedUsername,
                raw: response,
            }, typeof response.company === 'string' ? response.company : undefined);
        } catch (requestError) {
            dismiss(toastId);
            showError({
                title: 'No se pudo iniciar sesión',
                description: requestError instanceof Error ? requestError.message : 'Error desconocido al autenticar.',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(191,219,254,0.35),transparent_30%),radial-gradient(circle_at_top_right,rgba(252,231,243,0.55),transparent_30%),linear-gradient(180deg,#fffaf8_0%,#f7fbff_100%)] px-4 py-8 sm:px-6 lg:px-8">
            <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-4xl border border-white/80 bg-white/90 shadow-[0_30px_80px_rgba(127,91,157,0.16)] lg:grid-cols-[1.1fr_0.9fr]">
                    <aside className="flex flex-col justify-between bg-linear-to-br from-sky-100 via-rose-50 to-amber-50 px-8 py-10 sm:px-12">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.4em] text-sky-600">Chequeo vehicular</p>
                            <h1 className="mt-4 max-w-md text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                                Accede al sistema
                            </h1>
                            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
                                Ingresa con tus credenciales para ver inspecciones, evidencias y el detalle completo de cada registro.
                            </p>
                        </div>

                    
                    </aside>

                    <section className="flex items-center justify-center px-6 py-10 sm:px-10">
                        <form onSubmit={handleSubmit} className="w-full max-w-md">
                            <div className="text-center">
                                <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-500">Inicio de sesión</p>
                                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Bienvenido</h2>
                            </div>

                            <div className="mt-8 space-y-4">
                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-slate-600">Username</span>
                                    <input
                                        type="text"
                                        autoComplete="username"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
                                        placeholder="Tu usuario"
                                    />
                                </label>

                                <label className="block">
                                    <span className="mb-2 block text-sm font-medium text-slate-600">Password</span>
                                    <input
                                        type="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
                                        placeholder="Tu contraseña"
                                    />
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="mt-6 flex w-full items-center justify-center rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(56,189,248,0.28)] transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {submitting ? 'Ingresando...' : 'Entrar'}
                            </button>

                           
                        </form>
                    </section>
                </div>
            </section>
        </main>
    );
}
