export const fileApi = async (): Promise<ArrayBuffer> => {
    try {
        const response = await fetch("https://thatopen.github.io/engine_components/resources/small.frag");

        if (!response.ok) {
            throw new Error(`Errore nel caricamento del modello! Status: ${response.status}`);
        }

        return await response.arrayBuffer();
    } catch (error) {
        console.error("Errore durante il fetch del file:", error);
        throw error;
    }
};

export default fileApi;
