import axios, { AxiosError } from 'axios'

import { env } from 'src/config'
import { storage } from 'src/utils/storage'

type Headers = {
  Authorization?: string
}

let isRefreshing = false
let failedRequestsQueue: any[] = []

class AuthTokenError extends Error {
  constructor() {
    super('Error with authentication token')
  }
}

export async function SetupApi() {
  const headers: Headers = {}
  const accessToken = await storage.get('accessToken')

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  const api = axios.create({
    baseURL: env.apiUrl,
    headers,
  })

  api.interceptors.response.use(
    response => response,
    (error: AxiosError<any>) => {
      if (error.response?.status === 401) {
        if (error.response.data.code === 'token.expired') {
          const originalRequestConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true

            api
              .post('/refresh')
              .then(res => {
                const refreshedAccessToken = res.data.access_token

                if (refreshedAccessToken) {
                  storage.set('accessToken', refreshedAccessToken)

                  failedRequestsQueue.forEach(request =>
                    request.onSuccess(refreshedAccessToken)
                  )
                }
              })
              .catch(err => {
                failedRequestsQueue.forEach(request => request.onFailure(err))
              })
              .finally(() => {
                isRefreshing = false
                failedRequestsQueue = []
              })
          }

          return new Promise((resolve, reject) => {
            if (originalRequestConfig) {
              failedRequestsQueue.push({
                onFailure: (err: AxiosError) => reject(err),
                onSuccess: (token: string) => {
                  originalRequestConfig.headers.Authorization = `Bearer ${token}`

                  resolve(api(originalRequestConfig))
                },
              })
            }
          })
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }

      // se for um erro direfente de 401 então será tratado no retorno
      return Promise.reject(error.toJSON())
    }
  )

  return api
}
