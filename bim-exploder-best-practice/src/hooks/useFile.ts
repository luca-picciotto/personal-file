import { useEffect, useState } from "react";
import fileApi from "../services/fileApi";

export const useFile = () => {
    const [result, setResult] = useState<ArrayBuffer | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fileApi()
            .then((data: ArrayBuffer) => {
                setResult(data);
            })
            .catch((error: unknown) => {
                setError(error instanceof Error ? error : new Error(String(error)));
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { result, error, loading };
};

export default useFile;
