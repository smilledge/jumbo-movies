import api from './api'
import { AxiosResponse } from 'axios'

export type ApiConfig = {
  images: ImagesConfig
}

export type ImagesConfig = {
  base_url: string
  secure_base_url: string
  backdrop_sizes: string[]
  poster_sizes: string[]
}

let isConfigured: boolean = false
let activeRequest: Promise<AxiosResponse>
let configuration: ApiConfig

/**
 * Get the Movie DB API configuration
 *
 * See: https://developers.themoviedb.org/3/configuration/get-api-configuration
 */
export async function getConfiguration (): Promise<ApiConfig> {
  if (isConfigured) {
    // We've already loaded the configuration
    return configuration
  }

  if (activeRequest) {
    // There's an active request loading the configuration
    await activeRequest
  } else {
    activeRequest = api.get('configuration')
    const res = await activeRequest
    configuration = res.data
  }

  return configuration
}
