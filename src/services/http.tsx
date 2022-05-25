import axios from 'axios'
import { appConstants } from '../constants/appConstants'

const { GET, POST } = appConstants

const httpClient = async (url: string, data = {}, method = GET) => {
    const default_headers = {
        Accept: 'application/json',
        'Content-type': 'application/json',
    }

    const options = {
        baseURL: url,
        method,
        headers: {
            ...default_headers,
        },
        params: {},
        data: {},
    }
    if (method === GET) {
        options.params = data
    }

    if (method === POST) {
        options.data = JSON.stringify(data)
    }

    // track api requests
    console.log('REQ => ', options)

    // Only send data to next promise
    return axios(options)
        .then(({ data }) => {
            // track api responce
            console.log('Resp => ', data)
            return data
        })
        .catch((err) => {
            throw err.response
        })
}

interface httpReq {
    url: string;
    params?: any;
    data?: any;
    http?: string
  }

const httpServices = {
    get: async (options: httpReq) => {
        const { url, params } = options
        return httpClient(url, params)
    },
    post: async (options: httpReq) => {
        const { url, data, http = POST } = options
        return httpClient(url, data, http)
    },
}

export default httpServices
