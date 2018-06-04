const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
// Example of Ecmascript 2016 destructuring.
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);
