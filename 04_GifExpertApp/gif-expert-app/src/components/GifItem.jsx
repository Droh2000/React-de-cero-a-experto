
// Solo estas propiedades requerimos para mostrar el componente
// las pasamos desetructuradas para poder trabajr mas facilmente
export const GifItem = ({title, url}) => {
  return (
    <div className="card">  
        <img src={ url } alt={ title } />
        <p>{ title }</p>
    </div>
  )
}