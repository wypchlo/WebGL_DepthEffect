"use strict";

function loadImage(src, callback) {
    var image = new Image();
    image.src = src;
    image.onload = callback;
    return image;
  }

function loadImages(urls, callback) {
let images = [];
const imagesToLoad = urls.length;

const onImageLoad = () => {
    --imagesToLoad;
    if (imagesToLoad == 0)
    callback(images);
};

for (let i = 0; i < imagesToLoad; ++i) {
    const image = loadImage(urls[ii], onImageLoad);
    images.push(image);
}
}