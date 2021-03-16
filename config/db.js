const mongoose = require('mongoose');

const connectDB = async () => {

  let saslprep;

  const conn = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`);
 return conn;
};

module.exports = connectDB;
