import $ from 'jquery';
import API from './api';
require('imports-loader?jQuery=jquery!./jquery.fancybox.js');
import  './jquery.fancybox.min.css';




 $(() => {
    const imageTemplate = $('#imageTemplate').html();
    const $gallery = $('#gallery');
    

    API.getPhotos().then(setGallery);

    function setGallery(imagesArray) {
        renderImages(imagesArray);
    }

    function renderImages(images) {
        $gallery.html(images.map(getImageHtml).join('\n'));
    }

    function getImageHtml(image) {
        return imageTemplate
            .replace('{{url}}', image.url)
            .replace('{{thumbnailUrl}}', image.thumbnailUrl)
            .replace('{{title}}', image.title);
    }

});