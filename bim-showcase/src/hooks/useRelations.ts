import { useEffect, useState } from "react";
import { relationsApi } from "../services/relationsApi";

export const useRelations = () => {
    const [result, setResult] = useState<string>('');
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setError(null);

        relationsApi()
            .then((data: string) => {
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

export default useRelations;
