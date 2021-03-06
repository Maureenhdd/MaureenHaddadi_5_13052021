// CREATE FUNCTION TO FETCH DATA
// eslint-disable-next-line no-unused-vars
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