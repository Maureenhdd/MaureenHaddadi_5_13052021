class Api {
    static getData() {
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
}