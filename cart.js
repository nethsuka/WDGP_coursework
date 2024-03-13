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


    function addToBasket(id){
        let p = product_list.find(item => item.id == id );
        for(let obj of cart){
            if(obj.id == p.id){
                obj.quantity++;
                // let index = cart.findIndex(element => element.id == p.id)
                // EelementPriceIncrease(index);
                displayCart();
                getTotal()
                return;
            }
        }
        cart.push({...p});  // {...p} this methode is used to copy an object from the original array
        console.log(cart);  // to check
        displayCart();
        getTotal()
    }

    
    function displayCart(){
        increaseCartNum();
        if(cart.length==0){
            document.querySelector('.basket-item').innerHTML = "<p style='text-align:left'>Your cart is empty !</p>";
        }else{
            document.querySelector('.container2').innerHTML = cart.map((item, index)=> {
                let {id, name , image, price , quantity} = item;
                return(
                    `<div class="basket-item">
                    <img src="${image}" alt="" style="float:left;height:50px;margin-right:10px">
                    <span>name : ${name}</span><br>
                    <span>price :Rs. ${price}</span><br>
                    <div class="q-box">
                        <button class="plus" onclick="incrementQuantity(${index})">+</button>
                        <span class="quantity_num">${quantity}</span>
                        <button class="min" onclick="decrementQuantity(${index})">-</button>
                    </div>
                    <button  class='delete_btn' onclick='deleteItem(${index})'>Delete</button>
                </div>`
                )
            }).join("<br>")
        }
    }

    //Fuction that delete selected items from the basket
    function deleteItem(index){
        cart.splice(index, 1);
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
            tot += item.price*item.quantity;
        }
        document.getElementById('total_count').innerHTML = tot;
    }

    // Function to increment quantity
    function incrementQuantity(index) {
        cart[index].quantity++;
        // EelementPriceIncrease(index);
        displayCart();
        getTotal();
    }

    // Function to decrement quantity
    function decrementQuantity(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        }
        // EelementPriceIncrease(index);
        displayCart();
        getTotal();
    }

    // function EelementPriceIncrease(index){
    //     let element = product_list.find(item => item.id == cart[index].id);     !!! when we enable this function you need change
    //     cart[index].price = element.price * cart[index].quantity;                   the logic of getTotal() function
    // }