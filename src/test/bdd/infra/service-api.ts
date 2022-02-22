import axios from 'axios'
import EnrollStudentInputData from '../../../domain/data/enroll-student-input-data'
import GetEnrollmentInputData from '../../../domain/data/get-enrollment-input-data'
import RegisterClassroomInputData from '../../../domain/data/register-classroom-input-data'
import RegisterLevelInputData from '../../../domain/data/register-level-input-data'
import RegisterModuleInputData from '../../../domain/data/register-module-input-data'
import environment from '../config/environment'
import { handleError } from '../helpers/error-handler'
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

export async function getEnrollment (inputData: GetEnrollmentInputData) {
  try {
    const { data } = await axios.get(`${SERVICE_URL}/enrollments/${inputData.code}`)
    return data
  } catch (e) {
    if (e instanceof Error) handleError(e)
  }
}
