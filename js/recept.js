sessionStorage.removeItem('cart');

let recept_items = JSON.parse(sessionStorage.getItem('recept_items'));

// Display ordered items in table
let content;
let total = 0;
recept_items.forEach(element => {
    content = `<tr>
                <td>
                    Name : ${element.name}<br>
                    Price : ${element.price/element.quantity} X ${element.quantity} = ${element.price}
                </td>
            </tr>`;

    total += element.price;
    document.getElementById('table-content').innerHTML += content;
});

document.getElementById('total-1').innerHTML = `<b>Total :<br> Rs ${total}.00</b>`;


// Getting date to display
const date = new Date();
document.getElementById('date').innerHTML = `Date :<br> ${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;


sessionStorage.removeItem('Ref_no');
let order_num = sessionStorage.getItem('copy_Ref_no');
document.getElementById('order-num').innerHTML = `Order number :<br>${order_num}`;


document.getElementById('table-content').innerHTML += `<td style="text-align: center;font-weight: bold;">
                                                    Total : Rs ${total}
                                                    </td>`;