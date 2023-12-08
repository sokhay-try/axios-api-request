import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'

interface IAxiosConfig extends AxiosRequestConfig {
  baseURL: string
}
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const getMethod: HttpMethod = 'GET'
const postMethod: HttpMethod = 'POST'
const putMethod: HttpMethod = 'PUT'
const deleteMethod: HttpMethod = 'DELETE'

export class ApiRequestBuilder {
  public readonly axiosInstance: AxiosInstance

  constructor(axiosConfig: IAxiosConfig) {
    if (!axiosConfig.headers) {
      axiosConfig.headers = {}
    }
    if (axiosConfig.headers.Accept === undefined) {
      axiosConfig.headers.Accept = 'application/json'
    }
    this.axiosInstance = axios.create(axiosConfig)
  }

  setUrl(url: string) {
    const defaultMethods = {
      get: (requestConfig = {}) => {
        return this.getRequest(requestConfig, url, getMethod)
      },
      create: (requestConfig = {}) => {
        return this.getRequest(requestConfig, url, postMethod)
      },
      update: (requestConfig = {}) => {
        return this.getRequest(requestConfig, url, putMethod)
      },
      delete: (requestConfig = {}) => {
        return this.getRequest(requestConfig, url, deleteMethod)
      }
    }
    return defaultMethods
  }

  private getRequest(requestConfig = {}, url: string, method: string) {
    const params = {
      ...requestConfig,
      method,
      url
    }
    return this.axiosInstance.request(params)
  }
}
