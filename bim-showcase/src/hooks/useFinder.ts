import { useEffect, useState } from "react"
import finderApi from "../services/finderApi";

export const useFinder = () => {
    const [result, setResult] = useState<any| null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setError(null);
        finderApi()
            .then((data: any) => {
                setResult(data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    return {result, error, loading};
}

export default useFinder;