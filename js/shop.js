const product_list = [
    {
        id : 0,
        name : 'Swimming Goggles',
        quantity : 1,
        price : 200,
        image : 'img/goggle.jfif'

    },
    {
        id : 1,
        name : 'Diving masks',
        quantity : 1,
        price : 800,
        image : 'img/diving mask.jpg'
    },
    {
        id : 2,
        name : 'Swimming suit',
        quantity : 1,
        price : 100,
        image : 'img/suit.jfif'
    },
    {
        id : 3,
        name : 'Underwater watch band',
        quantity : 1,
        price : 700,
        image : 'img/watch.jfif'
    },
    {
        id : 4,
        name : 'Swimming bags',
        quantity : 1,
        price : 500,
        image : 'img/bag.jfif'
    },
    {
        id : 5,
        name : 'Swimming cap',
        quantity : 1,
        price : 200,
        image : 'img/swimmimg_cap.jfif'
    },
    {
        id : 6,
        name : 'Life Jacket',
        quantity : 1,
        price : 130,
        image : 'img/jacket.jfif'
    },
];


    let cart = [];

    product_list.forEach((item) => {
        let itemHTML = `
                    <div class="item-box">
                        <img src="${item.image}" alt="${item.name}"><br>
                        <p>${item.name}</p>
                        <p>Rs. ${item.price}.00</p>
                        <button class='add-cart' onclick='addToBasket(${item.id})'>Add to cart</button>
                    </div>`;
        document.querySelector('.container').innerHTML += itemHTML;
    });
    displayCart();
    getTotal();

    if(sessionStorage.getItem("cart")){
        cart = JSON.parse(sessionStorage.getItem("cart")); // get 'cart' string array from local storage
        displayCart();                                   // and converting it into it's original format
        getTotal();
    }


    // Function that search products
    function searchProducts(test){
        // let searchTearm = document.getElementById('searchName').value;
        // let i = 0;
        document.querySelector('.container').innerHTML = " ";

        let filteredCart = product_list.filter(obj => obj.name.toLowerCase().includes(test.toLowerCase()));
        if(filteredCart.length==0){
            document.querySelector('.container').innerHTML = "<div id='empty-msg'><p>There is no such item on the showcase.</p></div>";
        }else{
            // for(let item of product_list){
            //     if(item.name.toLowerCase().includes(test.toLowerCase())){
                filteredCart.forEach(item => {
                    let itemHTML = `
                                <div class="item-box">
                                    <img src="${item.image}" alt="${item.name}"><br>
                                    <p>${item.name}</p>
                                    <p>Rs. ${item.price}.00</p>
                                    <button class='add-cart' onclick='addToBasket(${item.id})'>Add to cart</button>
                                </div>`;
                document.querySelector('.container').innerHTML += itemHTML; })
            //     }
            // }
        }
    }


    // Function that add items to the cart array
    function addToBasket(id){
        let p = product_list.find(item => item.id == id );
        for(let obj of cart){
            if(obj.id == p.id){
                obj.quantity++;
                let index = cart.findIndex(element => element.id == p.id)
                EelementPriceIncrease(index);
                saveToLocalStorage();
                displayCart();
                getTotal();
                return;
            }
        }
        cart.push({...p});  // {...p} this methode is used to copy an object from the original array
        console.log(cart);  // to check
        saveToLocalStorage();
        displayCart();
        getTotal();
    }

    
    // Function that display items in cart
    function displayCart(){
        increaseCartNum();
        if(cart.length==0){
            document.querySelector('.container2').innerHTML = "<p class='empty_msg' style='text-align:left'>Your cart is empty !</p>";
        }else{
            document.querySelector('.container2').innerHTML = cart.map((item, index)=> {
                let {id, name , image, price , quantity} = item;
                return(
                    `<div class="basket-item">
                    <img src="${image}" alt="" style="float:left;height:60px;margin-right:10px">
                    <span> ${name}</span><br>
                    <span> Rs. ${price}</span><br>
                    <div class="q-box">
                        <button class="plus" onclick="incrementQuantity(${index})">+</button>
                        <span class="quantity_num">${quantity}</span>
                        <button class="min" onclick="decrementQuantity(${index})">-</button>
                    </div>
                    <button  class='delete_btn' onclick='deleteItem(${index})'><img src="img/dele-ico.png" alt="delete-ico" style="height:17px;"></button>
                </div>`
                )
            }).join("<br>")
        }
    }

    //Fuction that delete selected items from the basket
    function deleteItem(index){
        cart.splice(index, 1);
        saveToLocalStorage();
        displayCart();
        getTotal()
    }

    //Fuction that itarate the number of items in the cart
    function increaseCartNum(){
        let numOfItems = 0;
        for(let item of cart){
            numOfItems += item.quantity;
        }
        document.getElementById('cart_num').innerHTML = numOfItems;
    }

    //Fuction that get the total of the basket
    function getTotal(){
        let tot = 0;
        for(let item of cart){
            tot += item.price;
        }
        document.getElementById('total_count').innerHTML = tot;
    }

    // Function to increment quantity
    function incrementQuantity(index) {
        cart[index].quantity++;
        EelementPriceIncrease(index);
        saveToLocalStorage();
        displayCart();
        getTotal();
    }

    // Function to decrement quantity
    function decrementQuantity(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        }
        EelementPriceIncrease(index);
        saveToLocalStorage();
        displayCart();
        getTotal();
    }

    // Function that increase the price of an item in the cart
    function EelementPriceIncrease(index){
        let element = product_list.find(item => item.id == cart[index].id);     //!!! when we enable this function you need change
        cart[index].price = element.price * cart[index].quantity;                   //the logic of getTotal() function
    }

    // Function to checkout
    function checkout() {
        if(cart.length==0){
            // document.getElementById('Checkout-btn').disabled = true;
            alert("you cannot checkout with having empty cart");
        }else{
            alert("proccessed to checkout");
            window.location.href = 'checkout02.html';
        }
    }

    // Function to clear the cart
    function clearCart(){
        if(cart.length != 0){
            cart.length = 0;
            saveToLocalStorage();
            document.querySelector('.container2').innerHTML = "<p class='empty_msg' style='text-align:left'>Your cart is empty !</p>";
            displayCart();
            getTotal();
        }else{
            alert("your cart is already empty");
        }
    }

    // Function that save the cart array to local storage in browser
    function saveToLocalStorage(){
        let local_cart = JSON.stringify(cart);
        sessionStorage.setItem("cart", local_cart);
    }