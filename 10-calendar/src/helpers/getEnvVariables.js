// Las variables de entorno se pueden configurar para hacer las pruebas uniarias
// Hay varias formas de preparar la apliacion pero lo mejor es usar una funcion asi no importamos nada

export const getEnvVariables = () => {
    // Se tiene que instalar este paquete en el proyecto
    import.meta.env;

    return {
        ... import.meta.env
    }
}