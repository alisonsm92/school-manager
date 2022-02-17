import axios from 'axios'
import environment from '../config/environment.mjs'
const SERVICE_URL = environment.schoolManagerService.url

export async function addModule (data) {
  console.log(SERVICE_URL)
  const body = {
    level: data.level || 'EM',
    code: data.code || '1',
    description: data.description || '1o Ano',
    minimumAge: data.minimumAge || 15,
    price: data.price || 17000
  }
  const res = await axios.post(`${SERVICE_URL}/modules`, body)
  console.log(res)
  return res.data
}
