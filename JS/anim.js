const feedbackForm = document.getElementById('feedback');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');

feedbackForm.addEventListener('submit', e => {
    e.preventDefault();  //To prevent the form submitting before validating

    validateInputs();
});

const setError = (element , message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email =>{
    const regular = /^[^\s@]+@[^\s@0-9]+\.[^\s@]+$/;
    return regular.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();

    if (nameValue === ''){
        setError(name , 'Name is required');
    } else {
        setSuccess(name);
    }

    if (emailValue === ''){
        setError(email , 'Email is required');
    }else if(!isValidEmail(emailValue)){
        setError(email , 'Please provide a valid email address');
    }else{
        setSuccess(email);
    }

};