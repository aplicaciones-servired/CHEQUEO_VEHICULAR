
import { useMemo, useState } from 'react'
import type { Vehicular_types } from '../types/vehicular.types'


interface FilterPDV {
  filteredPDV: Vehicular_types[]
  searchfecha: string
  setSearchFecha: React.Dispatch<React.SetStateAction<string>>
}

function filterByFecha (chequeoVehi: Vehicular_types[], searchFecha: string): Vehicular_types[] {
  return chequeoVehi.filter(({ fecha }) =>
    fecha?.toLowerCase().includes(searchFecha.toLowerCase()) ?? false
  )
}

export function useFilter (chequeoVehi: Vehicular_types[]): FilterPDV {
  const [searchfecha, setSearchFecha] = useState('')

  const filteredPDV = useMemo(() => {
    let filtered = chequeoVehi
    if (searchfecha) filtered = filterByFecha(filtered, searchfecha)
    return filtered
  }, [chequeoVehi, searchfecha])

  return { searchfecha, setSearchFecha, filteredPDV }
}
