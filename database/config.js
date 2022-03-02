const mongoose = require('mongoose')

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.DB_URL, {});

        console.log('DB Online')
    } catch (err) {
        console.log(err)
        throw new Error('Error on connect to db')
    }
}

module.exports = {
    dbConnection
}