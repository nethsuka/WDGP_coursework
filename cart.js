let cart_items = [
    {
        name : 'Swimming Goggles',
        quantity : 0,
        price : 200,
        image : 'img/goggle.jfif'

    },
    {
        name : 'Diving maskes',
        quantity : 0,
        price : 800,
        image : 'img/diving mask.jpg'
    },
    {
        name : 'Swimming suit',
        quantity : 0,
        price : 100,
        image : 'img/suit.jfif'
    },
    {
        name : 'Underwater watch band',
        quantity : 0,
        price : 700,
        image : 'img/watch.jfif'
    },
    {
        name : 'Swimming bags',
        quantity : 0,
        price : 500,
        image : 'img/bag.jfif'
    },
    {
        name : 'Swimming cap',
        quantity : 0,
        price : 200,
        image : 'img/swimmimg_cap.jfif'
    },
    {
        name : 'Life Jacket',
        quantity : 0,
        price : 130,
        image : 'img/jacket.jfif'
    },
];

let cart = [];

    let container = document.querySelector('.container');
    let i = 0;
    cart_items.forEach(item => {
        let itemHTML = `
            <div class="item-box">
                <img src="${item.image}" alt="${item.name}"><br>
                <p>${item.name}</p>
                <p>$ ${item.price}.00</p>`+
                "<button class='add-cart' onclick='addToBasket("+(i++)+")'>Add to cart</button>"+
            `</div>`;
        container.innerHTML += itemHTML;
    });


    function addToBasket(a){
        cart.push(cart_items[a]);
        displayCart();
        getTotal()
    }

    function displayCart(){
        j=0;
        increaseCartNum();
        if(cart.length==0){
            document.querySelector('.basket-item').innerHTML = "<p>Your cart is empty !</p>";
        }else{
            document.querySelector('.container2').innerHTML = cart.map(item => {
                let {name , image, price } = item;
                return(
                    `<div class="basket-item">
                    <img src="${image}" alt="" style="float:left;height:50px;margin-right:10px">
                    <span>name : ${name}</span><br>
                    <span>price : ${price}</span><br>
                    <div class="q-box">
                        <button class="plus">+</button>
                        <span class="quantity_num">01</span>
                        <button class="min">-</button>
                    </div>`+
                    "<button  class='delete_btn' onclick='deleteItem("+(j++)+")'>Delete</button>"+
                `</div>`
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
        document.getElementById('cart_num').innerHTML = cart.length;
    }

    function getTotal(){
        let tot = 0;
        for(let item of cart){
            tot += item.price;
        }
        document.getElementById('total_count').innerHTML = tot;
    }
