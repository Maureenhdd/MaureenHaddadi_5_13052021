class Photograph {
    constructor(id, portrait, name, city, country, tagline, price, tags) {
        this.id = id
        this.portrait = portrait
        this.name = name
        this.city = city
        this.country = country
        this.tagline = tagline
        this.price = price
        this.tags = tags
    }

    static getMedia(storage, id) {
        const result = storage.media.filter(e => e.photographerId == id)
        return result
    }
}