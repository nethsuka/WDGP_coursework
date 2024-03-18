
var cart = JSON.parse(sessionStorage.getItem('cart'));

// Math.random() genarate random floting point numbers
// Math.floor() converts then into round numbers

if(sessionStorage.getItem('Ref_no') == null){
    let References_no = Math.floor(Math.random() * 1000000);
    document.querySelector('.References_no').innerHTML = `References No : ${References_no}`;
    sessionStorage.setItem('Ref_no',References_no);
}else{
    let Refno = sessionStorage.getItem('Ref_no');
    document.querySelector('.References_no').innerHTML = `References No : ${Refno}`;
}

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



// This function validate form inputs
function validateFormData(form){

    document.getElementById('valid_card_no').innerHTML = "";
    document.getElementById('valid_holder_name').innerHTML = "";
    document.getElementById('valid_date').innerHTML = "";
    document.getElementById('valid_ccv').innerHTML = "";
    document.getElementById('valid_email').innerHTML = "";
    document.getElementById('valid_tel').innerHTML = "";
    document.getElementById('valid_name').innerHTML = "";
    document.getElementById('valid_address').innerHTML = "";



    // console.log(form.card_number.value);
    if(form.card_number.value == ""){
        document.getElementById('valid_card_no').innerHTML = "You haven't enter the card number";
    }else if(form.card_number.value.length !== 16){
        document.getElementById('valid_card_no').innerHTML = "Incorrect card number, a card number has 16 digits";
    }

    if(form.holder_name.value == ""){
        document.getElementById('valid_holder_name').innerHTML = "You haven't enter the name";
    }else if(!isNaN(form.holder_name.value)){
        document.getElementById('valid_holder_name').innerHTML = "You cann't enter numbers for the name";
    }

    if(form.date.value == ""){
        document.getElementById('valid_date').innerHTML = "You haven't enter the expiry date";
    }

    if(form.ccv.value == ""){
        document.getElementById('valid_ccv').innerHTML = "You haven't enter the CCV";
    }else if(form.ccv.value.length !== 3 ){
        document.getElementById('valid_ccv').innerHTML = "Invalid CCV No, CCV No has 3 digits";
    }

    if(form.email.value == ""){
        document.getElementById('valid_email').innerHTML = "You haven't enter an email";
    }else if(!(form.email.value.includes('@') && form.email.value.includes('.'))){
        document.getElementById('valid_email').innerHTML = "Invalid email format";
    }

    if(form.phone_no.value == ""){
        document.getElementById('valid_tel').innerHTML = "You haven't enter a phone number";
    }else if(form.phone_no.value.length !== 10 ){
        document.getElementById('valid_tel').innerHTML = "Invalid phone No, phone No has 10 digits";
    }

    if(form.fname.value == "" || form.lname.value == ""){
        document.getElementById('valid_name').innerHTML = "You haven't enter the name";
    }

    if(form.address.value == ""){
        document.getElementById('valid_address').innerHTML = "You haven't enter the address";
    }
}


// This function updates the progress bar
let num = 0;
function updateProgressBar(value){
    if(value == ""){
        num--;
    }else{
        num++;
    }
    document.getElementById('process-bar').innerHTML = `<progress value="${num}" max="8"></progress>`;
}

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
    num = 0 ;
    document.getElementById('process-bar').innerHTML = '<progress value="1" max="8"></progress>';
}