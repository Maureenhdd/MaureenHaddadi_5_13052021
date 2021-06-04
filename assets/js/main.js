let photgraphersList = document.querySelector('.photografer_list')
let tagsList = document.querySelector('.nav')
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

getData().then((data) => {
    const photographers = data.photographers
    photographers.forEach(e => {
        photgraphersList.innerHTML += `
       <div class='photografer_card'>
        <a class="photografer_card__link" href="#">
            <img class='photografer_card__img' src="assets/img/${e.portrait}" alt='photo'> 
            <h2 class="photografer_card__title">${e.name}</h2>
        </a>
        <p class="photografer_card__location">${e.city},${e.country}</p>
        <p class="photografer_card__description">${e.tagline}</p>
        <p class="photografer_card__price">${e.price}€/jour</p>
        <div class="photografer_card__tags">
        ${e.tags.map(tag =>
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