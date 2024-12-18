import {ImageList, ImageListItem} from '@mui/material';

/*
    La base de este codigo lo copiamos del componente de ImageList de la pagina de Materia UI
    tomamos las imagenes que recibe que son para mostrarlas en la interfaz
    estas son solo imagenes que son solo el URL
*/
export const ImageGallery = ({images}) => {
  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            alt='Imagen de la nota'
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}