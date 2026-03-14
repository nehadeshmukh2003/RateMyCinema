const API_KEY="e70a09c27154bd32cf40e81b34923487"

let userLogged=false

const moviesContainer=document.querySelector(".movies")

async function getMovies(){

const res=await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)

const data=await res.json()

displayMovies(data.results)

}

function displayMovies(movies){

moviesContainer.innerHTML=""

movies.forEach(movie=>{

const div=document.createElement("div")

div.classList.add("movie")

div.innerHTML=`

<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">

<div class="movie-info">

<h3>${movie.title}</h3>

<p>⭐ ${movie.vote_average}</p>

<div class="stars">

<span>★</span>
<span>★</span>
<span>★</span>
<span>★</span>
<span>★</span>

</div>

</div>

`

moviesContainer.appendChild(div)

addRating(div)

})

}

function addRating(card){

const stars=card.querySelectorAll(".stars span")

stars.forEach((star,index)=>{

star.addEventListener("click",()=>{

if(!userLogged){
alert("Please login to rate movies")
return
}

stars.forEach(s=>s.classList.remove("active"))

for(let i=0;i<=index;i++){
stars[i].classList.add("active")
}

})

})

}


function signup(){

let email=document.getElementById("email").value
let pass=document.getElementById("pass").value

localStorage.setItem("user",email)
localStorage.setItem("pass",pass)

alert("Account created")

document.getElementById("signupModal").style.display="none"

}

function login(){

let email=document.getElementById("loginEmail").value
let pass=document.getElementById("loginPass").value

if(email===localStorage.getItem("user") && pass===localStorage.getItem("pass")){

userLogged=true

alert("Login successful")

document.getElementById("loginModal").style.display="none"

}else{
alert("Invalid login")
}

}


document.getElementById("loginBtn").onclick=()=>{
document.getElementById("loginModal").style.display="block"
}

function openSignup(){
document.getElementById("loginModal").style.display="none"
document.getElementById("signupModal").style.display="block"
}


function submitFeedback(){

if(!userLogged){
alert("Login to submit feedback")
return
}

let text=document.getElementById("feedbackText").value

alert("Feedback submitted: "+text)

}

const toggle = document.getElementById("modeToggle")

toggle.onclick = () => {

document.body.classList.toggle("light")

if(document.body.classList.contains("light")){
toggle.innerHTML="🌞"
}else{
toggle.innerHTML="🌙"
}

}


document.getElementById("search").addEventListener("keyup",async(e)=>{

let value=e.target.value

const res=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`)

const data=await res.json()

displayMovies(data.results)

})


getMovies()