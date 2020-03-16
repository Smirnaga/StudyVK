$(() => {
    console.log('fdfdfdf');
});

$(() => {
    const imageTemplate = $('#imageTemplate').html();
    

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