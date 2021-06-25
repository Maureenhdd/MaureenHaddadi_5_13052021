// GET ID FROM URL
let url_string = window.location.href
let url = new URL(url_string)
let getId = url.searchParams.get('id')

// GET INFOS
let storage = JSON.parse(localStorage.getItem('state'))
console.log(storage)

// HEADER PHOTOGRAPH
const photographerInfos = storage.photographs.find(e => e.id == getId)
const photographer_banner = document.querySelector('.photographer_banner');
photographer_banner.innerHTML = `
<div class="photographer_banner__content">
<div class="photographer_banner__head">
    <h2 class="photographer_banner__title">${photographerInfos.name}</h2>
    <button class="btn_primary btn__contact">Contactez-moi</button>
</div>
<p class="photographer_banner__location">${photographerInfos.city}, ${photographerInfos.country}</p>
<p class="photographer_banner__description">${photographerInfos.tagline}</p>
<div class="photographer_banner__tags">
    <a href="#" aria-label="tag" class="category_tag">#portrait</a>
    <a href="#" aria-label="tag" class="category_tag">#travel</a>
    <a href="#" aria-label="tag" class="category_tag">#event</a>
</div>
</div>
<img class='photographer_banner__img' src="assets/img/${photographerInfos.portrait}" alt='photo'>
`
// NAME IN MODAL 
const modal_content__title = document.querySelector('.title--name')
modal_content__title.innerHTML = photographerInfos.name

console.log(photographerInfos)
let arrayLikes = []
const reducer = (accumulator, currentValue) => accumulator + currentValue

// MEDIAS INFOS
const array_medias = Photograph.getMedia(storage, getId)
const photo_list = document.querySelector('.photo_list');
const info_section__number = document.querySelector('.info_section__number')
array_medias.forEach(e => {
    let media = new Media(e.id, e.photographerId, e.title, e.image, e.tags, e.likes, e.date, e.price)

    photo_list.innerHTML += `
    <figure class="photo_card">
        <img class='photo_card__img' src="assets/img/medias/${photographerInfos.name.split(' ')[0]}/${media.image}" alt='photo'>
        <div class="photo_card__text">
            <figcaption class='photo_card__title'>${media.title}</figcaption>
            <div class="photo_card__likes">
                <p class='photo_card__number'>${media.likes}</p>
                <i class="fas fa-heart photo_card__i" aria-label="likes"></i>
            </div>
        </div>
    </figure>`


    arrayLikes.push(media.likes)
})

// GET TOTAL LIKES 

let totalLikes = arrayLikes.reduce(reducer)
info_section__number.innerHTML = totalLikes


