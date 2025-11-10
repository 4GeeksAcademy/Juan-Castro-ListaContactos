import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Contactos = () => {

    const { store, dispatch } = useGlobalReducer()

    const [userName, setUserName] = useState("")
    const [todo, setTodo] = useState("")
    const [result, setResult] = useState(0)
    const [users, setUsers] = useState([])
    const [idToDelete, setIdToDelete] = useState("")
    const [usersCreate, setUsersCreate] = useState([])
    const [Contacts, setContacts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {

        let getUsers = async () => {
            try {
                let response = await fetch("https://playground.4geeks.com/contact/agendas")
                if (!response.ok) {
                    throw new Error("Error ahora...")
                }
                let data = await response.json()
                console.log("ESTA ES LA DATA ENTRANTE: ", data.agendas);

                setUsers(data.agendas)

            } catch (error) {
                console.error(error)
            }
        }

        getUsers()

    }, [])

    const handlerClick = () => {

        if (userName == "") {

            return
        } else {
            navigate('/home2')
        }


        navigate('/home')
    }

    const handlerCreate = async () => {

        if (todo && todo.length < 10) {
            alert("La tarea tiene que tener por lo menos 10 caracteres.")
            return
        }

        let payload = {
            label: todo,
            is_done: false
        }
        console.log("este es el payload: ", payload)

        try {
            let response = await fetch(`https://playground.4geeks.com/contact/agenda/${usersCreate}`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // if(!response.ok){
            // 	throw new Error("Falso positivo")
            // }

            let data = await response.json()
            setResult(data.id)

        } catch (error) {
            console.error(error)
            alert("algo malió sal")
        }
    }

    console.log(usersCreate);


    const handlerCreateUser = async (nombre) => {

        // if (usersCreate && usersCreate.length < 10) {
        // 	alert("La tarea tiene que tener por lo menos 10 caracteres.")
        // 	return
        // }

        let payload = {
            label: todo,
            is_done: false
        }
        console.log(nombre, "este es el nombre")

        try {
            let response = await fetch(`https://playground.4geeks.com/contact/agendas/${nombre}`, {
                method: "POST",

                headers: {
                    'Content-Type': 'application/json'
                }
            })

            // if(!response.ok){
            // 	throw new Error("Falso positivo")
            // }

            let data = await response.json()
            setResult(nombre.id)

        } catch (error) {
            console.error(error)
            alert("algo malió sal")
        }
    }

    const handlerDeleteById = async (id) => {
        try {
            // if (!id) return
            // if (!window.confirm(`¿Eliminar contacto con id ${id}?`)) return

            let response = await fetch(`https://playground.4geeks.com/contact/agendas/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("algo salio mal")
            }

            if (response.status === 204) {
                alert(`El contacto con id ${id} fue eliminado`)
                // actualizar la lista local para reflejar el cambio sin recargar
                setUsers(prev => prev.filter(u => u.id !== id))
                // opcional: limpiar selección
                if (idToDelete === id) setIdToDelete("")
            }
        } catch (error) {
            console.error(error)
            alert("Error al eliminar")
        }
    }


    return (
        <div className="text-center mt-5">
            <div className="btn-wrapper">
                <button className="btn-right" onClick={handlerCreateUser}>Add New Contact</button>
            </div>

            {
                users.length > 0 &&
                users.map((ele) => {
                    return (

                        <div className="contactos" key={ele.id}>

                            <img src="src/assets/img/cara.jpg" alt="cara de contacto" />

                            <h4 className="nombrecontacto" onClick={() => setUserName(ele.slug)}>
                                {ele.slug}
                            </h4>

                            <div className="iconos" >
                                <i className="fa-solid fa-user-pen"></i>
                                <i className="fa-solid fa-trash " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handlerDeleteById} ></i>

                                {/* Modal */}
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">"¿Eliminar el contacto {ele.i} ?"</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                ¿Seguro que quieres eliminarlo?
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary" onClick={() => handlerDeleteById(ele.id)}>Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    )
                })
            }




            {/* <br />
            <br />
            <h5>Escribe el nombre de usuario o click en alguno de ellos</h5>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <br />
            <br />
            <h3>Crea una tarea para algun usuario</h3>
            <input type="text" onChange={(e) => setTodo(e.target.value)} />
            <button onClick={handlerCreate}>Crear tarea</button>
            <h5>{result}</h5>

            <h3>Crea un nuevo usuario</h3>
            <input type="text"  onChange={(e) => setUsersCreate(e.target.value)} />
            <button onClick={() => handlerCreateUser(usersCreate)}>Crear tarea</button>
            <h5>{result}</h5>



            <br />
            <br />
            <h5>Area para eliminar por id</h5>
            <input type="text" value={idToDelete && idToDelete} onChange={(e) => setIdToDelete(e.target.value)} />
            <button onClick={handlerDeleteById}>Eliminar</button> */}
        </div>
    );
};

export default Contactos