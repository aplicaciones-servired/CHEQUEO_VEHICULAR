import { useEffect, useRef, useState } from 'react';
import TableArqueo from './components/chqueo/tableChequeo';
import { RenderFooterClients } from './components/paginationArq';
import { useChequeoVehicular } from './service/Chequeo.service';
import { useToast } from './components/toast/ToastProvider';

function App() {
  const { success, error: showError, info } = useToast();
  const [fecha, setFecha] = useState("");
  const { data, loading, error, message, total, handlePageChange, page } = useChequeoVehicular("Multired", fecha);
  const lastErrorRef = useRef<string | null>(null);
  const lastMessageRef = useRef<string | null>(null);

  useEffect(() => {
    if (!error) return;
    if (lastErrorRef.current === error) return;

    showError({
      title: 'No fue posible cargar los datos',
      description: error,
    });
    lastErrorRef.current = error;
  }, [error, showError]);

  useEffect(() => {
    if (loading || error || !message) return;
    if (lastMessageRef.current === message) return;

    info({
      title: 'Datos actualizados',
      description: message,
      duration: 2600,
    });
    lastMessageRef.current = message;
  }, [error, info, loading, message]);

  useEffect(() => {
    if (loading || error) return;

    success({
      title: 'Filtro aplicado',
      description: fecha ? `Consulta por fecha ${fecha}` : 'Mostrando registros generales',
      duration: 5000,
    });
  }, [error, fecha, loading, success, page]);


  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 text-center ">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="rounded-4xl border border-white/70 bg-white/80 px-6 py-6 text-center shadow-[0_20px_60px_rgba(128,91,157,0.12)] backdrop-blur sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-500">Chequeo vehicular</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl">
            Tabla de inspecciones
          </h1>
          Filtra por fecha y revisa los registros en una vista clara, suave y más agradable.
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
