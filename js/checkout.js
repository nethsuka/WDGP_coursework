
if(JSON.parse(sessionStorage.getItem('cart')).length == 0){
    alert("You cannot go to checkout process with having empty cart");
    window.location.href = "shop.html";
}else{
    var cart = JSON.parse(sessionStorage.getItem('cart'));
}

// Math.random() genarate random floting point numbers
// Math.floor() converts then into round numbers

// let References_no = Math.floor(Math.random() * 1000000);

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

