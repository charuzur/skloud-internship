import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'
import vine from '@vinejs/vine'

export default class TasksController {
  // 1. Return all tasks
  async index({ response }: HttpContext) {
    const tasks = await Task.all()
    return response.send(tasks)
  }

  // 2. Return one task
  async show({ params, response }: HttpContext) {
    try {
      const task = await Task.findOrFail(params.id)
      return response.send(task)
    } catch (error) {
      return response.status(404).send({ message: 'Task not found' })
    }
  }

  // 3. Validate and create a task
  async store({ request, response }: HttpContext) {
    try {
      const schema = vine.object({
        title: vine.string(),
        description: vine.string().optional(),
        status: vine.string().optional(),
      })

      const payload = await request.validateUsing(vine.compile(schema))

      const task = new Task()
      task.title = payload.title

      if (payload.description) {
        task.description = payload.description
      }
      if (payload.status) {
        task.status = payload.status
      }

      await task.save()

      return response.status(201).send(task)
    } catch (error) {
      return response.status(400).send({ message: 'Bad request: Invalid data' })
    }
  }

  // 4. Update an existing task
  async update({ params, request, response }: HttpContext) {
    try {
      const task = await Task.findOrFail(params.id)

      const schema = vine.object({
        title: vine.string().optional(),
        description: vine.string().optional(),
        status: vine.string().optional(),
      })

      const payload = await request.validateUsing(vine.compile(schema))

      if (payload.title) {
        task.title = payload.title
      }
      if (payload.description) {
        task.description = payload.description
      }
      if (payload.status) {
        task.status = payload.status
      }

      await task.save()

      return response.send(task)
    } catch (error: any) {
      if (error.status === 404) {
        return response.status(404).send({ message: 'Task not found' })
      }
      return response.status(400).send({ message: 'Bad request: Invalid data' })
    }
  }

  // 5. Delete an existing task
  async destroy({ params, response }: HttpContext) {
    try {
      const task = await Task.findOrFail(params.id)
      await task.delete()
      return response.send({ message: 'Task deleted' })
    } catch (error) {
      return response.status(404).send({ message: 'Task not found' })
    }
  }
}
