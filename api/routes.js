import { getBalance, getProfile } from './data.js'

export const routes = async (fastify, _) => {
  fastify.get('/profile', async (request, reply) => {
    const { id } = request.user
    const profile = await getProfile(id)
    if (!profile) {
      reply.code(404)
      return { error: 'Profile not found' }
    }
    return profile
  })

  fastify.get('/balance/:pan', async (request, reply) => {
    const { pan } = request.params
    const { id } = request.user
    const balance = await getBalance(id, pan)
    if (!balance) {
      reply.code(404)
      return { error: 'Card not found' }
    }
    return balance
  })
}
