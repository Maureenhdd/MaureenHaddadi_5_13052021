/* eslint-disable no-unused-vars */
class Photograph {
    constructor(data) {
        this.id = data.id
        this.portrait = data.portrait
        this.name = data.name
        this.city = data.city
        this.country = data.country
        this.tagline = data.tagline
        this.price = data.price
        this.tags = data.tags
    }

    static getMedia(storage, id) {
        const result = storage.media.filter(e => e.photographerId == id)
        return result
    }

    get createCard() {
        return `
       <div class='photographer_card'>
        <a class="photographer_card__link" href="photographer.html?id=${this.id}">
            <img class='photographer_card__img' src="assets/img/${this.portrait}" alt='photo de ${this.name}'> 
            <h2 class="photographer_card__title">${this.name}</h2>
        </a>
        <p class="photographer_card__location">${this.city},${this.country}</p>
        <p class="photographer_card__description">${this.tagline}</p>
        <p class="photographer_card__price">${this.price}€/jour</p>
        <div class="photographer_card__tags">
        ${this.tags.map(tag =>
            `<span aria-label="tag" class="category_tag">#${tag}</span>`
        ).join('')}
        </div>
        </div> `
    }
}