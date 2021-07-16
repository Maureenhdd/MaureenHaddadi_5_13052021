/* eslint-disable no-undef */
let photgraphersList = document.querySelector('.photographer_list')
let tagsList = document.querySelector('.navbar_tags')
let state = {
    photographs: [],
    media: []
}

Api.getData().then((data) => {
    let photographers = data.photographers
    photographers.forEach(e => {
        let photograph = new Photograph(e)
        state.photographs.push(photograph)
        photgraphersList.innerHTML += photograph.createCard
    })

    let allTags = photographers.map(t => t.tags).flat()
    allTags.push("all")
    allTags = [...new Set(allTags)]
    allTags.forEach(tag => {
        tagsList.innerHTML += `
        <a href="#" aria-label="tag" class="nav_link category_tag" data-value=${tag}>#${tag}</a>
        `
    })

    tagsList.querySelectorAll('.category_tag').forEach(t => {
        t.addEventListener('click', () => {
            const tagValue = t.getAttribute('data-value')
            // t.classList.toggle('--active')
            if (tagValue === "all") {
                photgraphersList.innerHTML = ''
                photographers.forEach(e => {
                    let photograph = new Photograph(e)
                    state.photographs.push(photograph)
                    photgraphersList.innerHTML += photograph.createCard
                })
            } else {
                const filtered = photographers.filter((photographer) => photographer.tags.includes(tagValue))
                photgraphersList.innerHTML = ''
                filtered.forEach(e => {
                    let photograph = new Photograph(e)
                    photgraphersList.innerHTML += photograph.createCard
                })
            }
        })
    })
    state.media = data.media
    localStorage.setItem('state', JSON.stringify(state))
})