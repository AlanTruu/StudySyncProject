import bcrypt from "bcryptjs";
import mysql from 'mysql2/promise';
import dotenv from 'dotenv'
import { configDotenv } from "dotenv";

dotenv.config();

    const connection = await mysql.createConnection({
        host : process.env.DB_host,
        user : process.env.DB_user,
        password: process.env.DB_password,
        database : process.env.DB_database
    });

    if (connection) {
        console.log('connection established');
    }

//async function that queries the DB to check if email is already in use
//function expects a string email
//returns true if email is already in use, false otherwise
async function checkIfEmailExists(email) {
    const [results, fields] = await connection.execute('SELECT COUNT(*) AS num FROM userdetails WHERE email = ?', [email]);
    if (results[0].num == 1) {
        console.log('database.mjs 21: user already exists');
        return true; 
    }
    // console.log('Result of COUNT(*) ' + results[0].email);
    return false;
}
    

//signNewUser should return true if sign-up was successful, false otherwise
//function requires email, username, plain text password, will return false if email is in use already, true if sign up
//was successful
//things that can go wrong: checkIfEmailExists fails, bcrypt.hash fails
//TO DO: what should happen when these things go wrong?
async function signNewUser([email, username, plainTextPassword]) {
    //check if email already exits in DB
    try {
        const checkEmail = await checkIfEmailExists(email);
        
        if (checkEmail) {
            return false;
        }
        
        //if email is new, execute INSERT statement into DB with email, user, hashedPass, must call bcrypt here
        let hashedPassword = await bcrypt.hash(plainTextPassword, 12);
        const [results, fields] = await connection.execute('INSERT INTO userdetails(email, username, passHash) VALUES (?, ?, ?)', [email, username, hashedPassword]);
        return true;
    }
    catch(error) {
        throw error;
    }
    
    
}

//function expects an array with two strings, email and plaintext
//things that can go wrong: query to DB fails, bcrypt.compare fails
//TO DO: what should the user expect when they fail to login?
async function login([email, plainTextPassword]) {
    try {
        const [results, fields] = await connection.execute('SELECT passHash FROM userdetails WHERE email = ?', [email]);
        if (results[0]) {
            return await bcrypt.compare(plainTextPassword, results[0].passHash);
        }
        else {
            console.log('Error at database.mjs: no rows were pulled from DB or similar error');
            return false;
        }
    }
    catch (error) {
        console.error(error);
    }
    
};

export {signNewUser, login};