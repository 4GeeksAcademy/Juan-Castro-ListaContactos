// ...existing code...
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Form = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const [result, setResult] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [usersCreate, setUsersCreate] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    })
    
    useEffect(() => {
        const contact = location.state?.contact;
        if (contact) {
            setUsersCreate({
                name: contact.name || "",
                email: contact.email || "",
                phone: contact.phone || "",
                address: contact.address || ""
            });
            setEditingId(contact.id);
        }
    }, [location.state]);

    const handlerCreateUser = async () => {
        try {
            const body = {
                name: usersCreate.name,
                email: usersCreate.email,
                phone: usersCreate.phone,
                address: usersCreate.address,
                agenda_slug: "juanxo"
            }

            const url = editingId
                ? `https://playground.4geeks.com/contact/agendas/juanxo/contacts/${editingId}`
                : `https://playground.4geeks.com/contact/agendas/juanxo/contacts`;

            const method = editingId ? "PUT" : "POST";

            let response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) throw new Error("Error en la petición");

            await response.json();
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Error: " + (error.message || "Algo salió mal"));
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