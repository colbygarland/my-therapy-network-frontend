import useSWR from 'swr'

const fetcher = (url, method, body) =>
    fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then(res => res.json())

export const useApi = (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: Record<string, any>,
) => {
    const { data, error, isLoading } = useSWR(
        [`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${url}`, method, body],
        ([url, method, body]) => fetcher(url, method, body),
    )

    return {
        data: data?.data,
        isLoading,
        error,
    }
}
