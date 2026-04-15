import { useEffect } from 'react';
import { useFilter } from '../../hooks/useFilters';
import type { Vehicular_types } from '../../types/vehicular.types';

interface PropsFooter {
    datos: Vehicular_types[];
    setFecha: (value: string) => void;
}

function TableArqueo({ datos, setFecha }: PropsFooter) {


    const { filteredPDV, searchfecha, setSearchFecha } = useFilter(datos);

    useEffect(() => {
        setFecha(searchfecha);
    }, [searchfecha, setFecha]);

    return (
        <>

            <div className="overflow-hidden rounded-4xl border border-white/70 bg-white/85 shadow-[0_20px_60px_rgba(128,91,157,0.12)] backdrop-blur">
                <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
                    <label className="block text-sm font-medium text-slate-600" htmlFor="fecha-filter">
                        Buscar por fecha
                    </label>
                    <input
                        id="fecha-filter"
                        type="date"
                        className="mt-3 w-full max-w-md rounded-2xl border border-rose-100 bg-rose-50/80 px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
                        onChange={(e) => setSearchFecha(e.target.value)}
                        value={searchfecha}
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100 text-left">
                        <thead className="bg-linear-to-r from-sky-50 via-rose-50 to-amber-50">
                            <tr className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                <th className="px-6 py-4">Fecha</th>
                                <th className="px-6 py-4">Placa</th>
                                <th className="px-6 py-4">Nombre</th>
                                <th className="px-6 py-4">Cédula</th>
                                <th className="px-6 py-4">Kilometraje</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white/70">
                            {filteredPDV.length > 0 ? (
                                filteredPDV.map((item) => (
                                    <tr key={`${item.fecha}-${item.placa}-${item.cedula}`} className="transition hover:bg-sky-50/70">
                                        <td className="px-6 py-4 text-sm text-slate-700">{item.fecha}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-800">{item.placa}</td>
                                        <td className="px-6 py-4 text-sm text-slate-700">{item.nombre}</td>
                                        <td className="px-6 py-4 text-sm text-slate-700">{item.cedula}</td>
                                        <td className="px-6 py-4 text-sm text-slate-700">{item.kilometraje}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="px-6 py-10 text-center text-sm text-slate-500" colSpan={5}>
                                        No hay registros para esta fecha.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default TableArqueo
