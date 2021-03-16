const mongoose = require('mongoose');
const connectDB = require('../config/db.js')
const Employee = require("../models/employee.js");
require('dotenv').config();

let connection = null;

const URL = process.env.MONGODB_URI;

console.log("URL: ", URL);

exports.handler = async function(event, context, callback) {

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      };
    //to use the connection between function call
    context.callbackWaitsForEmptyEventLoop = false;

    let startPros = await startProcess().then(res => {
        console.log("res: ", res);
        res = {...res,headers}
      return  res;
    }).catch(error => error);
    
    return startPros;
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