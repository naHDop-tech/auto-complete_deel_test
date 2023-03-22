import { AxiosApiClient } from "@root/clients/api/axios.client";

const baseUrl: string = process.env.SERVER_BASE_URL as string
export const apiClient = new AxiosApiClient(baseUrl)
