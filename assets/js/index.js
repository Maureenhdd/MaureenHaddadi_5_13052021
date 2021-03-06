/* eslint-disable no-undef */
let photgraphersList = document.querySelector('.photographer_list')
let tagsList = document.querySelector('.navbar_tags')
// CREATE STATE 
let state = {
    photographs: [],
    media: []
}

// DISPLAY PHOTOGRAPHERS 
Api.getData().then(({ photographers, media }) => {
    state.photographs = photographers.map(e => {
        let photograph = new Photograph(e)
        photgraphersList.innerHTML += photograph.createCard()
        return photograph
    })

    // GET TAGS AND REMOVE DOUBLONS
    let allTags = photographers.map(t => t.tags).flat()
    allTags.push("all")
    allTags = [...new Set(allTags)]
    allTags.forEach(tag => {
        tagsList.innerHTML += `
        <button class="nav_link category_tag" data-value=${tag} aria-label='filtrer les photographes en rapport à ${tag}'>#${tag}</button>
        `
    })
    // FILTER PHOTAGRAPH BY TAGS 
    tagsList.querySelectorAll('.category_tag').forEach(t => {
        t.addEventListener('click', () => {
            const tagValue = t.getAttribute('data-value')
            if (tagValue === "all") {
                photgraphersList.innerHTML = ''
                photographers.forEach(e => {
                    let photograph = new Photograph(e)
                    state.photographs.push(photograph)
                    photgraphersList.innerHTML += photograph.createCard()
                })
            } else {
                const filtered = photographers.filter((photographer) => photographer.tags.includes(tagValue))
                photgraphersList.innerHTML = ''
                filtered.forEach(e => {
                    let photograph = new Photograph(e)
                    photgraphersList.innerHTML += photograph.createCard()
                })
            }
            let target = document.querySelector('.category_tag--active')
            if (target) {
                target.classList.remove('category_tag--active')
            }
            t.classList.add('category_tag--active')

        })
    })
    state.media = media
    localStorage.setItem('state', JSON.stringify(state))
})


