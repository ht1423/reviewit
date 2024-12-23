import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connectDB from './db.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user.js'
import workspaceRoutes from './routes/workspace.js'
import TestimonialRoutes from './routes/testimonial.js'

connectDB()

app.use(express.json())
app.use(cors({
    origin: 'https://localhost:5173',
    credentials: true
}))
app.use(cookieParser())

app.use('/api/user', userRoutes)
app.use('/api/workspace', workspaceRoutes)
app.use('/api/testimonial', TestimonialRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})

