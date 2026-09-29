import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const TasksController = () => import('#controllers/tasks_controller')
const AuthController = () => import('#controllers/auth_controller')

// ---------------------------
// PUBLIC ROUTES
// ---------------------------
router.post('/users', [AuthController, 'register'])
router.post('/sessions', [AuthController, 'login'])

// ---------------------------
// PROTECTED ROUTES
// ---------------------------
router
  .group(() => {
    router.get('/me', [AuthController, 'me'])

    router.get('/tasks', [TasksController, 'index'])
    router.get('/tasks/:id', [TasksController, 'show'])
    router.post('/tasks', [TasksController, 'store'])
    router.patch('/tasks/:id', [TasksController, 'update'])
    router.delete('/tasks/:id', [TasksController, 'destroy'])
  })
  .use(middleware.auth())
