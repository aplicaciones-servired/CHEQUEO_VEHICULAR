
interface PropsFooter {
  page: number;
  total: number;
  setPage: (newPage: number) => void
}

export const RenderFooterClients = ({ page, total, setPage }: PropsFooter) => {
  const safeTotal = Math.max(total, 1);

  return (
    <footer className='flex items-center justify-between gap-4 rounded-4xl border border-white/70 bg-white/85 px-5 py-4 shadow-[0_20px_60px_rgba(128,91,157,0.12)] backdrop-blur'>
      <button
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
        className='rounded-full bg-sky-300 px-4 py-2 text-sm  text-black font-bold transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50'
      >
        <span>Anterior</span>
      </button>

      <div className='flex items-center gap-2'>
        <div className='rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700'>
          Página {page} de {safeTotal}
        </div>
      </div>

      <button
        disabled={page >= safeTotal}
        onClick={() => setPage(page + 1)}
        className='rounded-full bg-sky-300 px-4 py-2 text-sm  text-black font-bold transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50'
      >
        <span>Siguiente</span>
      </button>
    </footer>
  )
}