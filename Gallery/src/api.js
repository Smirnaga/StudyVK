console.log('api.js')

 const API = {};

 const PHOTOS_URL =
    'https://jsonplaceholder.typicode.com/photos?_limit=50';
 
    API.getPhotos= () => {
        return fetch(PHOTOS_URL).then(res => res.json());
    }
