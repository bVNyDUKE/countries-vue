import { ref } from 'vue'
import axios from 'axios'

export default function useApi(){
  const data = ref([])
  const loading = ref(false)

  const getData = async (endpoint) => {
    loading.value = true
    const response = await axios.get(`${endpoint}`)
    data.value = response.data
    loading.value = false
  }

  return{
    data,
    getData,
    loading
  }
}