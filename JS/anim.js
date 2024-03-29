const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const opt1Yes = document.querySelector('input[name="opt1"]:checked');
const opt1No = document.querySelector('input[name="opt1"]:not(:checked)');
const opt2Yes = document.querySelector('input[name="opt2"]:checked');
const opt2No = document.querySelector('input[name="opt2"]:not(:checked)');
const opt3No = document.querySelector('input[name="opt3"]:checked');
const opt3Yes = document.querySelector('input[name="opt3"]:not(:checked)');
const improvement = document.getElementById('text1');
const satisfaction = document.querySelector('[name="1-10"]:checked');
const updates = document.getElementById('updates');
const question = document.getElementById('que');
const previewBtn = document.getElementById('preview-btn');
const previewModal = document.getElementById('previewModal');
const closeModal = document.getElementById('closeModal');
const confirmationMessage = document.getElementById('confirmationMessage');
const editButton = document.getElementById('editButton');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateInputs()) {
        displayConfirmation();
    }
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const symbols = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return symbols.test(String(email).toLowerCase());
};

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const message = text1.value.trim();
    const selectedOption = updates.value.trim();
    let isValid = true;

    if (usernameValue === '') {
        setError(username, 'Name is required');
        isValid = false;
    } else {
        setSuccess(username);
    }

    if (emailValue === '') {
        setError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Please provide a valid email address');
        isValid = false;
    } else {
        setSuccess(email);
    }

    if (message === '') {
        setError(text1, 'Please add a message');
        isValid = false;
    } else {
        setSuccess(text1);
    }

    // if (selectedOption === '') { 
    //     setError(updates, 'Please select an option as it is required'); 
    //     isValid = false;
    // } else {
    //     setSuccess(updates); 
    // }

    return isValid;
};

const displayPreview = () => {
    const name = username.value.trim();
    const emailValue = email.value.trim();
    const question1 = opt1Yes ? 'Yes' : 'No';
    const question2 = opt2Yes ? 'Yes' : 'No';
    const question3 = opt3Yes ? 'Yes' : 'No';
    const message = improvement.value.trim();
    const satis_level = satisfaction ? satisfaction.value.trim() : '';
    const receiveUpdates = updates.value.trim();
    const additionalQuestion = question.value.trim();

    const previewContent = document.getElementById('previewFeedbackContent');
    previewContent.innerHTML = `
        <h2><u><center>Feedback Form Preview</center></u></h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${emailValue}</p>
        <p><strong>Was this your first time visiting? : </strong> ${question1}</p>
        <p><strong>Was this website informative and easy to navigate through? : </strong> ${question2}</p>
        <p><strong>Suggest any improvements for the future : ${message}</strong></p>
        <p><strong>Satisfaction Level (1 - 10) : ${satis_level} </strong></p>
        <p><strong>Would you recommend our services? : </strong> ${question3}</p>
        <p><strong>Would you like to receive updates about the websites and any offers? : </strong> ${receiveUpdates}</p>
        <p><strong>Additional Questions/Requests: </strong> ${additionalQuestion}</p>
        <button id="editFormBtn">Edit Form</button>
    `;

    previewModal.style.display = 'block';
    
    const editFormBtn = document.getElementById('editFormBtn');
    editFormBtn.style.display = 'block'; // Make sure the "Edit Form" button is visible
        
    // Hide the original edit button (if it exists)
    editButton.style.display = 'none';
    
    // Add event listener to the new edit button
    document.getElementById('editFormBtn').addEventListener('click', function() {
        previewModal.style.display = 'none';
        editButton.style.display = 'none';
        submitButton.style.display = 'none';
    });
 
    
};




const displayConfirmation = () => {
    form.style.display = 'none';
    confirmationMessage.style.display = 'block';
};

previewBtn.addEventListener('click', displayPreview);

closeModal.addEventListener('click', () => {
    previewModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === previewModal) {
        previewModal.style.display = 'none';
        
    }
});


