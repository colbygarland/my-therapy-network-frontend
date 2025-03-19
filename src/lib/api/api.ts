import useSWR from 'swr'
import { Availability } from './types/Availability'
import { PractitionType } from './types/PractitionTypes'
import { Patient } from './types/Patient'

export const API = {
  meta: {
    up: () => fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/up`),
  },
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
  patient: {
    create: ({ name, email, phone }) =>
      fetcher<Patient>('patients', 'POST', { name, email, phone }),
    get: (id: string) => fetcher<Patient>(`patients/get/${id}`, 'GET'),
    find: ({ email, phone }) =>
      fetcher<Patient>(`patients/find`, 'GET', { email, phone }),
    list: () => fetcher<Array<Patient>>('patients', 'GET'),
  },
} as const

type Fetcher<T> = Promise<{
  data?: T
  error: null | Record<string, unknown>
  status: number
}>

const fetcher = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  body?: {},
): Fetcher<T> => {
  let data: T = {} as T
  let error = null
  let status = 0

  try {
    console.debug('Making API call to: ' + url)
    let queryParams = ''
    if (method === 'GET' && body) {
      queryParams = '?' + new URLSearchParams(body).toString()
    }
    const d = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${url}${queryParams}`,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: method !== 'GET' && body ? JSON.stringify(body) : null,
      },
    )
    const json = await d.json()
    const s = d.status
    console.debug('API call complete:', d)

    data = json
    status = s
  } catch (err) {
    error = err
  }

  return { data, error, status }
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
