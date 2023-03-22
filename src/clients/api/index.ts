import { AxiosApiClient } from "../api/axios.client";

const baseUrl: string = process.env.REACT_APP_JSON_PLACEHOLDER_BASE_URL as string
export const apiClient = new AxiosApiClient(baseUrl)
