import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Contactos = () => {

    const { store, dispatch } = useGlobalReducer()
    const [users, setUsers] = useState([])
    const [idToDelete, setIdToDelete] = useState("")
    const [idToEdit, setIdToEdit] = useState("")
    const [userid, setUserid] = useState("")
    const navigate = useNavigate()

    useEffect(() => {

        let getUsers = async () => {
            try {
                let response = await fetch("https://playground.4geeks.com/contact/agendas/juanxo/contacts")
                if (!response.ok) {
                    throw new Error("Error ahora...")
                }
                let data = await response.json()
                console.log("ESTA ES LA DATA ENTRANTE: ", data.contacts);

                setUsers(data.contacts)

            } catch (error) {
                console.error(error)
            }
        }

        getUsers()

    }, [])


    const handlerDeleteById = async (id) => {
        try {

            let response = await fetch(`https://playground.4geeks.com/contact/agendas/juanxo/contacts/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("algo salio mal")
            }

            if (response.status === 204) {
                
                setUsers(prev => prev.filter(u => u.id !== id))
                if (idToDelete === id) setIdToDelete("")
            }
        } catch (error) {
            console.error(error)

        }

    }


    return (
        <div className="text-center mt-5">
            <div className="btn-wrapper">
                <Link to="/form">
                    <button className="btn-right">Add New Contact</button>
                </Link>
            </div>
            {
                users.length > 0 &&
                users.map((ele) => {
                    return (

                        <div className="contactos" key={ele.id}>

                            <img src="src/assets/img/cara.jpg" alt="cara de contacto" />

                            <div className="datos-contact">
                                <h4 className="nombrecontacto">{ele.name}</h4>
                                <p>
                                    <i className="fa-solid fa-location-dot contact-icon"></i> {ele.address}
                                </p>
                                <p>
                                    <i className="fa-solid fa-phone contact-icon" ></i> {ele.phone}
                                </p>
                                <p>
                                    <i className="fa-solid fa-envelope contact-icon"></i> {ele.email}
                                </p>                        
                            </div>

                            <div className="iconos" >
                                <i className="fa-solid fa-user-pen"
                                onClick={() => setIdToEdit(ele.id)}></i>

                                <i
                                    className="fa-solid fa-trash"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#exampleModal-${ele.id}`}
                                    onClick={() => setIdToDelete(ele.id)}
                                ></i>


                                <div className="modal fade" id={`exampleModal-${ele.id}`} tabIndex="-1" aria-labelledby={`exampleModalLabel-${ele.id}`} aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id={`exampleModalLabel-${ele.id}`}>¿Eliminar el contacto {ele.name}?</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                ¿Seguro que quieres eliminarlo?
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                                <button type="button" className="btn btn-primary" onClick={() => handlerDeleteById(idToDelete || ele.id)} data-bs-dismiss="modal">Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    )
                })
            }

        </div>
    );
};

export default Contactos