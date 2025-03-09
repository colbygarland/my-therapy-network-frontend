import { Availability } from './types/Availability'

type Fetcher<T> = Promise<{
  data: T
  error: null | Record<string, unknown>
}>

type List<T> = {
  count: number
  data: Array<T>
}

const fetcher = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  body?: Record<string, unknown>,
): Fetcher<T> => {
  let data: T = {} as T
  let error = null

  try {
    const d = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(res => res.json())

    data = d
  } catch (err) {
    error = err
  }

  return { data, error }
}

export const API = {
  availability: {
    get: (id: string) => fetcher<Availability>(`availability/${id}`, 'GET'),
    list: () => fetcher<List<Availability>>('availability', 'GET'),
  },
} as const
