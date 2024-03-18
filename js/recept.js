var cart = JSON.parse(sessionStorage.getItem('cart'));

let item_recept_arry = JSON.stringify('item_recept',cart);

sessionStorage.removeItem('cart');




