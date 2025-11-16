// ...existing code...
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";
export const Form = () => {

    const { store, dispatch } = useGlobalReducer()
    const [result ,setResult] = useState("")
    const [usersCreate, setUsersCreate] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    })
    

    const handlerCreateUser = async () => {          
        try {
            const body = {
                name: usersCreate.name,
                email: usersCreate.email,
                phone: usersCreate.phone,
                address: usersCreate.address,
                agenda_slug: "juanxo"
            }

            let response = await fetch(`https://playground.4geeks.com/contact/agendas/juanxo/contacts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            if(!response.ok){
                throw new Error("Falso positivo")
            }

            let data = await response.json()
            setResult(`Creado: ${data.name || "OK"}`)
            setUsersCreate({ full_name: "", email: "", phone: "", address: "" })

        } catch (error) {
            console.error(error)
            alert("algo salio mal")
        }
    }

    return (
        <div className="text-center mt-5">
            <h3 >Crea un nuevo usuario</h3>
            <input type="text" value={usersCreate.name} onChange={(e) => setUsersCreate(prev => ({...prev, name: e.target.value}))} placeholder="Nombre" />
            <input type="phone" value={usersCreate.phone} onChange={(e) => setUsersCreate(prev => ({...prev, phone: e.target.value}))} placeholder="Telefono" />
            <input type="email" value={usersCreate.email} onChange={(e) => setUsersCreate(prev => ({...prev, email: e.target.value}))} placeholder="Email" />
            <input type="text" value={usersCreate.address} onChange={(e) => setUsersCreate(prev => ({...prev, address: e.target.value}))} placeholder="Direccion" />
            <button onClick={handlerCreateUser}>Crear usuario</button>
            <h5>{result}</h5>
        </div>
    );
};