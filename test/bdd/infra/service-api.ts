import axios from 'axios'
import EnrollStudentInputData from '../../../src/domain/contracts/enroll-student-input-data'
import RegisterClassroomInputData from '../../../src/domain/contracts/register-classroom-input-data'
import RegisterLevelInputData from '../../../src/domain/contracts/register-level-input-data'
import RegisterModuleInputData from '../../../src/domain/contracts/register-module-input-data'
import environment from '../config/environment'
import { handleError } from '../../helpers/error-handler'
const SERVICE_URL = environment.schoolManagerService.url

export async function registerLevel (inputData: RegisterLevelInputData) {
  try {
    await axios.post(`${SERVICE_URL}/levels`, inputData)
    return inputData
  } catch (e) {
    if (e instanceof Error) handleError(e)
  }
}

export async function registerModule (inputData: RegisterModuleInputData) {
  try {
    await axios.post(`${SERVICE_URL}/modules`, inputData)
    return inputData
  } catch (e) {
    if (e instanceof Error) handleError(e)
  }
}

export async function registerClassroom (inputData: RegisterClassroomInputData) {
  try {
    await axios.post(`${SERVICE_URL}/classrooms`, inputData)
    return inputData
  } catch (e) {
    if (e instanceof Error) handleError(e)
  }
}

export async function enrollStudent (inputData: EnrollStudentInputData) {
  try {
    const { data } = await axios.post(`${SERVICE_URL}/enrollments`, inputData)
    return data
  } catch (e) {
    if (e instanceof Error) handleError(e)
  }
}

export async function getEnrollment (code: string) {
  try {
    const { data } = await axios.get(`${SERVICE_URL}/enrollments/${code}`)
    return data
  } catch (e) {
    if (e instanceof Error) handleError(e)
  }
}
