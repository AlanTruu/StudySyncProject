const path = require('path');

//sends the user a sign up page
const sendSignUpPage = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../sign-up.html')
)};

//function that will process form data, and then redirect the user to main page if verified
const signUp = (req,res) => {
    try {
        console.log(req.body.Fusername);
        res.redirect('/main');
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {signUp, sendSignUpPage};