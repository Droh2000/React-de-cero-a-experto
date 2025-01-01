
export const CalendarEvent = ({ event }) => {

    // Del evento sacamos estas propiedades (Es event porque asi lo especificamos dentro del CalendarPages.jsx en el objeto)
    const { title, user } = event;

    return (
        <>
            <strong>{ title }</strong>
            <span>- { user.name }</span>
        </>
    )
}