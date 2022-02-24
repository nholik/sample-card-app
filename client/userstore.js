const { createSigner } = require('fast-jwt')
const users = [
  {
    username: 'jsmith',
    id: '5bc1314235df98',
  },
  {
    username: 'pbean',
    id: '5bc134dd235df98',
  },
]

exports.validateUser = async (username, password) => {
  if (password === 'password') {
    const match = users.find((x) => x.username === username)
    if (match) {
      const signer = createSigner({ key: process.env.JWT_SECRET })
      return {
        ...match,
        accessToken: await signer(match),
      }
    }
    return match
  }
}
