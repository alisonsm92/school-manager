import { EnrollmentStatus } from '../../../../domain/entities/enrollment'
import EnrollmentBuilder from '../../../../../test/builders/enrollment-builder'
import EnrollmentRepositoryMemory from './enrollment-repository-memory'

const enrollment = new EnrollmentBuilder().build()

describe('Testing EnrollmentRepositoryMemory', () => {
  describe('FindByCode method', () => {
    test('Should return the enrollment with code provided when it exists', async () => {
      const enrollmentRepository = new EnrollmentRepositoryMemory()
      enrollmentRepository.add(enrollment)
      const result = await enrollmentRepository.findByCode(enrollment.code.value)
      expect(result).toEqual(enrollment)
    })

    test('Should return undefined when enrollment with the code provided not exists', async () => {
      const enrollmentRepository = new EnrollmentRepositoryMemory()
      const result = await enrollmentRepository.findByCode(enrollment.code.value)
      expect(result).toBeUndefined()
    })
  })

  describe('FindByCpf method', () => {
    test('Should return the enrollment with cpf provided when it exists', async () => {
      const enrollmentRepository = new EnrollmentRepositoryMemory()
      enrollmentRepository.add(enrollment)
      const result = await enrollmentRepository.findByCpf(enrollment.student.cpf.value)
      expect(result).toEqual(enrollment)
    })

    test('Should return undefined when enrollment with the code provided not exists', async () => {
      const enrollmentRepository = new EnrollmentRepositoryMemory()
      const result = await enrollmentRepository.findByCpf(enrollment.student.cpf.value)
      expect(result).toBeUndefined()
    })
  })

  describe('Update method', () => {
    test('Should return the enrollment with the data updated', async () => {
      const enrollmentRepository = new EnrollmentRepositoryMemory()
      enrollmentRepository.add(enrollment)
      enrollment.status = EnrollmentStatus.CANCELLED
      enrollmentRepository.update(enrollment)
      const enrollmentAfterUpdate = await enrollmentRepository.findByCode(enrollment.code.value)
      expect(enrollmentAfterUpdate?.status).toBe(EnrollmentStatus.CANCELLED)
    })
  })
})
