let photgraphersList = document.querySelector('.photographer_list')
let tagsList = document.querySelector('.navbar_tags')
function getData() {
    return new Promise((resolve, reject) => {
        fetch('/assets/js/data.json')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
    })

}
class Photograph {
    constructor(portrait, name, city, country, tagline, price, tags) {
        this.portrait = portrait
        this.name = name
        this.city = city
        this.country = country
        this.tagline = tagline
        this.price = price
        this.tags = tags

    }
}


getData().then((data) => {
    const photographers = data.photographers
    photographers.forEach(e => {
        let photograph = new Photograph(e.portrait, e.name, e.city, e.country, e.tagline, e.price, e.tags)
        state.photographs.push(photograph)
        console.log(photograph)
        photgraphersList.innerHTML += `
       <div class='photographer_card'>
        <a class="photographer_card__link" href="photographer.html">
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
    console.log(allTags)
    allTags.map(tag => {
        tagsList.innerHTML += `
        <a href="#" aria-label="tag" class="nav_link category_tag">#${tag}</a>
        `
    })

})

const state = {
    photographs: [],
    media: []
}