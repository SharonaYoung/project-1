const API_key = "";
const form = document.querySelector("form");
const mainEl = document.querySelector("main");
const buttons = document.querySelector("#buttons");
const inputEl = document.querySelector("#keyword");
const gifsEl = document.querySelector("#gifs");
const keywords = document.querySelector('#keywordBtns');
const lastWord = document.querySelector("#lastWordBtn");

// variable to store user input for local storage
const words = []

// function for api call 
let searchWord;
async function getGifs() {
 try{
    const response =await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_key}&q=${searchWord}&limit=12&offset=0&rating=g&lang=en`);
      const data = await response.json();
      renderGifs(data.data);
  }
  catch (error) {
    console.log(error);
  }
}

// function to display gifs
function renderGifs(gifs) {
  const gifTemplate = gifs.map(gif => ( 
    `
    <img src=${gif.images.fixed_height.url} alt="gif image" class="img-thumbnail rounded m-1"/>
    `
  // remove comma after each image    
  )).join(' ');
  gifsEl.innerHTML = gifTemplate;
};

// function for clicking the submit button
form.addEventListener("submit", async function(event){
  event.preventDefault();
  searchWord = inputEl.value;
  console.log("submit  pushed");
  // pull gifs with input value
  getGifs();

  // make button for keywords  
  const keywordBtn = document.createElement("button");
  keywordBtn.textContent = inputEl.value;
  keywords.append(keywordBtn);
  keywordBtn.classList.add("word");  
  
  // store last searched words in local storage    
  words.push(searchWord);
  localStorage.setItem("searched_words", JSON.stringify(words));  

  // clear input block
  inputEl.value = "";
});

// function for clicking the dynamic search word button
buttons.addEventListener('click', async function(event){
  event.preventDefault();
  searchWord=event.target.innerText;
  if(event.target.matches(".word")){
    try{
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_key}&q=${searchWord}&limit=12&offset=0&rating=g&lang=en`);
      const data = await response.json();
      // call the function to show returned gifs
      renderGifs(data.data);
      }
      catch (error) {
        console.log(error);
    }
  }
})

// show buttons of last words
const lastSearched = JSON.parse(localStorage.getItem("searched_words"));

if(lastSearched){
  const showWords = lastSearched.map((word) => `
    <button class = "word btn btn-outline-secondary btn-sm">${word}</button>
  `
  ).join(" ");
  lastWord.innerHTML = showWords;
}