/* eslint-disable no-unused-vars */
class MediaFactory {
    static generateMedia(data, photograph) {
        if (data.image) {
            return new Photo(data, photograph)
        } else if (data.video) {
            return new Video(data, photograph)
        } else {
            return "Unknown Type"
        }
    }
}

class Photo {
    constructor(data, photograph) {
        this.id = data.id
        this.photographerId = data.photographerId
        this.title = data.title
        this.image = data.image
        this.tags = data.tags
        this.likes = data.likes
        this.date = data.date
        this.price = data.price
        this.photographerName = photograph.name

    }

    createElement() {
        return `
        <figure class="photo_card" data-id=${this.id}>
         <img class='photo_card__img' src="assets/img/medias/${this.photographerName.split(' ')[0]}/${this.image}" alt='photo'>
    
            <div class="photo_card__text">
                <figcaption class='photo_card__title'>${this.title}</figcaption>
                <div class="photo_card__likes">
                    <p class='photo_card__number' >${this.likes}</p>
                    <i class="fas fa-heart photo_card__i" aria-label="likes" data-clicked="false"></i>
                </div>
            </div>
        </figure>`
    }
}

class Video {
    constructor(data, photograph) {
        this.id = data.id
        this.photographerId = data.photographerId
        this.title = data.title
        this.video = data.video
        this.tags = data.tags
        this.likes = data.likes
        this.date = data.date
        this.price = data.price
        this.photographerName = photograph.name

    }

    createElement() {
        return `
        <figure class="photo_card" data-id=${this.id}>
        <video class='photo_card__img'>
        <source src="assets/img/medias/${this.photographerName.split(' ')[0]}/${this.video}"  type="video/mp4">
        </video>
            <div class="photo_card__text">
                <figcaption class='photo_card__title'>${this.title}</figcaption>
                <div class="photo_card__likes">
                    <p class='photo_card__number'>${this.likes}</p>
                    <i class="fas fa-heart photo_card__i" aria-label="likes" data-clicked="false"></i>
                </div>
            </div>
        </figure>`
    }
}