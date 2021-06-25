let photgraphersList = document.querySelector('.photographer_list')
let tagsList = document.querySelector('.navbar_tags')
let state = {
    photographs: [],
    media: []
}

Api.getData().then((data) => {
    const photographers = data.photographers
    photographers.forEach(e => {
        let photograph = new Photograph(e.id, e.portrait, e.name, e.city, e.country, e.tagline, e.price, e.tags)
        state.photographs.push(photograph)
        console.log(state.photographs)

        photgraphersList.innerHTML += `
       <div class='photographer_card'>
        <a class="photographer_card__link" href="photographer.html?id=${e.id}">
            <img class='photographer_card__img' src="assets/img/${photograph.portrait}" alt='photo'> 
            <h2 class="photographer_card__title">${photograph.name}</h2>
        </a>
        <p class="photographer_card__location">${photograph.city},${photograph.country}</p>
        <p class="photographer_card__description">${photograph.tagline}</p>
        <p class="photographer_card__price">${photograph.price}€/jour</p>
        <div class="photographer_card__tags">
        ${photograph.tags.map(tag =>
            `<a href="#" aria-label="tag" class="category_tag">#${tag}</a>`
        ).join('')}
        </div>
        </div> `
    })
    let allTags = []
    photographers.forEach(t => {
        allTags.push(...t.tags)
    })
    allTags = [...new Set(allTags)]
    allTags.map(tag => {
        tagsList.innerHTML += `
        <a href="#" aria-label="tag" class="nav_link category_tag">#${tag}</a>
        `
    })

    const medias = data.media
    medias.forEach(e => {
        let media = new Media(e.id, e.photographerId, e.title, e.image, e.tags, e.likes, e.date, e.price)
        state.media.push(media)
    })

    localStorage.setItem('state', JSON.stringify(state))
})