class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}`)
  }
}


const api = new Api ({
  baseUrl: 'https://swapi.dev/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api;