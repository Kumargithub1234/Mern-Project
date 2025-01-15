const mongoose = require('mongoose')

const connectdb = async () => {
    try{
        await mongoose.connect('mongodb+srv://Kumar:Zhvr02sj7N5BzXLZ@cluster0.bcn85.mongodb.net/mydb')
        console.log('Database Connected')
    } catch(err){
        console.log(err)
    }  
}

module.exports = connectdb