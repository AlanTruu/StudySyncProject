const form = document.querySelector('#form');
const email = document.querySelector('#userEmail');
const username = document.querySelector('#user');
const pass = document.querySelector('#pass');
const emailError = document.querySelector('#EmailError');

function resetWarning() {
    emailError.style.opacity = 0;
}

//submit event listener, sends post request to signup route, with user details in body
//if successful, set the page to received url, otherwise show error message
form.addEventListener('submit', async (event)=> {
    event.preventDefault();
    await axios.post('http://localhost:5000/signup', {
        Femail : email.value,
        Fusername : username.value,
        Fpassword : pass.value
    })
    .then(response => {
        if (response.data.success) {
            window.location.href = response.data.url;
        }
    })
    .catch(error => {
        emailError.style.opacity = 1;
        console.log(error.response.data.msg);
        emailError.innerHTML = error.response.data.msg;
    });


})