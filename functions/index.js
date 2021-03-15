const mongoose = require('mongoose');
const connectDB = require('../config/db.js')
const Employee = require("../models/employee.js");
require('dotenv').config();

let connection = null;

const URL = process.env.MONGODB_URI;

console.log("URL: ", URL);

exports.handler = async function(event, context, callback) {

    //to use the connection between function call
    context.callbackWaitsForEmptyEventLoop = false;

    return startProcess().then(res => {
        console.log("res: ", res);
      return  res;
    }).catch(error => error);
}

const startProcess = async function() {
    try{
        if (connection == null) {
            connection = await connectDB();
        
            if(connection) { 
                const doc = Employee.find();
                const response = {
                    statusCode: 200,
                    body: JSON.stringify({message: 'request received'})
                };
                return response;
            }
        } else {
            const response = {
                statusCode: 200,
                body: JSON.stringify({message: 'request received'})
            };
            return response;
        }
    } catch(e){
        return { statusCode: 400,
            body: JSON.stringify({message: 'Error occurred!'})}
    }
}