import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

export async function handleResponse(response: AxiosResponse) {
  if (response.status === 200) return response.data;
  if (response.status === 400) {
    const error = await response.statusText;
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

export function handleError(error: AxiosError) {
  console.error("API call failed. " + error.message);
  throw error;
}

export function getAll(url: string) {
  return axios.get(url).then(handleResponse).catch(handleError);
}

export function save(config: AxiosRequestConfig) {
  return axios({
    method: config.method,
    url: config.url,
    data: config.data,
  })
    .then(handleResponse)
    .catch(handleError);
}

export function remove(url: string) {
  return axios.delete(url).then(handleResponse).catch(handleError);
}
