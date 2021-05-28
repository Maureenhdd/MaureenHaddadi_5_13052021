let photgraphersList = document.querySelector('.photografer_list')
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
       </div> `

        // photgraphersList.innerHTML += "<div class='photografer_card'><a class=\"photografer_card__link\" href=\"#\"><img class='photografer_card__img' src=\"assets/img/" + e.portrait + "\"" + "alt='photo'> <h2 class=\"photografer_card__title\">" + e.name + "</h2></a></div>"

        document.body.appendChild(photgraphersList);
    })
    let allTags = []
    photographers.forEach(t => {
        allTags.push(...t.tags)
    })
    allTags = [...new Set(allTags)]
    console.log(allTags)

})

{/* */ }