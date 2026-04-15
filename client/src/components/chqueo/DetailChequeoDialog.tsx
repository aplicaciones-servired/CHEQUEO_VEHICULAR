import { useEffect } from 'react';
import type { Vehicular_types } from '../../types/vehicular.types';

interface DetailChequeoDialogProps {
    isOpen: boolean;
    item: Vehicular_types | null;
    onClose: () => void;
}

function formatLabel(key: string): string {
    const normalized = key.replace(/_/g, ' ');
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function getVisibleEntries(item: Vehicular_types): Array<[string, string]> {
    return Object.entries(item)
        .filter(([key]) => ![
            'id',
            'imagen_inspeccion1',
            'imagen_inspeccion2',
            'imagen_inspeccion3',
            'firma_administracion',
            'firma_conductor',
        ].includes(key))
        .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '')
        .map(([key, value]) => [key, String(value)]);
}

function getImages(item: Vehicular_types): string[] {
    return [item.imagen_inspeccion1, item.imagen_inspeccion2, item.imagen_inspeccion3]
        .filter((value): value is string => typeof value === 'string' && value.trim() !== '');
}

function getSignatures(item: Vehicular_types): Array<{ key: string; src: string }> {
    return [
        { key: 'firma_administracion', src: item.firma_administracion ?? '' },
        { key: 'firma_conductor', src: item.firma_conductor ?? '' },
    ].filter((signature) => signature.src.trim() !== '');
}

export default function DetailChequeoDialog({ isOpen, item, onClose }: DetailChequeoDialogProps) {
    useEffect(() => {
        if (!isOpen) return;

        const onEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', onEscape);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onEscape);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen, onClose]);

    if (!isOpen || !item) return null;

    const entries = getVisibleEntries(item);
    const images = getImages(item);
    const signatures = getSignatures(item);

    return (
        <div
            className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/40 px-4 py-8 backdrop-blur-sm"
            onClick={onClose}
            role="presentation"
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-label="Detalle de inspeccion"
                className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-4xl border border-white/70 bg-white shadow-[0_30px_80px_rgba(20,40,60,0.2)]"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="flex items-center justify-between gap-4 border-b border-slate-100 bg-linear-to-r from-sky-50 via-rose-50 to-amber-50 px-6 py-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">Inspeccion</p>
                        <h2 className="mt-1 text-xl font-semibold text-slate-800">
                            {item.nombre} - {item.placa}
                        </h2>
                    </div>
                    <button
                        type="button"
                        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow transition hover:bg-slate-100"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </header>

                <div className="overflow-y-auto p-5">
                    <div className="flex flex-col gap-6">
                        <section>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                                Detalle completo
                            </p>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {entries.map(([key, value]) => (
                                    <article key={key} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                                            {formatLabel(key)}
                                        </p>
                                        <p className="mt-1 wrap-break-word text-sm font-medium text-slate-700">{value}</p>
                                    </article>
                                ))}
                            </div>
                        </section>

                        {images.length > 0 ? (
                            <section>
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                                    Evidencia fotografica
                                </p>
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {images.map((src, index) => (
                                        <figure key={`${src}-${index}`} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                                            <img
                                                src={src}
                                                alt={`Imagen de inspeccion ${index + 1} de ${item.nombre}`}
                                                className="h-48 w-full object-cover"
                                                loading="lazy"
                                            />
                                        </figure>
                                    ))}
                                </div>
                            </section>
                        ) : null}

                        {signatures.length > 0 ? (
                            <section>
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                                    Firmas
                                </p>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {signatures.map((signature) => (
                                        <figure key={signature.key} className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
                                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                                                {formatLabel(signature.key)}
                                            </p>
                                            <img
                                                src={signature.src}
                                                alt={formatLabel(signature.key)}
                                                className="h-28 w-full object-contain"
                                                loading="lazy"
                                            />
                                        </figure>
                                    ))}
                                </div>
                            </section>
                        ) : null}

                        
                    </div>
                </div>
            </section>
        </div>
    );
}
