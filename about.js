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

var info = document.querySelector(".info");
var img = [
  "profile img/goku.jpg",
  "profile img/thinh.jpg",
  "profile img/nhan.jpg",
  "profile img/khoamoi.jpg"
];
//https://my-json-server.typicode.com/HaMInhKhoa/mockjson/db?fbclid=IwAR1xDZDRpTIYZlCbIkXf5woRVCBnrLtjkDtLxYJVuVnsOcWTsWRqfz5n-rc
function ajax(){
  $(".text-center").css("display", "block");

  let  xhr = new XMLHttpRequest();
  xhr.open("GET", "https://my-json-server.typicode.com/HaMInhKhoa/mockjson/db?fbclid=IwAR1xDZDRpTIYZlCbIkXf5woRVCBnrLtjkDtLxYJVuVnsOcWTsWRqfz5n-rc", true);

  xhr.send();

  xhr.onload = function(){
    if(this.status == 200){
      let response = JSON.parse(this.responseText);
      //console.log(Object.keys(response.value));
      let output = "";
      let temp = response.profile;
      let i = 0;
      temp.forEach(function(item) {
        output += `
        <div class="col-md-3 col-sm-6 f">
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                  <img src="${img[i]}">
                <div class="detail">
                  <h3>${item.Id}</h3>
                  <h4>${item.Name}</h4>
                </div>
              </div>
              <div class="flip-card-back">
               <h4>${item.inCharge}</h4>
              </div>
            </div>
          </div>
        </div>
        `;
        i++;
      });

      info.innerHTML = output;
    }
  }
}
