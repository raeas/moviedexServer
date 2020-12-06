require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

console.log(process.env.API_TOKEN)

const app = express()

app.use(morgan('dev'))

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')
  console.log('validate bearer token middleware')
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  // move to the next middleware
  next()
})

const validGenre = [`Romantic`, `Comedy`, `Drama`, `Action`, `Horror`]

function handleGetGenre(req, res) {
  res.json(validGenre)
}
  
app.get('/genre', handleGetGenre)

function handleGetMovie(req, res) {
  res.send('Hello, Movie!')
  }
  
  app.get('/movie', handleGetMovie)

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
