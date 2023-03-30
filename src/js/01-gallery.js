// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

console.log(galleryItems);
const listContainer = document.querySelector('.gallery');


function makeImageLibrary(images){
	return images.map(({ original, preview, description }) => {
		  return `<li class="gallery__item">
			<a class="gallery__link" href="${original}">
				 <img class="gallery__image" src="${preview}" alt="${description}"/>
			</a>
		</li>`;
		}).join('');
}

listContainer.innerHTML = makeImageLibrary(galleryItems)



let lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 })