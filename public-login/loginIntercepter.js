const form = document.querySelector('#form');
const email = document.querySelector('#userEmail');
const password = document.querySelector('#pass');
const emailError = document.querySelector('#EmailError');

form.addEventListener('submit', async (event)=> {
    event.preventDefault();
    await axios.post('http://localhost:5000/login', {
        Femail : email.value,
        Fpassword : password.value
    })
    .then(response => {
        window.location.href = response.data.url
    })
    .catch(error => {
        emailError.style.opacity = 1;
        console.log(error.response.data.msg);
        emailError.innerHTML = error.response.data.msg
    })

})