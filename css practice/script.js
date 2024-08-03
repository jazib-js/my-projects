// setTimeout(disappear, 10000);

// let heart = document.getElementById("dil");
// let buttMessage = document.querySelector(".peach");

// function disappear() {
  
//   buttMessage.innerHTML = "🍑";
//   heart.innerHTML = "🍑";
  
// }
setTimeout(disappear, 11000);

let buttMessage = document.querySelectorAll(".peach");

function disappear() {
  for (let i = 0; i < buttMessage.length; i++) {
    buttMessage[i].innerHTML = "🍑";
  }
  let i = document.getElementById("i");
  i.innerHTML = "And"

  let love = document.getElementById("love");
  love.innerHTML = "your"

  let you = document.getElementById("you");
  you.innerHTML = "Butt"

  let zoya =document.getElementById("zoya");
  zoya.innerHTML = "";
}