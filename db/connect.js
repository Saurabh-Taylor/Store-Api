const mongoose = require('mongoose')



const connectDB = async() => {
  try {
      await mongoose.connect( process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      console.log(`DB is connected`);
  } catch (error) {
    console.log(error.message);
    process.exit(1)
  }
}

module.exports = connectDB
