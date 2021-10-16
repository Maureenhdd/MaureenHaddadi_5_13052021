/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// const photo_list = document.querySelector('.photo_list');
const lightBox = document.querySelector('.lightBox')
const closeLightBoxIcon = document.querySelector(".lightBox_content__close")
let activeIndex = 0
closeLightBoxIcon.addEventListener("click", closeLightBox)
function closeLightBox() {
    lightBox.style.display = "none"
    lightBox.setAttribute('aria-hidden', 'true')
    main.setAttribute('aria-hidden', 'false')
    lightBox.setAttribute('tabindex', '-1')

}

function displayContent(e) {
    const title = e.getAttribute('data-title')
    if (e.tagName == "VIDEO") {
        const src = e.getElementsByTagName("source")[0].src
        lightBox.querySelector('.lightBox_content').innerHTML = `
        <video controls autoplay class='lightBox_content__media'>
        <source src="${src}"  type="video/mp4">
        </video>
        <p class='lightBox_content__title'>${title}</p>
        `
    } else {
        const alt = e.getAttribute('alt')
        lightBox.querySelector('.lightBox_content').innerHTML = `         
        <img class='lightBox_content__media' src="${e.src}" alt="${alt}" tabindex=0>
        <p class='lightBox_content__title'>${title}</p>
        `
    }
}



function openLightBox() {
    photo_list.querySelectorAll('.photo_card__img').forEach((e, index, array_photo) => {
        e.addEventListener('click', function () {
            lightBox.style.display = "block"
            activeIndex = index
            displayContent(array_photo[activeIndex])
            lightBox.setAttribute('aria-hidden', 'false')
            lightBox.focus()
            lightBox.setAttribute('tabindex', '0')
            main.setAttribute('aria-hidden', 'true')
            main.setAttribute('tabindex', '-1')
        })
    })
}



document.querySelector('.next').addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % photo_list.querySelectorAll('.photo_card__img').length
    displayContent(photo_list.querySelectorAll('.photo_card__img')[activeIndex])
})

document.querySelector('.prev').addEventListener('click', () => {
    activeIndex = 0 > activeIndex - 1 ? photo_list.querySelectorAll('.photo_card__img').length - 1 : activeIndex - 1
    displayContent(photo_list.querySelectorAll('.photo_card__img')[activeIndex])
})


document.addEventListener('keydown', (e) => {
    if (e.code === "Enter") {
        document.activeElement.click()

    }
    if (e.code === "Space" || e.code === "Escape") {
        e.preventDefault()
        closeLightBox()
    } else if (e.code === "ArrowRight") {
        e.preventDefault()
        document.querySelector('.next').click()
    } else if (e.code === "ArrowLeft") {
        e.preventDefault()
        document.querySelector('.prev').click()
    }
})