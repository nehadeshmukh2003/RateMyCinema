const API_KEY = "e70a09c27154bd32cf40e81b34923487"

const moviesContainer = document.querySelector(".movies")

function isLogged(){
return localStorage.getItem("loggedIn") === "true"
}

async function getMovies(){

const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
const data = await res.json()

displayMovies(data.results)

}

function displayMovies(movies){

moviesContainer.innerHTML=""

movies.forEach(movie=>{

const div=document.createElement("div")
div.classList.add("movie")

const rating = localStorage.getItem("rating_"+movie.id)

div.innerHTML=`

<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">

<div class="movie-info">

<h3>${movie.title}</h3>

<p>⭐ ${movie.vote_average}</p>

<div class="stars">

<span data-rate="1">★</span>
<span data-rate="2">★</span>
<span data-rate="3">★</span>
<span data-rate="4">★</span>
<span data-rate="5">★</span>

</div>

<button class="trailerBtn">Watch Trailer</button>

</div>

`

moviesContainer.appendChild(div)

addRating(div,movie.id)

if(rating){
const stars = div.querySelectorAll(".stars span")
for(let i=0;i<rating;i++){
stars[i].classList.add("active")
}
}

div.querySelector(".trailerBtn").onclick=()=>{
openTrailer(movie.id)
}

})

}

function addRating(card,movieId){

const stars=card.querySelectorAll(".stars span")

stars.forEach((star,index)=>{

star.addEventListener("click",()=>{

if(!isLogged()){
alert("Please login to rate movies")
return
}

localStorage.setItem("rating_"+movieId,index+1)

stars.forEach(s=>s.classList.remove("active"))

for(let i=0;i<=index;i++){
stars[i].classList.add("active")
}

})

})

}


async function openTrailer(movieId){

const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`)
const data = await res.json()

if(data.results.length>0){

const key=data.results[0].key

const popup=window.open("","Trailer","width=800,height=500")

popup.document.write(`

<iframe width="100%" height="100%" 
src="https://www.youtube.com/embed/${key}" 
frameborder="0" allowfullscreen></iframe>

`)

}else{

alert("Trailer not available")

}

}


function signup(){

let name=document.getElementById("name").value
let email=document.getElementById("email").value
let pass=document.getElementById("pass").value

localStorage.setItem("username",name)
localStorage.setItem("user",email)
localStorage.setItem("pass",pass)

alert("Account created")

document.getElementById("signupModal").style.display="none"

}

function login(){

let email=document.getElementById("loginEmail").value
let pass=document.getElementById("loginPass").value

if(email===localStorage.getItem("user") && pass===localStorage.getItem("pass")){

localStorage.setItem("loggedIn","true")

alert("Login successful")

document.getElementById("loginModal").style.display="none"

updateAuthButton()

}else{
alert("Invalid login")
}

}

function logout(){

localStorage.removeItem("loggedIn")

alert("Logged out")

updateAuthButton()

}

function updateAuthButton(){

const btn=document.getElementById("authBtn")

if(isLogged()){

const name = localStorage.getItem("username")

btn.innerText="Logout"

document.querySelector(".hero h1").innerText="Welcome "+name

btn.onclick=logout

}else{

btn.innerText="Login"

btn.onclick=()=>{
document.getElementById("loginModal").style.display="block"
}

}

}


function openSignup(){

document.getElementById("loginModal").style.display="none"
document.getElementById("signupModal").style.display="block"

}


function submitFeedback(){

if(!isLogged()){
alert("Login to submit feedback")
return
}

let text=document.getElementById("feedbackText").value

alert("Feedback submitted: "+text)

document.getElementById("feedbackText").value=""

}


const toggle=document.getElementById("modeToggle")

toggle.onclick=()=>{

document.body.classList.toggle("light")

if(document.body.classList.contains("light")){
toggle.innerHTML="🌞"
}else{
toggle.innerHTML="🌙"
}

}


document.getElementById("search").addEventListener("keyup",async(e)=>{

let value=e.target.value

if(value.length<2){
getMovies()
return
}

const res=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`)
const data=await res.json()

displayMovies(data.results)

})


getMovies()
updateAuthButton()