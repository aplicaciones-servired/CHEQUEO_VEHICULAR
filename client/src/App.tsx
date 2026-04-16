import { useEffect, useRef, useState } from 'react';
import LoginForm from './components/auth/LoginForm';
import TableArqueo from './components/chqueo/tableChequeo';
import { RenderFooterClients } from './components/paginationArq';
import { useChequeoVehicular } from './service/Chequeo.service';
import { useToast } from './components/toast/ToastProvider';
import { useAuthStore, type AuthSession } from './store/auth.store';

function App() {
  const { error: showError, info } = useToast();
  const session = useAuthStore((state) => state.session);
  const company = useAuthStore((state) => state.company);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [fecha, setFecha] = useState("");
  const { data, loading, error, message, total, handlePageChange, page } = useChequeoVehicular(
    company,
    fecha,
    Boolean(session),
    session?.token,
  );
  const lastErrorRef = useRef<string | null>(null);
  const lastMessageRef = useRef<string | null>(null);

  const handleLoginSuccess = (nextSession: AuthSession, nextCompany?: string) => {
    setAuth(nextSession, nextCompany);
  };

  const handleLogout = () => {
    clearAuth();
    setFecha('');
  };

  useEffect(() => {
    if (!session) return;
    if (!error) return;
    if (lastErrorRef.current === error) return;

    showError({
      title: 'No fue posible cargar los datos',
      description: error,
    });
    lastErrorRef.current = error;
  }, [error, session, showError]);

  useEffect(() => {
    if (!session) return;
    if (loading || error || !message) return;
    if (lastMessageRef.current === message) return;

    info({
      title: 'Datos actualizados',
      description: message,
      duration: 2600,
    });
    lastMessageRef.current = message;
  }, [error, info, loading, message, session]);

  if (!session) {
    return <LoginForm onSuccess={handleLoginSuccess} />;
  }


  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 text-center ">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="rounded-4xl border border-white/70 bg-white/80 px-6 py-6 text-center shadow-[0_20px_60px_rgba(128,91,157,0.12)] backdrop-blur sm:px-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="rounded-full bg-sky-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-700">
              Sesión: {session.username}
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-200"
            >
              Cerrar sesión
            </button>
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-500">Chequeo vehicular</p>
          filtra por fechaspara ver los chequeos vehiculares realizados. puedes exportar los datos a excel haciendo click en el boton de exportar, y si quieres ver el detalle de cada inspeccion haz click en el boton de detalle.
        </header>

        <TableArqueo datos={data} setFecha={setFecha} />

        <RenderFooterClients
          page={page}
          total={total}
          setPage={handlePageChange}
        />
      </section>
    </main>
  )
}

export default App
