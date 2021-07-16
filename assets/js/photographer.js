/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// GET ID FROM URL
let url_string = window.location.href
let url = new URL(url_string)
let getId = url.searchParams.get('id')

// GET INFOS
let storage = JSON.parse(localStorage.getItem('state'))

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
<img class='photographer_banner__img' src="assets/img/${photographerInfos.portrait}" alt='photo de ${photographerInfos.name}'>
`
// NAME IN MODAL 
const modal_content__title = document.querySelector('.title--name')
modal_content__title.innerHTML = photographerInfos.name

// MEDIAS INFOS
let array_medias = Photograph.getMedia(storage, getId)
const photo_list = document.querySelector('.photo_list');
const info_section__number = document.querySelector('.info_section__number')
const reducer = (acc, item) => {
    return acc + item.likes
}

array_medias = array_medias.map(e => {
    return MediaFactory.generateMedia(e, photographerInfos)

})
// GET TOTAL LIKES

let totalLikes = array_medias.reduce(reducer, 0)
info_section__number.innerHTML = totalLikes

function prepareOnclickIcon() {
    const heartI = document.querySelectorAll('.photo_card__i')
    heartI.forEach(i => {
        i.addEventListener('click', function () {
            const likeCoundDom = i.parentElement.querySelector('.photo_card__number')
            const currentLike = Number(likeCoundDom.innerHTML)
            const currentTotalLike = Number(info_section__number.innerHTML)
            i.classList.toggle('--active')
            let isClicked = i.getAttribute('data-clicked') == "true"
            if (isClicked) {
                likeCoundDom.innerHTML = currentLike - 1
                i.setAttribute('data-clicked', 'false')
                info_section__number.innerHTML = currentTotalLike - 1
            } else {

                likeCoundDom.innerHTML = currentLike + 1
                i.setAttribute('data-clicked', 'true')
                info_section__number.innerHTML = currentTotalLike + 1



            }
        })
    })
}


// filter 
let inputFilter = document.querySelector('.filter_section__select')
inputFilter.querySelectorAll('.filter_section__option').forEach(option => {
    option.addEventListener('click', (e) => {
        let arTmp = [...array_medias]
        if (e.target.value === "Popularité") {
            arTmp.sort((a, b) => b.likes - a.likes)
        }
        if (e.target.value == "Date") {
            arTmp.sort((a, b) => new Date(b.date) - new Date(a.date)
            )
        }
        if (e.target.value == "Titre") {
            arTmp.sort((a, b) =>
                a.title.localeCompare(b.title)
            )
        }
        photo_list.innerHTML = arTmp.map(e => e.createElement()).join('')
        openLightBox()
        prepareOnclickIcon()
    })

})

inputFilter.addEventListener('change', function (e) {
    console.log(e.target.value)
    this.querySelector(`.filter_section__option[value=${e.target.value}]`).click()
})

inputFilter.querySelector('.filter_section__option').click()

// lightbox

const lightBox = document.querySelector('.lightBox')
const closeLightBoxIcon = document.querySelector(".lightBox_content__close")
var activeIndex = 0
closeLightBoxIcon.addEventListener("click", closeLightBox)
function closeLightBox() {
    lightBox.style.display = "none"

}

function contentLightBox(e) {
    if (e.tagName == "VIDEO") {
        const src = e.getElementsByTagName("source")[0].src

        lightBox.querySelector('.lightBox_content').innerHTML = `
        <video controls autoplay class='lightBox_content__media'>
        <source src="${src}"  type="video/mp4">
        </video>
        
        `

    } else {
        lightBox.querySelector('.lightBox_content').innerHTML = `         
        <img class='lightBox_content__media' src="${e.src}" alt='photo'>
        `
    }
    // e.classList.remove('photo_card__img')
    // e.classList.add('lightBox_content__media')
    // e.style.height = '500px'
    // lightBox.querySelector('.lightBox_content').innerHTML = e.outerHTML

}
function openLightBox() {
    photo_list.querySelectorAll('.photo_card__img').forEach((e, index, array_photo) => {
        e.addEventListener('click', function () {
            lightBox.style.display = "block"
            activeIndex = index
            contentLightBox(array_photo[activeIndex])
        })
    })
}

document.addEventListener('keydown', (e) => {
    e.preventDefault()
    if (e.code === "ArrowRight") {
        document.querySelector('.next').click()
    } else if (e.code === "ArrowLeft") {
        document.querySelector('.prev').click()
    }
})

document.querySelector('.next').addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % photo_list.querySelectorAll('.photo_card__img').length
    contentLightBox(photo_list.querySelectorAll('.photo_card__img')[activeIndex])

})

document.querySelector('.prev').addEventListener('click', () => {
    activeIndex = 0 > activeIndex - 1 ? photo_list.querySelectorAll('.photo_card__img').length - 1 : activeIndex - 1
    contentLightBox(photo_list.querySelectorAll('.photo_card__img')[activeIndex])
})
