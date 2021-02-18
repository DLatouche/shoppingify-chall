import axios from "axios"

class API {
  constructor() {
    if (!API.instance) {
      this.token = null
      API.instance = this
    }
    this.token = null
    if (process.env.NODE_ENV === "development") {
      this.baseURL = "http://localhost:9499/api/"
    } else {
      this.baseURL = ""
    }
    return API.instance
  }

  getTokenFromURL = () => {
    const params = window.location.search
    const urlParams = new URLSearchParams(params)
    const token = urlParams.get("token")
    this.setToken(token)
    return token
  }

  getToken = () => {
    this.setToken(localStorage.getItem("token"))
  }

  setToken = (token) => {
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
