import axios from "axios"

class API {
  constructor() {
    if (!API.instance) {
      this.token = null
      API.instance = this
    }
    this.token = null
    if (process.env.NODE_ENV === "development") {
      this.url = "http://localhost:9499/"
      this.baseURL = this.url + "api/"
    } else {
      this.url = "http://shop.zwerque.fr/"
      this.baseURL = this.url + "api/"
    }
    return API.instance
  }

  getURL = () => this.url

  getTokenFromURL = () => {
    const params = window.location.search
    const urlParams = new URLSearchParams(params)
    const token = urlParams.get("token")
    return token
  }

  getToken = () => {
    if (this.token) return this.token

    let urlToken = this.getTokenFromURL()
    if (urlToken) {
      this.setToken(urlToken)
      return this.token
    }

    let storageToken = localStorage.getItem("token")
    if (storageToken !== "null") {
      this.setToken(storageToken)
      return this.token
    }
    this.token = null
    return this.token
  }

  setToken = (token) => {
    localStorage.setItem("token", token)
    this.token = token
  }

  destroyToken = () => {
    this.token = null
  }

  request = ({ url, type, data }) => {
    let options = {
      method: type,
      url: this.baseURL + url,
    }
    if (data) options.data = data
    return axios(options)
  }

  authRequest = ({ url, type, data }) => {
    let options = {
      method: type,
      url: this.baseURL + url,
      headers: { Authorization: "bearer " + this.token },
    }
    if (data) options.data = data
    return axios(options)
  }
}

const instance = new API()

export default instance
