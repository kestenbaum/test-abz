import {useState} from "react";

export const useFetching = (callback: () => void) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState('')

    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, error]
}