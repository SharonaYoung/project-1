// api: https://api.giphy.com/v1/gifs/search?api_key=vg6WXDw9SY1PiOQGjPyZw2r4nytNngc0&q=cats&limit=12&offset=0&rating=g&lang=en
const mainEl = document.querySelector('main');
const API_key = "vg6WXDw9SY1PiOQGjPyZw2r4nytNngc0";

// ajax request to api
async function getGif() {
  try{
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_key}&q=cats&limit=12&offset=0&rating=g&lang=en`);
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
  //     <img src=${gif.images.fixed_height.url} alt="gif image" />
  //   `
  // remove comma after each image    
  )).join(' ');
  mainEl.innerHTML = gifTemplate;
};