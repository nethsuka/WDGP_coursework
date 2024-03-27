
var cart = JSON.parse(sessionStorage.getItem('cart'));

// Math.random() genarate random floting point numbers
// Math.floor() converts them into round numbers

if(sessionStorage.getItem('Ref_no') == null){
    let References_no = Math.floor(Math.random() * 1000000);
    document.querySelector('.References_no').innerHTML = `References No : ${References_no}`;
    sessionStorage.setItem('Ref_no',References_no);
}else{
    let Refno = sessionStorage.getItem('Ref_no');
    document.querySelector('.References_no').innerHTML = `References No : ${Refno}`;
}

let element;
let total = 0;
cart.forEach(item => {
    element = `<div class="order-summery-item">
                <img src="${item.image}" alt="">
                <span>  ${item.name}</span><br>
                <span>  Rs. ${item.price/item.quantity}.00 x ${item.quantity}  =  Rs. ${item.price}.00</span><br>
                </div>`;
    total += item.price;
    document.querySelector('.item-container2').innerHTML += element;
})

document.querySelector('.order-total').innerHTML = `Order Total : Rs ${total}.00`;


// Function that clears the error messages and the styles that were added to the HTML form
function clearErrorMsg(){

    document.getElementById('valid_card_no').innerHTML = "";
    document.getElementById('valid_holder_name').innerHTML = "";
    document.getElementById('valid_date').innerHTML = "";
    document.getElementById('valid_ccv').innerHTML = "";
    document.getElementById('valid_email').innerHTML = "";
    document.getElementById('valid_tel').innerHTML = "";
    document.getElementById('valid_address').innerHTML = "";
    document.getElementById('valid_choise').innerHTML = "";


    document.getElementById('card_number').style.borderColor = "rgb(170, 219, 247)";
    document.getElementById('holder_name').style.borderColor = "rgb(170, 219, 247)";
    document.getElementById('Expiry_date').style.borderColor = "rgb(170, 219, 247)";
    document.getElementById('ccv').style.borderColor = "rgb(170, 219, 247)";
    document.getElementById('email').style.borderColor = "rgb(170, 219, 247)";
    document.getElementById('phone_no').style.borderColor = "rgb(170, 219, 247)";
    document.getElementById('address').style.borderColor = "rgb(170, 219, 247)";

}

// This function validate form inputs
function validateFormData(form){

    clearErrorMsg();

    if(form.card_number.value == ""){
        document.getElementById('card_number').style.borderColor = "red";
        document.getElementById('valid_card_no').innerHTML = "This field is required !";
    }else if(form.card_number.value.length !== 16){
        document.getElementById('card_number').style.borderColor = "red";
        document.getElementById('valid_card_no').innerHTML = "Incorrect card number!";
    }else{
        var card_number = true;
    }

    if(form.holder_name.value == ""){
        document.getElementById('holder_name').style.borderColor = "red";
        document.getElementById('valid_holder_name').innerHTML = "This field is required !";
    }else if(!isNaN(form.holder_name.value)){
        document.getElementById('holder_name').style.borderColor = "red";
        document.getElementById('valid_holder_name').innerHTML = "Integers not allowed!";
    }else{
        var holder_name = true; 
    }

    if(form.date.value == ""){
        document.getElementById('Expiry_date').style.borderColor = "red";
        document.getElementById('valid_date').innerHTML = "This field is required !";
    }else{
        var date = true;
    }

    if(form.ccv.value == ""){
        document.getElementById('ccv').style.borderColor = "red";
        document.getElementById('valid_ccv').innerHTML = "This field is required !";
    }else if(form.ccv.value.length !== 3 ){
        document.getElementById('ccv').style.borderColor = "red";
        document.getElementById('valid_ccv').innerHTML = "Invalid CCV!";
    }else{
        var ccv = true;
    }

    if(form.email.value != ""){
        if(!(form.email.value.includes('@') && form.email.value.includes('.'))){
            document.getElementById('email').style.borderColor = "red";
            document.getElementById('valid_email').innerHTML = "Invalid email format!";
        }
    }

    if(form.phone_no.value != ""){
        if(form.phone_no.value.length !== 10 ){
            document.getElementById('phone_no').style.borderColor = "red";
            document.getElementById('valid_tel').innerHTML = "Invalid phone number!";
        }
    }

    if(form.address.value == ""){
        document.getElementById('address').style.borderColor = "red";
        document.getElementById('valid_address').innerHTML = "This field is required !";
    }else{
        var address = true;
    }

    if(form.pay_method.value == ""){
        document.getElementById('valid_choise').innerHTML = "Enter the payment method";
    }else{
        var pay_method = true;
    }


    if((holder_name && card_number && date && ccv && address && pay_method)==true){
        sessionStorage.setItem('recept_items',JSON.stringify(cart));
        console.log(sessionStorage.getItem('Ref_no'));
        sessionStorage.setItem('copy_Ref_no',sessionStorage.getItem('Ref_no'));
        window.location.href = "receipt.html";
    }
}


// This function updates the progress bar
let num = 0;
function updateProgressBar(value){
    if(num<=10){
        if(value == ""){
            num--;
        }else{
            num++;
        }
        document.getElementById('process-bar').innerHTML = `<progress value="${num}" max="10"></progress>`;
    }
}

// Function that resets the form
function clearFormData(form){
    form.holder_name.value = "";
    form.card_number.value = "";
    form.date.value = "";
    form.ccv.value = "";
    form.email.value = "";
    form.phone_no.value = "";
    form.fname.value = "";
    form.lname.value = "";
    form.address.value = "";
    
    // unchecking checked redio buttons
    for (var i = 0; i < form.pay_method.length; i++) {
        form.pay_method[i].checked = false;
    }

    num = 0 ;
    clearErrorMsg();
    document.getElementById('process-bar').innerHTML = '<progress value="1" max="10"></progress>';
}