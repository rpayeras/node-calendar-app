require('dotenv').config()

const cors = require('cors')
const express = require('express');

const { dbConnection } = require('./database/config');

const app = express();

//Db
dbConnection();

app.use(cors())

//Public dir
app.use(express.static('public'))

//Parsing body
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`)
})
