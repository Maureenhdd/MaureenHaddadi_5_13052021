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
    static generateMediaLightbox(data) {
        if (data.tagName == "VIDEO") {
            return new VideoLightbox(data)
        } else {
            return new PhotoLightbox(data)
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
        this.alt = data.description
        this.photographerName = photograph.name

    }

    createElement() {
        console.log(this.alt)
        return `
        <figure class="photo_card" data-id=${this.id} tabindex="-1" >
         <img class='photo_card__img' src="assets/img/medias/${this.photographerName.split(' ')[0]}/${this.image}" alt="${this.alt}" tabindex="0" data-title='${this.title}'>
    
            <div class="photo_card__text">
                <figcaption class='photo_card__title'>${this.title}</figcaption>
                <div class="photo_card__likes">
                    <p class='photo_card__number' >${this.likes}</p>
                    <span class="fas fa-heart photo_card__i" aria-label="likes" data-clicked="false" role="button"></span>
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
        <figure class="photo_card" data-id=${this.id}
         tabindex="-1">
        <video class='photo_card__img'  data-title='${this.title}' tabindex=0>
        <source src="assets/img/medias/${this.photographerName.split(' ')[0]}/${this.video}"  type="video/mp4" >
        </video>
            <div class="photo_card__text">
                <figcaption class='photo_card__title'>${this.title}</figcaption>
                <div class="photo_card__likes">
                    <p class='photo_card__number'>${this.likes}</p>
                    <span class="fas fa-heart photo_card__i" aria-label="likes" data-clicked="false" role="button"></span>
                </div>
            </div>
        </figure>`
    }
}


class PhotoLightbox {
    constructor(data) {
        this.id = data.id
        this.photographerId = data.photographerId
        this.title = data.title
        this.image = data.image
    }

    createElement() {
        return `
        <img class='lightBox_content__media' src="assets/img/medias/${this.photographerName.split(' ')[0]}/${this.image}" alt="${this.alt}">
        <p>${this.title}</p>`
    }
}

class VideoLightbox {
    constructor(data) {
        this.id = data.id
        this.photographerId = data.photographerId
        this.title = data.title
        this.video = data.video
    }

    createElement() {
        return `
        <video controls autoplay class='lightBox_content__media'>
        <source src="assets/img/medias/${this.photographerName.split(' ')[0]}/${this.video}"  type="video/mp4">
        </video>
        <p>${this.title}</p>`
    }
}