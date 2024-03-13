let cart_items = [
    {
        id : 0,
        name : 'Swimming Goggles',
        quantity : 1,
        price : 200,
        image : 'img/goggle.jfif'

    },
    {
        id : 1,
        name : 'Diving maskes',
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

    let container = document.querySelector('.container');
    cart_items.forEach((item, index) => {
        let itemHTML = `
            <div class="item-box">
                <img src="${item.image}" alt="${item.name}"><br>
                <p>${item.name}</p>
                <p>$ ${item.price}.00</p>
                <button class='add-cart' onclick='addToBasket(${index})'>Add to cart</button>
            </div>`;
        container.innerHTML += itemHTML;
    });


    function addToBasket(a){
        for(let obj of cart){
            if(obj.id == cart_items[a].id){
                obj.quantity++;
                displayCart();
                getTotal()
                return;
            }
        }
        cart.push({...cart_items[a]});  // ...cart_items[a]  this methode is used to copy and object which is creating a new object 
        displayCart();                  // from the original object
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
                    <span>price : ${price}</span><br>
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

    function deleteItem(a){
        cart.splice(a, 1);
        displayCart();
        getTotal()
    }

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
        displayCart();
        getTotal();
    }

    // Function to decrement quantity
    function decrementQuantity(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        }
        displayCart();
        getTotal();
    }