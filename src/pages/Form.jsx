// ...existing code...
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export const Form = () => {
    const navigate = useNavigate();
    const [result, setResult] = useState("")
    const [usersCreate, setUsersCreate] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    })
    const [usersEdit, setUserEdit] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    })


    const handlerCreateUser = async () => {
        try {
            if (!usersCreate.name.trim() || !usersCreate.email.trim() || !usersCreate.phone.trim() || !usersCreate.address.trim()) {
                alert("Por favor completa todos los campos");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(usersCreate.email)) {
                alert("Por favor ingresa un email válido");
                return;
            }

            if (!/^\d+$/.test(usersCreate.phone.replace(/[\s\-]/g, ""))) {
                alert("Por favor ingresa un teléfono válido (solo números)");
                return;
            }

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

            if (!response.ok) {
                throw new Error("Falso positivo")
            }

            let data = await response.json()
            setResult(`Creado: ${data.name || "ok"}`)
            setUsersCreate({ full_name: "", email: "", phone: "", address: "" })
            navigate("/");

        } catch (error) {
            console.error(error)
            alert("algo salio mal")
        }
    }

    return (
        <div className="form-page mt-5">
            <div className="form-column">
                <h1>Crea un nuevo usuario</h1>
                <label htmlFor="name" className="form-label">Nombre Completo</label>
                <input id="name" type="text" value={usersCreate.name} onChange={(e) => setUsersCreate(prev => ({ ...prev, name: e.target.value }))} placeholder="Añade Un Nombre Completo" />

                <label htmlFor="email" className="form-label">Email</label>
                <input id="email" type="email" value={usersCreate.email} onChange={(e) => setUsersCreate(prev => ({ ...prev, email: e.target.value }))} placeholder="Ingresa Un Email" />

                <label htmlFor="phone" className="form-label">Teléfono</label>
                <input id="phone" type="tel" value={usersCreate.phone} onChange={(e) => setUsersCreate(prev => ({ ...prev, phone: e.target.value }))} placeholder="Inserta Un Numero De Teléfono" />


                <label htmlFor="address" className="form-label">Dirección</label>
                <input id="address" type="text" value={usersCreate.address} onChange={(e) => setUsersCreate(prev => ({ ...prev, address: e.target.value }))} placeholder="Agrega La Dirección" />

                <div className="form-actions">
                    <button className="btn btn-primary" onClick={handlerCreateUser}>Crear usuario</button>

                </div>
                <Link to="/"><span>Ir a pagina principal</span></Link>
                <h5>{result}</h5>

            </div>
        </div>
    );
};

export default Form;