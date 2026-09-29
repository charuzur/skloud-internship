import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import vine from '@vinejs/vine'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    try {
      const schema = vine.object({
        name: vine.string(),
        email: vine.string().email(),
        password: vine.string().minLength(8),
      })
      const payload = await request.validateUsing(vine.compile(schema))

      const user = new User()
      user.name = payload.name
      user.email = payload.email
      user.password = payload.password // Automatic hashing handles the security
      await user.save()

      return response.status(201).send(user)
    } catch (error) {
      return response.status(400).send({ message: 'Bad request: Invalid registration data' })
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      const email = request.input('email')
      const password = request.input('password')

      // Verify the user exists and password is correct
      const user = await User.verifyCredentials(email, password)

      // Generate the access token
      const token = await User.accessTokens.create(user)

      return response.send({
        message: 'Login successful',
        token: token.value!.release(), // Safely extracts the token string
      })
    } catch (error) {
      return response.status(401).send({ message: 'Invalid email or password' })
    }
  }

  async me({ auth, response }: HttpContext) {
    return response.send(auth.user)
  }
}
