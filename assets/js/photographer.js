/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// GET ID FROM URL
let url_string = window.location.href
let url = new URL(url_string)
let getId = url.searchParams.get('id')

// GET INFOS
let storage = JSON.parse(localStorage.getItem('state'))

// DISPLAY PHOTOGRAPH BANNER
const photographerInfos = storage.photographs.find(e => e.id == getId)
const photographer_banner = document.querySelector('.photographer_banner');
photographer_banner.innerHTML = `
<div class="photographer_banner__content">
<div class="photographer_banner__head">
    <h2 class="photographer_banner__title">${photographerInfos.name}</h2>
    <button class="btn_primary btn__contact" aria-label="Ouvrir le formulaire pour contacter le photographe ${photographerInfos.name}">Contactez-moi</button>
</div>
<p class="photographer_banner__location">${photographerInfos.city}, ${photographerInfos.country}</p>
<p class="photographer_banner__description">${photographerInfos.tagline}</p>
<div class="photographer_banner__tags">
${photographerInfos.tags.map(tag =>
    `<span aria-label="${tag}" class="category_tag">#${tag}</span>`
).join('')}
</div>
</div>
<img class='photographer_banner__img' src="assets/img/${photographerInfos.portrait}" alt='photographie de ${photographerInfos.name}'>

`
// DISPLAY NAME IN MODAL 
const modal_content__title = document.querySelector('.title--name')
modal_content__title.innerHTML = photographerInfos.name

// GET MEDIAS INFOS
let array_medias = Photograph.getMedia(storage, getId)
const photo_list = document.querySelector('.photo_list');
const info_section = document.querySelector('.info_section')
const reducer = (acc, item) => {
    return acc + item.likes
}

array_medias = array_medias.map(e => MediaFactory.generateMedia(e, photographerInfos))


// GET TOTAL LIKES & display 

let totalLikes = array_medias.reduce(reducer, 0)

info_section.innerHTML = `

<div class="info_section__likes">
<p class='info_section__number' aria-label="Nombre total de j'aime, ${totalLikes} j'aime" tabindex="0">${totalLikes}</p>
<span role="icon heart" class="fas fa-heart info_section__i" aria-label="likes"></span>
</div>
<p aria-label="tarif de ${photographerInfos.name}, ${photographerInfos.price} par euros jour " tabindex="0">
${photographerInfos.price}€/jour
</p> 

`
const info_section__number = document.querySelector('.info_section__number')

// put click event on each icon , if clicked add 1 in like and in total like 
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
                i.setAttribute('aria-label', "je n'aime plus")
            } else {

                likeCoundDom.innerHTML = currentLike + 1
                i.setAttribute('data-clicked', 'true')
                i.setAttribute('aria-label', "j'aime")

                info_section__number.innerHTML = currentTotalLike + 1
            }
        })
    })
}


// CUSTOM SELECT 
let inputFilter = document.querySelector('.filter_section__wrapper')
let inputFilterList = document.querySelector('.filter_section__wrapper__list')
let inputFilterIndicator = document.querySelector('.filter_section__wrapper__indicator')
let inputFilterTop = document.querySelector('.filter_section__top')
let openListI = document.querySelector('.open_list__i')

// IF CLICK ON SELECT => OPEN LIST CHANGE TAB INDEX TO NAV IN 

inputFilterTop.addEventListener('click', () => {
    inputFilterList.classList.toggle('filter_section__wrapper__list--active')
    inputFilter.classList.toggle('filter_section__wrapper--active_border')
    openListI.classList.toggle('open_list__i--active')

    document.querySelectorAll('.filter_section__wrapper__list__option').forEach(i => {
        i.setAttribute('tabindex', '0')
    })
})

// HANDLE BLUR EVENT WHEN NOT FOCUS ON ELEMENTS 
inputFilterIndicator.addEventListener('blur', () => {
    inputFilterList.classList.remove('filter_section__wrapper__list--active')
})

// HANDLE CSS IF LEAVE LIST 
inputFilter.querySelector('.filter_section__wrapper__list__option:last-child').addEventListener('blur', () => {
    inputFilter.classList.remove('filter_section__wrapper--active_border')
    openListI.classList.remove('open_list__i--active')
})
// FILTER + HANDLE COMPORTEMENT 
inputFilter.querySelectorAll('.filter_section__wrapper__list__option').forEach(option => {
    option.addEventListener('focus', () => {
        inputFilterList.classList.add('filter_section__wrapper__list--active')

    })
    option.addEventListener('blur', () => {
        inputFilterList.classList.remove('filter_section__wrapper__list--active')
    })

    option.addEventListener('click', ({ target: { value } }) => {
        let arTmp = [...array_medias]
        let optValue = option.getAttribute('data-value')
        if (optValue === "Popularité") {
            arTmp.sort((a, b) => b.likes - a.likes)
        }
        if (optValue == "Date") {
            arTmp.sort((a, b) => new Date(b.date) - new Date(a.date)
            )
        }
        if (optValue == "Titre") {
            arTmp.sort((a, b) =>
                a.title.localeCompare(b.title)
            )
        }
        photo_list.innerHTML = arTmp.map(e => e.createElement()).join('')
        inputFilterIndicator.innerText = optValue
        inputFilterList.classList.remove('filter_section__wrapper__list--active')
        openListI.classList.remove('open_list__i--active')
        inputFilter.classList.remove('filter_section__wrapper--active_border')
        openLightBox()
        prepareOnclickIcon()
    })

})

// simuler click quand je selectionne une valeur pour pouvoir changer la section 
inputFilter.addEventListener('change', function (e) {
    this.querySelector(`.filter_section__wrapper__list__option[data-value=${e.target.value}]`).click()


})
// SIMULE CLICK FOR FIRST VALUE WHEN WE ARRIVE IN THE PAGE THE CONTENT IS ALREADUY FILTERED
inputFilter.querySelector('.filter_section__wrapper__list__option').click()


