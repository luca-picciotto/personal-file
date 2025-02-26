export const relationsApi = async (): Promise<string> => {
    try {
        const response = await fetch("https://thatopen.github.io/engine_components/resources/small-relations.json");

        if (!response.ok) {
            throw new Error(`Errore nel caricamento delle relazioni! Status: ${response.status}`);
        }

        return await response.text();
    } catch (error) {
        console.error("Errore durante il fetch dei dati:", error);
        throw error;
    }
};

export default relationsApi;
