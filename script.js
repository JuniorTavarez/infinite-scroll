const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
// unsplash API
const count = 10;
const apiKey = 'Tx7smkjB01RvdItfRtqlrl9nEaeFQL6_TFA1-Sc0JSo';
// const apiUrl = `https://api.unsplash.com/search/photos?query=london&client_id=${apiKey}&count=${count}`;
// const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&topics/:dog/photos&count=${count}`;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Helper Function to Set Attributes on Dom Elements
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    console.log(key);
    console.log(attributes);
    element.setAttribute(key, attributes[key]);
  }
};

// Create Elements for Links & Photos, Add to Dom
function displayPhotos() {
  // Run function for each object in photosArray
  photosArray.forEach(photo => {
    // Creat <a> to link to Unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Put <img> inside <a>, then put both inside imageContainer Element

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if Scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000
    ? getPhotos()
    : '';
});

// On Load
getPhotos();
