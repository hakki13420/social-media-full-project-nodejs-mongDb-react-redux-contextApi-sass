const express = require('express')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const usersRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')
const commentsRoute = require('./routes/comments')
const uploadRoute = require('./routes/upload')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

dotenv.config({ path: './config/.env' })
require('./config/database')

const app = express()

// middlewares
app.use(cookieParser())
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use(express.json())
app.use(helmet.crossOriginResourcePolicy(
  { policy: 'cross-origin' })
)

// app.use(morgan('common'))
app.use('', express.static(path.join(__dirname, '/public/uploads')))

// Routes
app.get('/', (req, res) => res.send('hello'))
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/posts', postsRoute)
app.use('/api/comments', commentsRoute)

app.use('/api/upload', uploadRoute)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`server runnig on ${PORT}`))
