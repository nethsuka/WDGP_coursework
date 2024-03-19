
var cart = JSON.parse(sessionStorage.getItem('cart'));

// Math.random() genarate random floting point numbers
// Math.floor() converts then into round numbers

if(sessionStorage.getItem('Ref_no') == null){
    let References_no = Math.floor(Math.random() * 1000000);
    document.querySelector('.References_no').innerHTML = `References No : ${References_no}`;
    sessionStorage.setItem('Ref_no',References_no);
}else{
    var Refno = sessionStorage.getItem('Ref_no');
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



function clearErrorMsg(){
    document.getElementById('valid_card_no').innerHTML = "";
    document.getElementById('valid_holder_name').innerHTML = "";
    document.getElementById('valid_date').innerHTML = "";
    document.getElementById('valid_ccv').innerHTML = "";
    document.getElementById('valid_email').innerHTML = "";
    document.getElementById('valid_tel').innerHTML = "";
    document.getElementById('valid_name').innerHTML = "";
    document.getElementById('valid_address').innerHTML = "";
    document.getElementById('valid_choise').innerHTML = "";
}

// This function validate form inputs
function validateFormData(form){

    clearErrorMsg();

    // console.log(form.card_number.value);
    if(form.card_number.value == ""){
        document.getElementById('valid_card_no').innerHTML = "You haven't enter the card number";
    }else if(form.card_number.value.length !== 16){
        document.getElementById('valid_card_no').innerHTML = "Incorrect card number, a card number has 16 digits";
    }else{
        var card_number = true;
    }

    if(form.holder_name.value == ""){
        document.getElementById('valid_holder_name').innerHTML = "You haven't enter the name";
    }else if(!isNaN(form.holder_name.value)){
        document.getElementById('valid_holder_name').innerHTML = "You cann't enter numbers for the name";
    }else{
        var holder_name = true; 
    }

    if(form.date.value == ""){
        document.getElementById('valid_date').innerHTML = "You haven't enter the expiry date";
    }else{
        var date = true;
    }

    if(form.ccv.value == ""){
        document.getElementById('valid_ccv').innerHTML = "You haven't enter the CCV";
    }else if(form.ccv.value.length !== 3 ){
        document.getElementById('valid_ccv').innerHTML = "Invalid CCV No, CCV No has 3 digits";
    }else{
        var ccv = true;
    }

    if(form.email.value == ""){
        document.getElementById('valid_email').innerHTML = "You haven't enter an email";
    }else if(!(form.email.value.includes('@') && form.email.value.includes('.'))){
        document.getElementById('valid_email').innerHTML = "Invalid email format";
    }else{
        var email = true;
    }

    if(form.phone_no.value == ""){
        document.getElementById('valid_tel').innerHTML = "You haven't enter a phone number";
    }else if(form.phone_no.value.length !== 10 ){
        document.getElementById('valid_tel').innerHTML = "Invalid phone No, phone No has 10 digits";
    }else{
        var phone_no = true;
    }

    if(form.fname.value == "" || form.lname.value == ""){
        document.getElementById('valid_name').innerHTML = "You haven't enter the name";
    }else{
        var fname = true;
        var lname = true;
    }

    if(form.address.value == ""){
        document.getElementById('valid_address').innerHTML = "You haven't enter the address";
    }else{
        var address = true;
    }

    if(form.pay_method.value == ""){
        document.getElementById('valid_choise').innerHTML = "You haven't enter the payment method";
    }else{
        var pay_method = true;
    }


    if((holder_name && card_number && date && ccv && email && phone_no && fname && lname && address && pay_method)==true){
        sessionStorage.setItem('recept_items',JSON.stringify(cart));
        sessionStorage.setItem('copy_Ref_no',Refno);
        window.location.href = "recept2.html";
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
    document.getElementById('process-bar').innerHTML = `<progress value="${num}" max="9"></progress>`;
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
    
    // unchecking checked redio buttons
    for (var i = 0; i < form.pay_method.length; i++) {
        form.pay_method[i].checked = false;
    }

    num = 0 ;
    clearErrorMsg();
    document.getElementById('process-bar').innerHTML = '<progress value="1" max="9"></progress>';
}