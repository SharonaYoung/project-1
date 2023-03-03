// api: https://api.giphy.com/v1/gifs/search?api_key=vg6WXDw9SY1PiOQGjPyZw2r4nytNngc0&q=cats&limit=12&offset=0&rating=g&lang=en
const API_key = "vg6WXDw9SY1PiOQGjPyZw2r4nytNngc0";

// ajax request to api
async function getGif() {
  try{
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_key}&q=cats&limit=12&offset=0&rating=g&lang=en`);
  const data = await response.json();

  console.log(data.meta);
  console.log(data.data);
  }
  catch (error) {
    console.log(error);
  }
}
getGif();

function renderGifs(gifs) {
  const gifTemplate = gifs.map(gif => (
    console.log(gif.title)
  ))
}
renderGifs();