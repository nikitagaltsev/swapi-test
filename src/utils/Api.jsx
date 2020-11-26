class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/people/`)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then(res => {
        const finalArr = res.results.map(item => {
           fetch(item.homeworld)
            .then(result => {
              if (result.ok) {
                return result.json()
              }
              return Promise.reject(`Error: ${res.status}`);
            })
            .then(result => {
              item.home = result.name
              return item
            })
        })
        
        console.log(finalArr);
        return finalArr
      })
      .then(res => res)
  }

  getPlanets() {
    return fetch(`${this._baseUrl}/planets`).then(this._checkError);
  }
}

const api = new Api({
  baseUrl: "https://swapi.dev/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
