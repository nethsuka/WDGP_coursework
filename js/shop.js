const product_list = [
    {
        id : 0,
        name : 'Swimming Goggles',
        quantity : 1,
        price : 600,
        image : 'img/goggle.jfif'

    },
    {
        id : 1,
        name : 'Diving Masks',
        quantity : 1,
        price : 800,
        image : 'img/diving mask.jpg'
    },
    {
        id : 2,
        name : 'Swimming Suit',
        quantity : 1,
        price : 1500,
        image : 'img/suit.jfif'
    },
    {
        id : 3,
        name : 'Watch Band',
        quantity : 1,
        price : 5000,
        image : 'img/watch.jfif'
    },
    {
        id : 4,
        name : 'Swimming Bags',
        quantity : 1,
        price : 2000,
        image : 'img/bag.jfif'
    },
    {
        id : 5,
        name : 'Swimming Cap',
        quantity : 1,
        price : 300,
        image : 'img/swimmimg_cap.jfif'
    },
    {
        id : 6,
        name : 'Life Jacket',
        quantity : 1,
        price : 4300,
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

    if(sessionStorage.getItem("cart")){
        cart = JSON.parse(sessionStorage.getItem("cart")); // get 'cart' string array from local storage
        displayCart();                                   // and converting it into it's original format
        getTotal();
    }


    // Function that search products
    function searchProducts(test){
        document.querySelector('.container').innerHTML = " ";

        let filteredCart = product_list.filter(obj => obj.name.toLowerCase().includes(test.toLowerCase()));
        if(filteredCart.length==0){
            document.querySelector('.container').innerHTML = "<div id='empty-msg'><p>There is no such item on the showcase.</p></div>";
        }else{
            filteredCart.forEach(item => {
                let itemHTML = `
                            <div class="item-box">
                                <img src="${item.image}" alt="${item.name}"><br>
                                <p>${item.name}</p>
                                <p>Rs. ${item.price}.00</p>
                                <button class='add-cart' onclick='addToBasket(${item.id})'>Add to cart</button>
                            </div>`;
            document.querySelector('.container').innerHTML += itemHTML; })
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
                    <img src="${image}" alt="${image}" style="float:left;height:60px;margin-right:10px">
                    <span> ${name}</span><br>
                    <span> Rs. ${price}</span><br>
                    <div class="q-box">
                        <button class="min" onclick="decrementQuantity(${index})">-</button>
                        <span class="quantity_num">${quantity}</span>
                        <button class="plus" onclick="incrementQuantity(${index})">+</button>
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
        document.getElementById('display-total').innerHTML = `Total  :  Rs ${tot}.00`;
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
        let element = product_list.find(item => item.id == cart[index].id);
        cart[index].price = element.price * cart[index].quantity;
    }

    // Function to checkout
    function checkout() {
        if(cart.length==0){
            alert("you cannot checkout with having empty cart");
        }else{
            window.location.href = 'checkout.html';
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