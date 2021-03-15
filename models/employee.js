const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: [true, 'Please add your first name']
  },
  lastName:{
    type: String,
    required: [true, 'Please add your last name']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Add a phone number']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  isAuthorized:{
    type: Boolean,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
