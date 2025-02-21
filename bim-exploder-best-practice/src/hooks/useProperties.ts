import { useEffect, useState } from "react";
import { propertiesApi } from "../services/propertiesApi";

export const useProperties = () => {
    const [result, setResult] = useState<any | null>(null); // Usa un'interfaccia specifica se possibile
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        setError(null);

        propertiesApi()
            .then((data: any) => {  // Puoi sostituire `any` con un tipo specifico
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

export default useProperties;
