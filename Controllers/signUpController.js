const path = require('path');
let substituteSignNewUser;

//Cannot use ES6 modules and CommonJS in the same file, so we'll have to dynamically
//load the module file like so, attach it to another function reference for global use
async function subFunction () {
    const {signNewUser} = await import ('../database.mjs');
    substituteSignNewUser = signNewUser;
}
subFunction();

//sends the user a sign up page
const sendSignUpPage = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../sign-up.html')
)};

//function that will process form data, and then redirect the user to main page if verified
const signUp = async (req,res) => {
    try {
        const email = req.body.Femail;
        const username = req.body.Fusername;
        const plainTextPass = req.body.Fpassword;
        if (email && username && plainTextPass) {
            const signSuccessful = await substituteSignNewUser([email, username, plainTextPass]);
            if (signSuccessful) {
                res.redirect('/main');
            }
            else if (!signSuccessful) {
                res.status(401).send('email in use already');
            }
        }
        else {
            console.log('field is missing');
        }
        
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {signUp, sendSignUpPage};