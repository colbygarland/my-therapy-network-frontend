import useSWR from 'swr'
import { Availability } from './types/Availability'
import { PractitionType } from './types/PractitionTypes'

type Fetcher<T> = Promise<{
  data?: T
  error: null | Record<string, unknown>
}>

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
    list: () => fetcher<Array<Availability>>('availability', 'GET'),
  },
  practitionTypes: {
    list: () => fetcher<Array<PractitionType>>('practition-types', 'GET'),
  },
} as const

type APIType = keyof typeof API
type APIMethod<T extends APIType> = keyof (typeof API)[T]
type APIResponse<T> = Awaited<ReturnType<typeof fetcher<T>>>

type APIFunction<
  T extends APIType,
  M extends APIMethod<T>,
> = (typeof API)[T][M] extends (...args: any[]) => Promise<any>
  ? (...args: Parameters<(typeof API)[T][M]>) => ReturnType<(typeof API)[T][M]>
  : never

export function useAPI<T extends APIType, M extends APIMethod<T>>(
  type: T,
  method: M,
  // @ts-expect-error
  ...args: Parameters<(typeof API)[T][M]>
): Awaited<ReturnType<APIFunction<T, M>>> & {
  isLoading: boolean
} {
  const fetcherFn = API[type][method] as (
    // @ts-expect-error
    ...args: Parameters<(typeof API)[T][M]>
  ) => Promise<any>

  const { data, error, isLoading } = useSWR<APIResponse<T>>(
    [type, method, ...args], // Unique cache key
    async () => {
      try {
        const result = await fetcherFn(...args) // Ensure the promise resolves
        return result.data // Return the resolved data (not the promise)
      } catch (err) {
        console.error('Error in API fetch:', err)
        throw err // Allow SWR to handle the error
      }
    },
  )

  // @ts-expect-error
  return { data, error, isLoading }
}
