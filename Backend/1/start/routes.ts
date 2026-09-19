import router from '@adonisjs/core/services/router'

const students = [
  { id: 1, name: 'Anna' },
  { id: 2, name: 'John' },
]

router.get('/students', () => {
  return students
})

router.get('/students/:id', ({ params, response }) => {
  const student = students.find((s) => s.id === Number(params.id))

  if (!student) {
    return response.status(404).send({ message: 'Student not found' })
  }

  return student
})

router.post('/students', ({ request, response }) => {
  const name = request.input('name')

  if (!name) {
    return response.status(400).send({ message: 'Name is required' })
  }

  const newStudent = {
    id: students.length + 1,
    name: name,
  }

  students.push(newStudent)

  return response.status(201).send(newStudent)
})

router.get('/', () => {
  return { message: 'The API is running. Check /students' }
})
