
// Obtenemos los valores que nos importan del UseContext

import { useContext } from "react"
import { UserContext } from "./context/userContext";

export const HomePage = () => {

    const { user } = useContext( UserContext );

    return (
        <>
            {/* Le ponemos el signo para que si no viene la informacion no la muestre y no de Error */}
            <h1>HomePage <small>{user?.name}</small></h1>
            <hr />

        </>
    )
}
