import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { HeadlessWPConfig } from './types';

export class Client {
  protected client: AxiosInstance;
  protected config: HeadlessWPConfig;

  constructor(config: HeadlessWPConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'X-WP-API-Key': config.apiKey,
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor to handle errors
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: any) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          throw new Error(
            `API Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`
          );
        } else if (error.request) {
          // The request was made but no response was received
          throw new Error('No response received from server');
        } else {
          // Something happened in setting up the request that triggered an Error
          throw new Error(`Request error: ${error.message}`);
        }
      }
    );
  }

  protected async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.client.request<T>(config);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  protected async get<T>(url: string, params?: any): Promise<T> {
    return this.request<T>({
      method: 'GET',
      url,
      params,
    });
  }

  protected async post<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({
      method: 'POST',
      url,
      data,
    });
  }

  protected async put<T>(url: string, data?: any): Promise<T> {
    return this.request<T>({
      method: 'PUT',
      url,
      data,
    });
  }

  protected async delete<T>(url: string): Promise<T> {
    return this.request<T>({
      method: 'DELETE',
      url,
    });
  }
} 