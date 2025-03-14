import useSWR from 'swr'
import { Availability } from './types/Availability'
import { PractitionType } from './types/PractitionTypes'

export const API = {
  availability: {
    get: (id: string) => fetcher<Availability>(`availability/${id}`, 'GET'),
    list: ({
      date,
      practition_type_id,
    }: {
      date?: string
      practition_type_id?: string
    }) =>
      fetcher<Array<Availability>>('availability', 'GET', {
        ...(date && { date }),
        ...(practition_type_id && { practition_type_id }),
      }),
  },
  practitionTypes: {
    list: () => fetcher<Array<PractitionType>>('practition-types', 'GET'),
  },
} as const

type Fetcher<T> = Promise<{
  data?: T
  error: null | Record<string, unknown>
}>

const fetcher = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  body?: {},
): Fetcher<T> => {
  let data: T = {} as T
  let error = null

  try {
    console.debug('Making API call..')
    let queryParams = ''
    if (method === 'GET' && body) {
      console.log(body)
      queryParams = '?' + new URLSearchParams(body).toString()
    }
    console.log('queryParams', queryParams)
    const d = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${url}${queryParams}`,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: method !== 'GET' && body ? JSON.stringify(body) : null,
      },
    ).then(res => res.json())
    console.debug('API call complete:', d)

    data = d
  } catch (err) {
    error = err
  }

  return { data, error }
}

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
  body?: Parameters<(typeof API)[T][M]>,
): Awaited<ReturnType<APIFunction<T, M>>> & {
  isLoading: boolean
} {
  const fetcherFn = API[type][method] as (
    // @ts-expect-error
    body: Parameters<(typeof API)[T][M]>,
  ) => Promise<any>

  const { data, error, isLoading } = useSWR<APIResponse<T>>(
    [type, method, body], // Unique cache key
    async () => {
      try {
        // @ts-expect-error
        const result = await fetcherFn(body) // Ensure the promise resolves
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
