import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { useFilter } from '../../hooks/useFilters';
import type { Vehicular_types } from '../../types/vehicular.types';
import DetailChequeoDialog from './DetailChequeoDialog';
import { useToast } from '../toast/ToastProvider';

interface PropsFooter {
    datos: Vehicular_types[];
    setFecha: (value: string) => void;
}

const EXCLUDED_FIELDS = new Set([
    'id',
    'imagen_inspeccion1',
    'imagen_inspeccion2',
    'imagen_inspeccion3',
    'firma_administracion',
    'firma_conductor',
]);

function formatHeader(key: string): string {
    const normalized = key.replace(/_/g, ' ');
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function toDateOnly(dateString: string): Date | null {
    if (!dateString) return null;

    const normalized = dateString.slice(0, 10);
    const parsedDate = new Date(`${normalized}T00:00:00`);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

function TableArqueo({ datos, setFecha }: PropsFooter) {


    const { warning, success } = useToast();
    const { filteredPDV, searchfecha, setSearchFecha } = useFilter(datos);
    const [selectedInspection, setSelectedInspection] = useState<Vehicular_types | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        setFecha(searchfecha);
    }, [searchfecha, setFecha]);

    const handleExportExcel = () => {
        if (!startDate || !endDate) {
            warning({
                title: 'Selecciona el rango',
                description: 'Debes indicar fecha inicio y fecha fin para exportar.',
                duration: 2500,
            });
            return;
        }

        const rangeStart = toDateOnly(startDate);
        const rangeEnd = toDateOnly(endDate);

        if (!rangeStart || !rangeEnd) {
            warning({
                title: 'Fechas inválidas',
                description: 'Revisa el formato de fecha inicio y fecha fin.',
                duration: 2500,
            });
            return;
        }

        if (rangeStart > rangeEnd) {
            warning({
                title: 'Rango inválido',
                description: 'La fecha inicio no puede ser mayor que la fecha fin.',
                duration: 2500,
            });
            return;
        }

        const recordsInRange = datos.filter((item) => {
            const itemDate = toDateOnly(item.fecha);
            if (!itemDate) return false;
            return itemDate >= rangeStart && itemDate <= rangeEnd;
        });

        if (recordsInRange.length === 0) {
            warning({
                title: 'Sin datos para exportar',
                description: 'No hay registros en el rango de fechas seleccionado.',
                duration: 2200,
            });
            return;
        }

        const rows = recordsInRange.map((item) => {
            const filteredEntries = Object.entries(item)
                .filter(([key]) => !EXCLUDED_FIELDS.has(key))
                .map(([key, value]) => [formatHeader(key), value ?? '']);

            return Object.fromEntries(filteredEntries);
        });

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Chequeos');

        const fileName = `chequeo_vehicular_${startDate.replaceAll('-', '_')}_a_${endDate.replaceAll('-', '_')}.xlsx`;

        XLSX.writeFile(workbook, fileName);

        success({
            title: 'Excel generado',
            description: `Se exportaron ${rows.length} registros.`,
            duration: 2200,
        });
    };

    return (
        <>

            <div className="overflow-hidden rounded-4xl border border-white/70 bg-white/85 shadow-[0_20px_60px_rgba(128,91,157,0.12)] backdrop-blur">
                <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
                    <div className="flex flex-col gap-6">
                        <div className="w-full">
                            <label className="block text-sm font-semibold text-slate-600" htmlFor="fecha-filter">
                                Buscar por fecha
                            </label>
                            <input
                                id="fecha-filter"
                                type="date"
                                className="mt-3 w-full rounded-2xl border border-rose-100 bg-rose-50/80 px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
                                onChange={(e) => setSearchFecha(e.target.value)}
                                value={searchfecha}
                            />
                        </div>

                        <div className="rounded-3xl border border-emerald-100/70 bg-emerald-50/40 p-4 sm:p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                                Exportador por rango
                            </p>

                            <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-slate-600" htmlFor="fecha-inicio-export">
                                        Fecha inicio exportación
                                    </label>
                                    <input
                                        id="fecha-inicio-export"
                                        type="date"
                                        className="mt-2 w-full rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                        onChange={(e) => setStartDate(e.target.value)}
                                        value={startDate}
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-medium text-slate-600" htmlFor="fecha-fin-export">
                                        Fecha fin exportación
                                    </label>
                                    <input
                                        id="fecha-fin-export"
                                        type="date"
                                        className="mt-2 w-full rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                        onChange={(e) => setEndDate(e.target.value)}
                                        value={endDate}
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleExportExcel}
                                    className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_16px_35px_rgba(16,185,129,0.3)] transition hover:bg-emerald-600 lg:w-auto"
                                >
                                    Exportar Excel
                                </button>
                            </div>
                        </div>
                    </div>
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
                                <th className="px-6 py-4 text-center">Detalle</th>
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
                                        <td className="px-6 py-4 text-center">
                                            <button
                                                type="button"
                                                className="rounded-full bg-sky-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700 transition hover:bg-sky-200"
                                                onClick={() => setSelectedInspection(item)}
                                            >
                                                Ver
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="px-6 py-10 text-center text-sm text-slate-500" colSpan={6}>
                                        No hay registros para esta fecha.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            <DetailChequeoDialog
                isOpen={selectedInspection !== null}
                item={selectedInspection}
                onClose={() => setSelectedInspection(null)}
            />
        </>
    )
}

export default TableArqueo
