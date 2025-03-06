import { useApi } from '../useApi'

export const useAvailability = (method: 'GET' | 'POST' | 'PUT' | 'DELETE') => {
    const { data, error, isLoading } = useApi('availability', method)

    return {
        data,
        isLoading,
        error,
    }
}
