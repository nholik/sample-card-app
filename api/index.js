import dotenv from 'dotenv'
dotenv.config()

import Fastify from 'fastify'
import jwt from 'fastify-jwt'
import { routes } from './routes.js'
const fastify = Fastify({
  logger: true,
})

fastify.register(jwt, { secret: process.env.JWT_SECRET })
fastify.register(routes)
fastify.addHook('onRequest', (request) => request.jwtVerify())

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
