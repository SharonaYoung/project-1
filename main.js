// api: https://api.giphy.com/v1/gifs/search?api_key=vg6WXDw9SY1PiOQGjPyZw2r4nytNngc0&q=cats&limit=12&offset=0&rating=g&lang=en
const API_key = "vg6WXDw9SY1PiOQGjPyZw2r4nytNngc0";
const mainEl = document.querySelector("main");
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
    <img src=${gif.images.fixed_height.url} alt="gif image" />
    `
  // remove comma after each image    
  )).join(' ');
  gifsEl.innerHTML = gifTemplate;
};

// function for clicking the submit button
mainEl.addEventListener("click", async function(event){
  event.preventDefault();
  searchWord = inputEl.value;
  
  if(event.target.matches('#submitBtn')){
    getGifs();

    const keywordBtn = document.createElement("button");
    // make button for keywords  
    keywordBtn.textContent = inputEl.value;
    keywords.append(keywordBtn);
    keywordBtn.classList.add("word");  
    
    // store last search words in local storage    
    words.push(searchWord);
    localStorage.setItem("searched_words", JSON.stringify(words));  
  };
  
  inputEl.value = "";
});

// function for clicking the dynamic search word button
mainEl.addEventListener('click', async function(event){
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

// show button of last word 
const lastWordBtn = document.createElement("button");
const lastSearched = JSON.parse(localStorage.getItem("searched_words"));

if(lastSearched){
  console.log(lastSearched);
  lastSearched.map(function(word){
    lastWordBtn.innerText = word;
    lastWordBtn.classList.add("word");
    lastWord.append(lastWordBtn);
    console.log(word);
  })
}
