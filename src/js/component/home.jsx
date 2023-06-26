import React, { useEffect, useState } from "react";

//URL Y USUARIO BASE DE LA API
const URLBASE = "https://assets.breatheco.de/apis/fake/todos/user"
const USERBASE = "jars4u"

//En React, si quiero agregar --> concat
// 			si quiero borrar  --> filter
// 			si quiero actualizar --> map

const Home = () => {
	const [inputValue, setInputValue] = useState({ label: "", done: false });
	const [todos, setTodos] = useState([]);

	//OBTENER LAS TAREAS
	const getTask = async () => {
		try {
			let response = await fetch(`${URLBASE}/${USERBASE}`)
			let data = await response.json()
			if (response.status == 404) {
				createUser()
			} else {
				setTodos(data)
			}

		} catch (error) {
			console.log(error);
		}
	};

	//CREAR UN USUARIO
	const createUser = async () => {
		try {
			let response = await fetch(`${URLBASE}/${USERBASE}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify([])
			})
			if (response.ok) {
				getTask();
			}

		} catch (error) {
			console.log(error);
		}
	}

	//AGREGAR TAREA
	const addTasks = async (event) => {
		try {
			if (event.key == "Enter") {
				let response = await fetch(`${URLBASE}/${USERBASE}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify([...todos, { label: inputValue, done: false }]),
				});
				if (response.ok) {
					getTask();
					setInputValue("")
				} else {
					console.log(response)
				}
			}
		} catch (error) {
			console.log(error);

		}
	}

	//BORRAR TAREA
	const deleteTask = async (item) => {
		try {
			let response = await fetch(`${URLBASE}/${USERBASE}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(todos.filter((_, index) => index != item))
			})
			if (response.ok) {
				getTask()
				setInputValue({ label: "", done: false })
			} else {
				console.log(response)
			}
		} catch (error) {
			console.log(error);
		}
	}

	//useEffect
	useEffect(() => {
		getTask();
	}, []);

	//DESPUES DE TANTO, EL RETURN RE-APARECE...
	return (
		<>
			{/* EL INPUT DINAMICO */}
			<div className="container">
				<h1><strong>Mis TuDus</strong></h1>
				<ul>
					<li className="flex-container; justify-content: space-between;">
						<input
							type="text"
							onChange={(event) => setInputValue(event.target.value)}
							value={inputValue.label}
							onKeyUp={addTasks}
							placeholder="¿Que necesitas hacer?"
						></input>
					</li>

					{/* MAPEO DE TAREAS Y BOTON PARA ELIMINAR ALGUNA */}
					{todos.map((task, index) => {
						return (
							<li key={index}>
								<strong>
									{task.label}
									<button onClick={() => deleteTask(index)}>
										<i className="far fa-times-circle"></i>
									</button>
								</strong>
							</li>
						);
					})}
				</ul>
				
				{/* //NRO DE TAREAS PENDIENTES POR HACER */}
				<div>
					<p>
						<strong>&nbsp;&nbsp;&nbsp;&nbsp;Tengo {todos.length} tareas por hacer</strong>
					</p>
				</div>
			</div >
		</>
	);
};

export default Home;
