import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home2 = () => {

	const { store, dispatch } = useGlobalReducer()

	const [userName, setUserName] = useState("")
	const [todo, setTodo] = useState("")
	const [result, setResult] = useState(0)
	const [users, setUsers] = useState([])
	const [idToDelete, setIdToDelete] = useState("")
	const [usersCreate, setUsersCreate] = useState([])
	const navigate = useNavigate()


	const handlerClick = () => {

		if (userName == "") {
			alert("tenes que escribir un nombre antes de navegar...")
			return
		} else {
			navigate('/demo')
		}


		navigate('/demo')
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
			let response = await fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
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
			let response = await fetch(`https://playground.4geeks.com/todo/users/${nombre}`, {
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

	const handlerDeleteById = async () => {
		try {
			let response = await fetch(`https://playground.4geeks.com/todo/todos/${idToDelete}`, {
				method: "DELETE"
			})
			if (!response.ok) {
				throw new Error("algo salio mal")
			}

			if (response.status === 204) {
				alert(`El todo con id ${idToDelete}, fue eliminado`)
				setIdToDelete("")
			}


		} catch (error) {

		}
	}

	useEffect(() => {

		let getUsers = async () => {
			try {
				let response = await fetch("https://playground.4geeks.com/todo/users")
				if (!response.ok) {
					throw new Error("Error ahora...")
				}
				let data = await response.json()
				setUsers(data.users)
				return data
			} catch (error) {
				console.error(error)
			}
		}

		getUsers()

	}, [])


	return (
		<div className="text-center mt-5">
			<button onClick={handlerClick}>Ir a demo si completaste el nombre</button>
			{
				users.length > 0 &&
				users.map((ele) => {
					return (
						<div>
							<button key={ele.id} onClick={() => setUserName(ele.name)}>
								<h6>{ele.name}</h6></button>
						</div>

					)
				})
			}
			<br />
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
			<input type="text" onChange={(e) => setUsersCreate(e.target.value)} />
			<button onClick={()=>handlerCreateUser(usersCreate)}>Crear tarea</button>
			<h5>{result}</h5>



			<br />
			<br />
			<h5>Area para eliminar por id</h5>
			<input type="text" value={idToDelete && idToDelete} onChange={(e) => setIdToDelete(e.target.value)} />
			<button onClick={handlerDeleteById}>Eliminar</button>
		</div>
	);
};

export default Home2