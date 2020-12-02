
class Api {
  constructor({ url, headers = {} }) {
    this.url = url;
    this.headers = headers;
  }

  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.statusText)
    }
  }

  _handleResponseError(err) {
    return Promise.reject(err.message)
  }

  getInitialCards(token) {
    return fetch(`${this.url}/cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  getUserInfo(token) {
    return fetch(`${this.url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  changeAvatar(form, token) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: form
      })
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  addCard(item, token) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  changeUserInfo(value, token) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: value.name,
        about: value.about
      })
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  deleteCard(item, token) {
    return fetch(`${this.url}/cards/${item}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  setLike(item, token) {
    return fetch(`${this.url}/cards/${item}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._handleResponse, console.log(item))
      .catch(this._handleResponseError)
  }

  removeLike(item, token) {
    return fetch(`${this.url}/cards/${item}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  register(email, password) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: (
        JSON.stringify({ email, password })
      )
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  login(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: (
        JSON.stringify({ email, password })
      )
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  checkToken(token) {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }
}

export const api = new Api({
  url: 'http://api.pavel.students.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
  }
})

export default Api;