import galleryItems from "./gallery-items.js";

//делаю разметку
const imgContainer = document.querySelector('.js-gallery');
const imgMarkup = createImgMarkup(galleryItems);

imgContainer.insertAdjacentHTML('beforeend', imgMarkup);

function createImgMarkup(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
        <li class="gallery__item">
        <a
        class="gallery__link"
        href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
        </a>
        </li>
        `;
    })
        .join('');
};

//делегирование и открытие МО
const modal = document.querySelector('.js-lightbox');
const imgInModal = document.querySelector('.lightbox__image');

imgContainer.addEventListener('click', onOpenModal);

function onOpenModal(evt) {
    evt.preventDefault();
    window.addEventListener('keydown', onEscKeyPress);
    if (evt.target.nodeName !== 'IMG') {
        return;
    }
    modal.classList.add('is-open');
    imgInModal.setAttribute('src', `${evt.target.getAttribute('data-source')}`);
    window.addEventListener('keydown', onArrowClick);
};

//закрытие МО по крестику
const closeBtn = document.querySelector('.lightbox__button');

closeBtn.addEventListener('click', onCloseModal);

function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyPress);
    window.removeEventListener('keydown', onArrowClick);
    modal.classList.remove('is-open');
    imgInModal.setAttribute('src', '#');
};

//закрытие МО по клику на overlay
const overlay = document.querySelector('.lightbox__overlay');

overlay.addEventListener('click', onCloseModal);

//закрытие МО по клику на ESC
window.addEventListener('keydown', onEscKeyPress);

function onEscKeyPress(event) {
    if (event.code === 'Escape') {
        onCloseModal();
    };
};

//пролистывание изображений при открытом МО
const linksToFlip = galleryItems.map(function (element) {
    return element.original;
});
let currentIndex = 1;

function onArrowClick (evt) {
    if (evt.code == 'ArrowLeft') {
        currentIndex -= 1;
        if (currentIndex < 0) {
            currentIndex = 8;
        }
    } else if (evt.code == 'ArrowRight') {
        currentIndex += 1;
        if (currentIndex > 8) {
            currentIndex = 0;
        }
    } else {
        return;
    }
    setModalImage(currentIndex);
};

function setModalImage(index) {
    modal.classList.add('is-open');
    imgInModal.setAttribute('src', `${linksToFlip[index]}`);
};