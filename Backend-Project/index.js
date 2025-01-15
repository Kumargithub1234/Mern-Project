const express = require('express')
const connectdb = require('./config/db')
const Player = require('./models/playerModel')
const playerRouter = require('./routes/playerRoute')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors)
app.use('/api/v1/players', playerRouter)



app.listen(3000, () => {
    console.log('Server is listening at the port 3000')
})

connectdb();