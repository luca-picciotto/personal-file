export const propertiesApi = async <T = unknown>(): Promise<T> => {
    try {
        const response = await fetch("https://thatopen.github.io/engine_components/resources/small.json");

        if (!response.ok) {
            throw new Error(`Errore nel caricamento del modello! Status: ${response.status}`);
        }

        return await response.json() as T;
    } catch (error) {
        console.error("Errore durante il fetch delle proprietà:", error);
        throw error;
    }
};

export default propertiesApi;
