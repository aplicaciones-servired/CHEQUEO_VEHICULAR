import { useState } from 'react';
import TableArqueo from './components/chqueo/tableChequeo';
import { RenderFooterClients } from './components/paginationArq';
import { useChequeoVehicular } from './service/Chequeo.service';

function App() {
  const [fecha, setFecha] = useState("");
  const { data, loading, error, message, total, handlePageChange, page } = useChequeoVehicular("Multired", fecha);

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center px-4">
        <div className="rounded-4xl border border-white/70 bg-white/85 px-6 py-5 text-sm font-medium text-slate-600 shadow-[0_20px_60px_rgba(128,91,157,0.12)] backdrop-blur">
          Cargando registros...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="grid min-h-screen place-items-center px-4">
        <div className="rounded-4xl border border-rose-200 bg-rose-50 px-6 py-5 text-sm font-medium text-rose-700 shadow-[0_20px_60px_rgba(128,91,157,0.12)]">
          Error: {message}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="rounded-4xl border border-white/70 bg-white/80 px-6 py-6 shadow-[0_20px_60px_rgba(128,91,157,0.12)] backdrop-blur sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-500">Chequeo vehicular</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl">
            Tabla de inspecciones
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base text-center">
            Filtra por fecha y revisa los registros en una vista clara, suave y más agradable.
          </p>
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
