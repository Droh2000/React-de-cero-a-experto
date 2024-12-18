// ESto se va a disparar de forma simultanea varias veses pero solo se va a subir un archivo a la vez
export const fileUpload = async (file) => {
    if( !file ) throw new Error('No tenemos archivos a subir pendejo');

    // EStos datos los tomamos de la pagina pero no los pueimos por hueva, asi que ponte a ver el video otra vez
    const cloudUrl = 'https://api.cloudinary.com/v1_1/PENDIENTE/upload';
    // Construimos el FormData que es nesesaria para hacer la peticion
    const formData = new FormData();

    formData.append('upload_present', 'PENDIENTE');
    formData.append('file', file);

    try {
        // Hacemos la llamada usando el FetchAPI especificando que esta es una peticion POST
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        });
        // Si nos sale un error en la respuesta
        if( !resp.ok ) throw new Error('No se pudo subir la imagen');

        // Si todo sale bien podemo serializar la Data
        const cloudResp = await resp.json();

        // Retornamos el URL que es donde se ubica la imagen
        return cloudResp.secure_url;

    } catch (error) {
        throw new Error( error.message );
    }

}