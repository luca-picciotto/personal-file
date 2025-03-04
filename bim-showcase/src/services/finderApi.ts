export const finderApi = async()=> {
    try {
        const response = await fetch( "https://thatopen.github.io/engine_components/resources/small.ifc");

        if (!response.ok) {
             throw new Error(`Errore nel caricamento delle risorse per i finder: ${response.status}`);
        }
        
        return await response.arrayBuffer();
    } catch (error) {
        console.error("Errore durante il fetch delle proprietà:", error);
        throw error;
    }
};

export default finderApi;