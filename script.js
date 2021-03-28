$(document).ready(function(){
  $(window).scroll(function(){
    if(this.scrollY > 20)
    {
      $(".navbar").addClass("sticky");
      $(".navbar img").css("transform", "scale(0.75)");
      $(".wrapper").css("opacity", 0);
    }
    else {
      $(".navbar").removeClass("sticky");
      $(".navbar img").css("transform", "scale(1)");
      $(".wrapper").css("opacity", 1);
    }
  })
})
// Global variables
var products = [];
var cartItems = [];
var CART = document.getElementById("cart_n");
var pizzaDiv = document.getElementById("pizzaDiv");
var chickenDiv = document.getElementById("chickenDiv");
var saladDiv = document.getElementById("saladDiv");
var popDiv = document.getElementById("popDiv");
let tempQuantity = 1;

if(localStorage.getItem('position')){
  var positions = [JSON.parse(localStorage.getItem("position"))];
} else {
  var positions = [];
}

var PIZZA = [
  {id: 'p1', name: 'Seadfood Pesto Pizza', description: 'Shrimps, crabs and broccoli on the green Pesto crust', price: 10, quantity: 1, total: 0},
  {id: 'p2', name: 'Cocktail Seafood Pizza', description: 'Shrimps, crabs and ham with Thousand Island sauce', price: 10, quantity: 1, total: 0},
  {id: 'p3', name: 'Cocktail shrimp Pizza', description: 'Shrimps, mushrooms, pineapples and tomatoes', price: 10, quantity: 1, total: 0},
  {id: 'p4', name: 'Tropical Seafood Pizza', description: 'Shrimps, clams, squids and pineapples with Thousand Island sauce', price: 10, quantity: 1, total: 0}
];
var CHICKEN = [
  {id: 'c1', name: 'Roasted Chicken', description: 'Fish sauce with hot caramel sauce cover fried chicken with crispy garlic on top', price: 10, quantity: 1, total: 0},
  {id: 'c2', name: 'Spcicy Chicken', description: 'Deep-fried chicken coated with honey and soysauce', price: 10, quantity: 1, total: 0},
  {id: 'c3', name: 'Traditional Chicken', description: 'Ultra crispy baked chicken wings tossed in a classic spicy sauce', price: 10, quantity: 1, total: 0},
  {id: 'c4', name: 'Large piece of Chicken', description: 'Chicken’s disk spotted with white sesames and freshly picked lemongrass with Thai spicy chillies.', price: 10, quantity: 1, total: 0}
];
var SALAD = [
  {id: 's1', name: 'Caesars Salad', description: 'Kale, egg, red radish, French bean, boiled potato, broccoli, grilled pineapple', price: 10, quantity: 1, total: 0},
  {id: 's2', name: 'Garden Salad', description: 'Mixed greens, radish sprout, French bean, pasta, red bean, celery', price: 10, quantity: 1, total: 0},
  {id: 's3', name: 'Signature Salad', description: 'Mixed greens, carrot, onion, sweet corn, Smoked Duck Breast', price: 10, quantity: 1, total: 0},
  {id: 's4', name: 'Stripped Chicken Salad', description: 'The herbaceous and tangy blend of spices in zaatar', price: 10, quantity: 1, total: 0}
];
// function
function HTMLPizza(i){
  let URL = `pizza img/pizza${i}.png`;
  let btn = `btnPIZZA${i}`;
  return `
  <div class="col-lg-3">
    <div class="card pizza">
      <img src="${URL}" class="pizza-img" alt="">
      <div class="card-body">
        <div class="info">
        <h5 class="card-title">${PIZZA[i-1].name}</h5>
        <p class="card-text">${PIZZA[i-1].description}</p>
        </div>
        <div class="price-info">
          <div class="row">
            <div class="col-sm-6">
              <p>Price:</p>
              <h5>$${PIZZA[i-1].price}.00</h5>
            </div>
            <div class="col-sm-6">
              <button id="${btn}" type="button" onclick="popOver('${i}', '${PIZZA[i-1].id}'); showPop();" class="btn btn-outline-danger">Add cart <i class="fas fa-arrow-right"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}
function HTMLChicken(i){
  let URL = `chicken img/chicken${i}.jpg`;
  let btn = `btnCHICKEN${i}`;
  return `
  <div class="col-lg-3">
    <div class="card">
      <img src="${URL}" class="rounded" alt="">
      <div class="card-body">
        <div class="info">
        <h5 class="card-title">${CHICKEN[i-1].name}</h5>
        <p class="card-text">${CHICKEN[i-1].description}</p>
        </div>
        <div class="price-info">
          <div class="row">
            <div class="col-sm-6">
              <p>Price:</p>
              <h5>$${CHICKEN[i-1].price}.00</h5>
            </div>
            <div class="col-sm-6">
              <button id="${btn}" type="button" onclick="popOver('${i}', '${CHICKEN[i-1].id}'); showPop();" class="btn btn-outline-danger">Add cart <i class="fas fa-arrow-right"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}
function HTMLSalad(i){
  let URL = `salad img/salad${i}.png`;
  let btn = `btnSalad${i}`;
  return `
  <div class="col-lg-3">
    <div class="card">
      <img src="${URL}" alt="">
      <div class="card-body">
        <div class="info">
        <h5 class="card-title">${SALAD[i-1].name}</h5>
        <p class="card-text">${SALAD[i-1].description}</p>
        </div>
        <div class="price-info">
          <div class="row">
            <div class="col-sm-6">
              <p>Price:</p>
              <h5>$${SALAD[i-1].price}.00</h5>
            </div>
            <div class="col-sm-6">
              <button id="${btn}" type="button" onclick="popOver('${i}', '${SALAD[i-1].id}', '${btn}'); showPop();" class="btn btn-outline-danger btnPop">Add cart <i class="fas fa-arrow-right"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

function popOver(i, id, b){
 if(id == `s${i}`){
  let URL = `salad img/salad${i}.png`;
  //let btn = `btnSALAD${i}`;
  popDiv.innerHTML = `<div class="card-pop">
    <img src="${URL}" alt="">
    <div class="card-body">
      <div class="info">
      <h5 class="card-title">${SALAD[i-1].name}</h5>
      <p class="card-text">${SALAD[i-1].description}</p>
      </div>
      <br>
      <label for="addition">Addition</label><br>
      <input type="radio" name="addition" value="mayonaise">Mayonaise<br>
      <input type="radio" name="addition" value="peanut">Grilled peanut<br><br>
      <div class="price-info">
        <div class="row">
          <div class="col-sm-4">
          <button width="50px" class="btn-primary rounded" onclick="reduce('${SALAD[i-1].id}', 'btnSALAD')">-</button>
          <input style="width: 2rem;" id="${SALAD[i-1].id}" value="${SALAD[i-1].quantity}" disabled>
          <button width="40px" class="btn-primary rounded" onclick="add('${SALAD[i-1].id}', 'btnSALAD')">+</button>
          </div>
          <div class="col-sm-4">
            <button type="button" onclick="hidePop()" class="btn btn-outline-danger">Cancel</button>
          </div>
          <div class="col-sm-4">
            <button  type="button" onclick="cart('${SALAD[i-1].id}', '${SALAD[i-1].name}', '${SALAD[i-1].description}', '${SALAD[i-1].price}', '${SALAD[i-1].quantity}', '${SALAD[i-1].total}', '${URL}', '${i}', '${b}');hidePop()" class="btn btn-outline-success">Add cart <i class="fas fa-arrow-right"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
} else if(id == `c${i}`){
  let URL = `chicken img/chicken${i}.jpg`;
  let btn = `btnCHICKEN${i}`;
  popDiv.innerHTML = `<div class="card-pop">
    <img src="${URL}" alt="">
    <div class="card-body">
      <div class="info">
      <h5 class="card-title">${CHICKEN[i-1].name}</h5>
      <p class="card-text">${CHICKEN[i-1].description}</p>
      </div>
      <br>
      <label for="addition">Addition</label><br>
      <input type="radio" name="addition" value="flakes">Chillies flakes<br>
      <input type="radio" name="addition" value="sauces">Bue cheese sauces<br><br>
      <div class="price-info">
        <div class="row">
          <div class="col-sm-4">
          <button width="50px" class="btn-primary rounded" onclick="reduce('${CHICKEN[i-1].id}', 'btnCHICKEN')">-</button>
          <input style="width: 2rem;" id="${CHICKEN[i-1].id}" value="${CHICKEN[i-1].quantity}" disabled>
          <button width="40px" class="btn-primary rounded" onclick="add('${CHICKEN[i-1].id}', 'btnCHICKEN')">+</button>
          </div>
          <div class="col-sm-4">
            <button type="button" onclick="hidePop()" class="btn btn-outline-danger">Cancel</button>
          </div>
          <div class="col-sm-4">
            <button id="${btn}" type="button" onclick="cart('${CHICKEN[i-1].id}', '${CHICKEN[i-1].name}', '${CHICKEN[i-1].description}', '${CHICKEN[i-1].price}', '${CHICKEN[i-1].quantity}', '${CHICKEN[i-1].total}', '${URL}', '${i}', '${btn}');hidePop()" class="btn btn-outline-success">Add cart <i class="fas fa-arrow-right"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
} else if(id == `p${i}`){
  let URL = `pizza img/pizza${i}.png`;
  let btn = `btnPIZZA${i}`;
  popDiv.innerHTML = `<div class="card-pop">
    <img src="${URL}" alt="">
    <div class="card-body">
      <div class="info">
      <h5 class="card-title">${PIZZA[i-1].name}</h5>
      <p class="card-text">${PIZZA[i-1].description}</p>
      </div>
      <br>
      <label for="addition">Addition</label><br>
      <input type="radio" name="addition" value="cheeses">Shredded cheeses<br>
      <input type="radio" name="addition" value="peppers">Peppers<br><br>
      <div class="price-info">
        <div class="row">
          <div class="col-sm-4">
          <button width="50px" class="btn-primary rounded" onclick="reduce('${PIZZA[i-1].id}', 'btnPIZZA')">-</button>
          <input style="width: 2rem;" id="${PIZZA[i-1].id}" value="${PIZZA[i-1].quantity}" disabled>
          <button width="40px" class="btn-primary rounded" onclick="add('${PIZZA[i-1].id}', 'btnPIZZA')">+</button>
          </div>
          <div class="col-sm-4">
            <button type="button" onclick="hidePop()" class="btn btn-outline-danger">Cancel</button>
          </div>
          <div class="col-sm-4">
            <button id="${btn}" type="button" onclick="cart('${PIZZA[i-1].id}', '${PIZZA[i-1].name}', '${PIZZA[i-1].description}', '${PIZZA[i-1].price}', '${PIZZA[i-1].quantity}', '${PIZZA[i-1].total}', '${URL}', '${i}', '${btn}');hidePop()" class="btn btn-outline-success">Add cart <i class="fas fa-arrow-right"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}
}
function showPop() {
  $("#popDiv").css("display", "flex");
  $("body").css("overflow", "hidden");
  setTimeout(function(){
    $("#popDiv").css("opacity", 1);
    $(".list").css("opacity", 0.5);
  }, 10);
}
function hidePop() {
  $("#popDiv").css("opacity", 0);
  $(".list").css("opacity", 1);
  $("body").css("overflow", "visible");
  setTimeout(function(){
    $("#popDiv").css("display", "none");
  }, 300);
}
function alert(){
  const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    icon: 'success',
    iconHtml: '✔',
    timer: 1000
  });
  toast.fire({
    type: 'success',
    title: 'Added to shopping cart'
  })
}
function reduce(id, attr){
  if(attr == 'btnSALAD'){
  for (let i = 0; i < SALAD.length; i++) {
    if(SALAD[i].id == id && SALAD[i].quantity > 1){
        SALAD[i].quantity = parseInt(SALAD[i].quantity) - 1;
        document.getElementById(id).value = SALAD[i].quantity;
        tempQuantity = SALAD[i].quantity;
    }
  }
} else if(attr == 'btnCHICKEN'){
    for (let i = 0; i < CHICKEN.length; i++) {
      if(CHICKEN[i].id == id && CHICKEN[i].quantity > 1){
        CHICKEN[i].quantity = parseInt(CHICKEN[i].quantity) - 1;
       document.getElementById(id).value = CHICKEN[i].quantity;
       tempQuantity = CHICKEN[i].quantity;
  }
}
} else if(attr == 'btnPIZZA'){
    for (let i = 0; i < PIZZA.length; i++) {
      if(PIZZA[i].id == id && PIZZA[i].quantity > 1){
        PIZZA[i].quantity = parseInt(PIZZA[i].quantity) - 1;
       document.getElementById(id).value = PIZZA[i].quantity;
       tempQuantity = PIZZA[i].quantity;
  }
}
}
}

function add(id, attr){
  if(attr == 'btnSALAD'){
  for (let index = 0; index < SALAD.length; index++) {
    if(SALAD[index].id == id && SALAD[index].quantity > 0){
        SALAD[index].quantity = parseInt(SALAD[index].quantity) + 1;
        document.getElementById(id).value = SALAD[index].quantity;
        tempQuantity = SALAD[index].quantity;
    }
  }
} else if(attr == 'btnCHICKEN'){
  for (let index = 0; index < CHICKEN.length; index++) {
    if(CHICKEN[index].id == id && CHICKEN[index].quantity > 0){
        CHICKEN[index].quantity = parseInt(CHICKEN[index].quantity) + 1;
        document.getElementById(id).value = CHICKEN[index].quantity;
        tempQuantity = CHICKEN[index].quantity;
    }
  }
} else if(attr == 'btnPIZZA'){
  for (let index = 0; index < PIZZA.length; index++) {
    if(PIZZA[index].id == id && PIZZA[index].quantity > 0){
        PIZZA[index].quantity = parseInt(PIZZA[index].quantity) + 1;
        document.getElementById(id).value = PIZZA[index].quantity;
        tempQuantity = PIZZA[index].quantity;
    }
  }
}
}

function cart(id, name, description, price, quantity, total, url, i, btncart){
  var item = {
    id: id,
    name: name,
    description: description,
    price: price,
    quantity: tempQuantity,
    total: total,
    url: url
  }
  positions.push(id);
  localStorage.setItem("position", JSON.stringify(positions));
  cartItems.push(item);
  let storage = JSON.parse(localStorage.getItem("cart"));

  if(storage == null){
    products.push(item);
    localStorage.setItem("cart", JSON.stringify(products));
  } else{
    products = JSON.parse(localStorage.getItem("cart"));
    products.push(item);
    localStorage.setItem("cart", JSON.stringify(products));
  }
  products = JSON.parse(localStorage.getItem("cart"));
  CART.innerHTML = `[${products.length}]`;
  document.getElementById(btncart).style.display = "none";
  alert();
}

function render(){
  if(localStorage.getItem("position")){
    var productsCart = JSON.parse(localStorage.getItem("position"));
  } else {
    var productsCart = [];
    localStorage.setItem("position", JSON.stringify(productsCart));
    productsCart = JSON.parse(localStorage.getItem("position"));
  }

  for (let index = 1; index <= PIZZA.length; index++) {
    pizzaDiv.innerHTML += `${HTMLPizza(index)}`;
  }
  for (let index = 1; index <= CHICKEN.length; index++) {
    chickenDiv.innerHTML += `${HTMLChicken(index)}`;
  }
  for (let index = 1; index <= SALAD.length; index++) {
    saladDiv.innerHTML += `${HTMLSalad(index)}`;
  }

  if(localStorage.getItem("cart") != null){
    products = JSON.parse(localStorage.getItem("cart"));
    CART.innerHTML = `[${products.length}]`;
  }
};
