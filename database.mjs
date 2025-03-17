import bcrypt from "bcryptjs";
import mysql from 'mysql2/promise';

    const connection = await mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password: 'pleaseKillMe',
        database : 'studysyn'
    });

    if (connection) {
        console.log('connection established');
    }

//async function that queries the DB to check if email is already in use
async function checkIfEmailExists(email) {
    const [results, fields] = await connection.execute('SELECT COUNT(*) AS num FROM userdetails WHERE email = ?', [email]);
    if (results[0].num == 1) {
        console.log('user already exists');
        return true; //return true as username already exists on DB
    }
    console.log('Result of COUNT(*) ' + results[0]);
    return false;
}
    

//signNewUser should return true if sign-up was successful, false otherwise
async function signNewUser([email, username, plainTextPassword]) {
    //check if email already exits in DB
    const checkEmail = await checkIfEmailExists(email);

    if (checkEmail) {
        return false;
    }
    try {
        //if email is new, execute INSERT statement into DB with email, user, hashedPass, must call bcrypt here
        let hashedPassword = await bcrypt.hash('plainTextPassword', 12);
        const [results, fields] = await connection.execute('INSERT INTO userDetails(email, username, passHash) VALUES (?, ?, ?)', [email, username, hashedPassword]);
        console.log(results);
        return true;
    }
    catch(error) {
        console.error(error);
    }
    
    
}



// login function
// How do I compare?
// What's the query going to be?
// I want to search the database for the specified username
// hash the inputted password
// if username exists on database, check to see if the inputted password is the same as what's on the DB
// async function with array that has user and hashed input password

async function loginUser([email, plainTextPassword]) {
    const [results, fields] = await connection.execute('SELECT email, passHash FROM userdetails WHERE email = ?', [email]);
    if (results[0] == 1) {

    }
    
}

export {signNewUser};