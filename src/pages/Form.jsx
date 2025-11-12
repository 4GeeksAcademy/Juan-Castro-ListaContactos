import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";
export const Form = () => {

    const { store, dispatch } = useGlobalReducer()
    const [result ,setResult] = useState("")
    const [usersCreate, setUsersCreate] = useState({})
    const [datosContact, setDatosContact] = useState({})

    const handlerCreateUser = async () => {          
        try {
            let response = await fetch(`https://playground.4geeks.com/contact/agendas/juanxo/contacts`, {
                method: "POST"

              
            })

            if(!response.ok){
            	throw new Error("Falso positivo")
            }

            let data = await response.json()
            setResult(nombre.id)

        } catch (error) {
            console.error(error)
            alert("algo malió sal")
        }
    }

    return (
        <div className="text-center mt-5">
            <h3 >Crea un nuevo usuario</h3>
            <input type="text" onChange={(e) => setUsersCreate(e.target.value.name)} placeholder="Nombre" />
            <input type="phone" onChange={(e) => setUsersCreate(e.target.value.phone)} placeholder="Telefono" />
            <input type="email" onChange={(e) => setUsersCreate(e.target.value.email)} placeholder="Email" />
            <input type="text" onChange={(e) => setUsersCreate(e.target.value.address)} placeholder="Direccion" />
            <button onClick={() => handlerCreateUser(usersCreate)}>Crear usuario</button>
            {/* <h5>{result}</h5> */}


        </div>
    );
}; 