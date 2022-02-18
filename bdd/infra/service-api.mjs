import axios from 'axios'
import environment from '../config/environment.mjs'
const SERVICE_URL = environment.schoolManagerService.url

export async function registerLevel (input) {
  try {
    const levelData = {
      code: input.code || 'EM',
      description: input.description || 'Ensino Médio'
    }
    await axios.post(`${SERVICE_URL}/levels`, levelData)
    return levelData
  } catch (e) {
    errorHandler(e)
  }
}

export async function registerModule (input) {
  try {
    const moduleData = {
      level: input.level || 'EM',
      code: input.code || '1',
      description: input.description || '1o Ano',
      minimumAge: input.minimumAge || 15,
      price: input.price || 17000
    }
    await axios.post(`${SERVICE_URL}/modules`, moduleData)
    return moduleData
  } catch (e) {
    errorHandler(e)
  }
}

export async function registerClassroom (input) {
  try {
    const classroomData = {
      level: input.level || 'EM',
      module: input.module || '1',
      code: input.code || 'A',
      capacity: input.capacity || 10,
      startDate: input.startDate || new Date().toISOString(),
      endDate: input.endDate || getDateAfter({ days: 30 })
    }
    await axios.post(`${SERVICE_URL}/classrooms`, classroomData)
    return classroomData
  } catch (e) {
    errorHandler(e)
  }
}

export async function enrollStudent (input) {
  try {
    const enrollmentData = {
      student: {
        name: input.student?.name || 'Maria Carolina Fonseca',
        cpf: input.student?.cpf || '755.525.774-26',
        birthDate: input.student?.birthDate || '2002-03-12T00:00:00.000Z'
      },
      level: input.level || 'xxx',
      module: input.module || 'xx',
      classroom: input.classroom || 'x',
      installments: input.installments || 1
    }
    const { data } = await axios.post(`${SERVICE_URL}/enrollments`, enrollmentData)
    return data
  } catch (e) {
    errorHandler(e)
  }
}

export async function getEnrollment (input) {
  try {
    const { data } = await axios.get(`${SERVICE_URL}/enrollments/${input.code}`)
    return data
  } catch (e) {
    errorHandler(e)
  }
}

function errorHandler (error) {
  if (error.response) {
    console.log(error.response.data)
    console.log(error.response.status)
    throw error
  }
  console.log(error)
  throw error
}

function getDateAfter ({ days }) {
  const date = new Date()
  const calculatedDate = date.getDate() + days
  date.setDate(calculatedDate)
  return date
}
