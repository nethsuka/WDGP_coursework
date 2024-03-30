const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');

const opt1Yes = document.getElementById('opt1Yes');
const opt1No = document.getElementById('opt1No');

const opt2Yes = document.getElementById('opt2Yes');
const opt2No = document.getElementById('opt2No');

const opt3No = document.getElementById('opt3No');
const opt3Yes = document.getElementById('opt3Yes');

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
        sendEmail();
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
    const message = improvement.value.trim();
    const option = document.getElementById('opt2No');

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

    if (option.checked && message === '') {
        setError(text1, 'Please add a message');
        isValid = false;
    } else {
        setSuccess(text1);
    }

    return isValid;
};

const displayPreview = () => {
    const name = username.value.trim();
    const emailValue = email.value.trim();
    const question1 = opt1Yes.checked ? 'Yes' : 'No';
    const question2 = opt2Yes.checked ? 'Yes' : 'No';
    const question3 = opt3Yes.checked ? 'Yes' : 'No';
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
        <button id="editFormBtn" onclick="goToForm()">Edit Form</button>
    `;

    previewModal.style.display = 'block';
    const editFormBtn = document.getElementById('editFormBtn');
    editFormBtn.style.display = 'block';
    editButton.style.display = 'none';
    
    // Adding an event listener to the edit button
    document.getElementById('editFormBtn').addEventListener('click', function() {
        previewModal.style.display = 'none';
        editButton.style.display = 'none';
        submitButton.style.display = 'none';
    });
};

function goToForm(){
    window.location.href = "feedback.html";
}

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

// Function to handle email sending
function sendEmail() {
    const formData = new FormData(document.getElementById('form'));
    const previewContent = generatePlainTextPreview();

    formData.set('previewContent', previewContent);

    fetch('https://formspree.io/f/xeqyrzwr', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log(data); // Log success message
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error); // Log error message
    });
}

function generatePlainTextPreview() {
    const name = username.value.trim();
    const emailValue = email.value.trim();
    const question1 = opt1Yes.checked ? 'Yes' : 'No';
    const question2 = opt2Yes.checked ? 'Yes' : 'No';
    const question3 = opt3Yes.checked ? 'Yes' : 'No';
    const message = improvement.value.trim();
    const satis_level = satisfaction ? satisfaction.value.trim() : '';
    const receiveUpdates = updates.value.trim();
    const additionalQuestion = question.value.trim();

    let plainTextPreview = `Feedback Form Preview\n\n`;
    plainTextPreview += `Name: ${name}\n`;
    plainTextPreview += `Email: ${emailValue}\n`;
    plainTextPreview += `Was this your first time visiting? : ${question1}\n`;
    plainTextPreview += `Was this website informative and easy to navigate through? : ${question2}\n`;
    plainTextPreview += `Suggest any improvements for the future : ${message}\n`;
    plainTextPreview += `Satisfaction Level (1 - 10) : ${satis_level}\n`;
    plainTextPreview += `Would you recommend our services? : ${question3}\n`;
    plainTextPreview += `Would you like to receive updates about the websites and any offers? : ${receiveUpdates}\n`;
    plainTextPreview += `Additional Questions/Requests: ${additionalQuestion}\n`;

    return plainTextPreview;
}
