function getData() {
    const myPromise = new Promise((resolve, reject) => {
        fetch('/assets/js/data.json')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                resolve(data)
                const photo = data.photographers
                photo.forEach(e => {
                    console.log(e)
                })
            })
            .catch((err) => {
                reject(err)
            })
    })

    return myPromise

}

getData().then((data) => {
    console.log(data)
})

