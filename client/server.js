const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const cookieSession = require('cookie-session')
const multer = require('multer')
const multiParser = multer()
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 5000
const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

const { validateUser } = require('./userstore')

const proxyOptions = {
  changeOrigin: true,
  target: 'http://localhost:3000',
  pathRewrite: {
    '^/api': '/',
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader(
      'Authorization',
      `Bearer ${req.session.user.accessToken}`,
    )
  },
}

app.prepare().then(() => {
  const server = express()

  server.use(express.urlencoded({ extended: true }))
  server.use(
    cookieSession({
      name: 'session',
      secret: 'secret',
    }),
  )
  const apiProxy = createProxyMiddleware('/api', proxyOptions)
  server.use(apiProxy)

  server.get('/logout', (req, res) => {
    if (req.session.isPopulated) {
      req.session = null
    }
    res.redirect('/login')
  })
  server.post('/complete-login', multiParser.none(), async (req, res) => {
    const { username = '', password = '' } = req.body
    if (username === '' || password === '') {
      res.staus(401).send('Username or password is empty')
    }
    const user = await validateUser(username, password)
    if (user) {
      req.session.user = user
      res.status(200).send('OK')
    } else {
      res.status(401).send('Invalid username or password')
    }
  })

  server.get('/login', (req, res) => {
    if (req.session.isPopulated) {
      res.redirect('/')
    } else {
      return handle(req, res)
    }
  })

  server.all('*', (req, res) => {
    if (!req.originalUrl.startsWith('/_next') && !req.session.isPopulated) {
      res.redirect('/login')
    } else {
      return handle(req, res)
    }
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
