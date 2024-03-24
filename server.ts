import express from 'express'
import cors from 'cors'

// import { connectDB } from './utils/database'
// import { userRoutes } from './routes/userRoutes'
// import { marketRoutes } from './routes/marketRoutes'

require('dotenv').config()

const app = express()

// Connect to MongoDB
// connectDB()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/users', userRoutes)
app.use('/market', marketRoutes)

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
