import { reactive } from 'vue'

const filters = reactive({
  search: '',
  region: '',
})

export default function useFilters(){
  const setSearch = newSearch => filters.search = newSearch
  const setRegion = newRegion => filters.region = newRegion

  return {
    filters,
    setSearch,
    setRegion
  }
}