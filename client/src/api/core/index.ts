/* eslint-disable no-unused-vars */
import { AxiosError, AxiosProgressEvent, Method } from 'axios'

import { env } from 'src/config'

import { ApiError } from './error'
import { mockedApi } from './mocks'
import { SetupApi } from './setup'

class Api {
  public get<T = any>(url: string, params?: any): Promise<T> {
    return this.request<T>('GET', url, params)
  }

  public post<T = any>(url: string, body: any): Promise<T> {
    return this.request<T>('POST', url, body)
  }

  public put<T = any>(url: string, body: any): Promise<T> {
    return this.request<T>('PUT', url, body)
  }

  public patch<T = any>(url: string, body: any): Promise<T> {
    return this.request<T>('PATCH', url, body)
  }

  public delete<T = any>(url: string, params?: any): Promise<T> {
    return this.request<T>('DELETE', url, params)
  }

  public upload<T = any>(
    url: string,
    data: FormData,
    onProgress: (progress: number) => void
  ): Promise<T> {
    return this.request<T>('POST', url, data, onProgress)
  }

  private async request<T = any>(
    method: Method,
    url: string,
    data?: any,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    try {
      onProgress && onProgress(0)

      const request = env.useMocks
        ? mockedApi(method, url, data)
        : (await SetupApi()).request({
            data: ['POST', 'PUT', 'PATCH'].includes(method) ? data : null,
            headers: {
              'Content-Type':
                data instanceof FormData ? 'multipart/form-data' : 'application/json',
            },
            method,
            onUploadProgress: (progress: AxiosProgressEvent) => {
              if (onProgress && progress.total)
                onProgress((progress.loaded / progress.total) * 100)
            },
            params: method === 'GET' ? data : null,
            url,
          })

      const response = await request
      onProgress && onProgress(100)

      return response.data || {}
    } catch (err: any) {
      return this.handleError<T>(err)
    }
  }

  private async handleError<T>(err: AxiosError): Promise<T> {
    if (!err.config || !err.response) throw err
    throw new ApiError(err.config, err.response, err)
  }
}

export const api = new Api()
