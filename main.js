// api: https://api.giphy.com/v1/gifs/search?api_key=vg6WXDw9SY1PiOQGjPyZw2r4nytNngc0&q=cats&limit=12&offset=0&rating=g&lang=en
const mainEl = document.querySelector('main');
const inputEl = document.querySelector('#keyword');
const lastWordEl = document.querySelector('#lastWordBtn');
const keywords = document.querySelector('#keywordBtns');
const search = document.querySelector('#keywordForm');
const API_key = "vg6WXDw9SY1PiOQGjPyZw2r4nytNngc0";

// keyword to search
let keyword;
const lastBtn = document.createElement('button');
// show button with last searched keyword
const lastKeyword = localStorage.getItem('last_keyword');
if(lastKeyword){
  lastBtn.textContent = lastKeyword;
  lastWordEl.append(lastBtn);
  lastBtn.classList.add("word");
}  

search.addEventListener('submit', async function(event){
  event.preventDefault();
  keyword = inputEl.value;
  console.log(keyword);

  const keywordBtn = document.createElement('button');
  
  keywordBtn.textContent = inputEl.value;
  keywords.append(keywordBtn);
  keywordBtn.classList.add("word");
  
  // function to make button for keyword, place after previous
  // function to use text content for search

  // store last keyword in local storage
  localStorage.setItem('last_keyword', keyword);

  // clear input box
  inputEl.value = '';
})

// event delegation for button clicks to display gifs
mainEl.addEventListener('click', function(event){
  if(event.target.matches('.word')){
    let searchWord = event.target.innerText;
    console.log('I say ' + searchWord);

    async function getGif() {
      try{
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_key}&q=${searchWord}&limit=12&offset=0&rating=g&lang=en`);
        const data = await response.json();
        console.log(data.data);
        // call the function to show returned gifs
        renderGifs(data.data);
        }
        catch (error) {
          console.log(error);
      }
    }
    getGif();
  };
});


/*
// ajax request to api
async function getGif() {
  try{
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_key}&q=kitty&limit=12&offset=0&rating=g&lang=en`);
    const data = await response.json();
    console.log(data.data);
    // call the function to show returned gifs
    renderGifs(data.data);
    }
    catch (error) {
      console.log(error);
  }
}
getGif();
// function to show gifs in the DOM
function renderGifs(gifs) {
  const gifTemplate = gifs.map(gif => ( 
    `
      <img src=${gif.images.fixed_height.url} alt="gif image" />
    `
  // remove comma after each image    
  )).join(' ');
  mainEl.innerHTML = gifTemplate;
};
*/

// keep keyword in local storage
