const cards = document.querySelectorAll(".movie-card")

cards.forEach(card => {

const stars = card.querySelectorAll(".stars span")
const ratingText = card.querySelector(".rating")

stars.forEach(star => {

star.addEventListener("click", () => {

let value = star.getAttribute("data-rate")

ratingText.innerText = "Rating: " + value + "/5"

stars.forEach(s => s.style.color = "#aaa")

for(let i=0;i<value;i++){
stars[i].style.color="gold"
}

})

})

})



const searchBar = document.getElementById("searchBar")

searchBar.addEventListener("keyup", () => {

let searchValue = searchBar.value.toLowerCase()

cards.forEach(card => {

let title = card.querySelector("h2").innerText.toLowerCase()

if(title.includes(searchValue)){
card.style.display="block"
}
else{
card.style.display="none"
}

})

})