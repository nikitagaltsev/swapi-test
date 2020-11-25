import axios from "axios";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/people`)
    .then(this._checkError);
  }

  getPlanets() {
    return fetch(`${this._baseUrl}/planets`)
    .then(this._checkError);
  }
}

const api = new Api ({
  baseUrl: 'https://swapi.dev/api',
  headers: {
    'Content-Type': 'application/json'
  }
})


export default api;