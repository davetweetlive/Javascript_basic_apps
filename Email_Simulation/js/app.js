// Global Variables Devleration
const sendBtn = document.getElementById('sendBtn'),
      email = document.getElementById('email'),
      subject = document.getElementById('subject'),
      message = document.getElementById('message'),
      resetBtn = document.getElementById('resetBtn'),
      sendEmailForm = document.getElementById('email-form');


//EventListeners
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', appInit);

    //Validate Email
    email.addEventListener('blur', validateField);
    subject.addEventListener('blur', validateField);
    message.addEventListener('blur', validateField);

    resetBtn.addEventListener('click', resetForm);
    sendEmailForm.addEventListener('submit', sendEmail);
    
}

// Functions decleration

//Initialize with disabled send button
function appInit(){
    //Disable send button onload
    sendBtn.disabled = true;
}

//field validator function
function validateField(){
    let errors;

    validateLength(this);

    if(this.type = 'email'){
        validateEmail(this)
    }

    errors = document.querySelectorAll('.error');

    if(email.value !== '' && subject.value !== '' && message.value !== ''){
        if(errors.length === 0){

            sendBtn.disabled = false;
        }
    }
}

function validateLength(field){
    if(field.value.length > 0){
        field.style.borderBottomColor = 'green';
        field.classList.remove('error');
    }else{
        field.style.borderBottomColor = 'red';
        field.classList.add('error');
    }
}

function validateEmail(field){
    let emailText = field.value;

    if(emailText.indexOf('@') !== -1){
        field.style.borderBottomColor = 'green';
        field.classList.remove('error');
    }else{
        field.style.borderBottomColor = 'red';
        field.classList.add('error');
    }
}

//Reset form
function resetForm(){
    sendEmailForm.reset();
}

//Send Email
function sendEmail(e){
    e.preventDefault();
    
    //Show spinner
    let spinner = document.querySelector('#spinner');
    spinner.style.display = 'block';

    const sendEmailImg = document.createElement('img');
    sendEmailImg.src = 'img/mail.gif';
    sendEmailImg.style.display = 'block';

    //hide the spinner after 3 sec
    setTimeout(function(){
        spinner.style.display = 'none';
        document.querySelector('#loaders').appendChild(sendEmailImg);

        setTimeout(function(){
            
            sendEmailForm.reset();
            sendEmailImg.remove();
        }, 5000);
    },3000)
}