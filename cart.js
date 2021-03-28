// Global variables
var products = JSON.parse(localStorage.getItem("cart"));
var cartItems = [];
var CART = document.getElementById("cart_n");
var table = document.getElementById("table");
var foot = document.getElementById("foot");
var total = 0;
var con = 0;
var con2 = JSON.parse(localStorage.getItem("position")); // position item in table

// function
function tableHTML(i){
  return `
       <tr>
       <th scope="row">${i+1}</th>
       <td><img style="width: 90px" src="${products[i].url}"></td>
       <td>${products[i].name}</td>
       <td>${products[i].quantity}</td>
       <td>${products[i].price * products[i].quantity}</td>
       <td><button class = "btn btn-danger rounded delete-item" onclick="remove('${products[i].id}')">X</button></td>
       </tr>
  `;
}

function clean(){
  localStorage.clear();
   for(let index = 0; index < products.length; index++){
     table.innerHTML += tableHTML(index);
     total += parseInt(products[index].total);
   }
  total = 0;
  table.innerHTML = `
     <tr>
     <th></th>
     <th></th>
     <th></th>
     </tr>
  `;
  foot.innerHTML = ``;
  CART.innerHTML = '';
  document.getElementById("btnBuy").style.display = "none";
  document.getElementById("btnClean").style.display = "none";
}

function buy(){
  Swal.fire({
    position: 'center',
    showConfirmButton: true,
    html: '<input id="swal-input1" class="swal2-input" type="text" placeholder="Enter your address">' +
    '<input id="swal-input2" class="swal2-input" type="tel" placeholder="Enter your phone number">',
    preConfirm: () => {
      if (document.getElementById('swal-input2').value && document.getElementById('swal-input1').value) {
         Swal.fire({
           position: 'center',
           type: 'success',
           icon: 'success',
           title: 'Purchase successfully',
           showConfirmButton: true,
         });
          clean();
      } else {
        Swal.showValidationMessage('Input missing');
      }
    },
    timer: 5000
  });
}
function remove(id){
  var products = JSON.parse(localStorage.getItem("cart"));
  for(let index = 0; index < products.length; index++){
    if (products[index].id = id){
      var x = products[index].id;
      products.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(products));
      total1();

      for (let index2 = 0; index2 < con2.length; index2++){
        if (x == con2[index2]){
          con2.splice(index2, 1);
          localStorage.setItem("positions",JSON.stringify(con2));
        }
      }
      updateCart();
    }
    else{
       updateCart();
     }
  }
}
function updateCart(){
  con = 0;
  var products = JSON.parse(localStorage.getItem("cart"));
  CART.innerHTML = `[${products.length}]`;
  table.innerHTML = '';
  for (let index = 0; index < con2.length; index++){
    var position = con2[index];
    for (let index3 = 0; index3 < products.length; index3++){
      if (position == products[index3].id){
        table.innerHTML +=`
        <tr>
          <th>${con+1}</th>
          <td><img style="width: 90px" src="${products[index3].url}"></td>
          <td>${products[index3].name}</td>
          <td>
          <button class = "btn btn-primary rounded"
          onclick="reduce('${products[index3].id}')">-</button>
          <input style = "width: 2rem;" id = "${products[index3].id}"
          value = "${products[index3].quantity}" disabled>
          <button class = "btn btn-primary rounded"
          onclick="add('${products[index3].id}')">+</button>
        </td>
        <td>${products[index3].price * products[index3].quantity}</td>
        <td><button class = "btn btn-danger rounded" onclick="remove('${products[index3].id}')">X</button></td>
        </tr>
        `
        products[index3].total = products[index3].price * products[index3].quantity;
        localStorage.setItem("cart", JSON.stringify(products));
      }
    }
    con = con + 1;
  }
//   if (total1() == 0 ){
// foot.innerHTML = '';
// } else {
foot.innerHTML = `
<tr>
<th></th>
<td></td>
<td></td>
<td></td>

<td>
<h5>Total:</h5>
</td>
<td>
$${total1()}.00
</td>
</tr>
<tr>
<th></th>
<td></td>
<td></td>
<th scope="col">
  <button id="btnClean" onclick="clean()" class="btn btn-warning">Delete All</button>
</th>
<th scope="col">
  <button id="btnBuy" onclick="buy()" class="btn btn-success">Buy</button>
</th>
</tr>`
// }
}

function total1(){
  for (let index = 0; index < products.length; index++) {
    total += parseInt(products[index].total);
  }
  return total;
}

function render(){
  for (let index = 0; index < products.length; index++) {
    table.innerHTML += tableHTML(index);
    products[index].total = products[index].price * products[index].quantity;
    total += products[index].total;
    console.log(products[index].quantity);
    console.log(products[index].price);
    console.log(products[index].total);
    console.log(total);
    localStorage.setItem("cart", JSON.stringify(products));
  }
//   if (total1() == 0 ){
// foot.innerHTML = '';
// } else {
foot.innerHTML = `<tr>
<th></th>
<td></td>
<td></td>
<td></td>

<td>
<h5>Total:</h5>
</td>
<td>
$${total}.00
</td>
</tr>
<tr>
<th></th>
<td></td>
<td></td>
<th scope="col">
  <button id="btnClean" onclick="clean()" class="btn btn-warning">Delete All</button>
</th>
<th scope="col">
  <button id="btnBuy" onclick="buy()" class="btn btn-success">Buy</button>
</th>
</tr>`

  products = JSON.parse(localStorage.getItem("cart"));
  CART.innerHTML = `[${products.length}]`;
}
