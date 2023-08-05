import React, { useEffect, useState } from "react";

//URL Y USUARIO BASE DE LA API
const URLBASE = "https://playground.4geeks.com/apis/fake/todos/user"
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
		if (event.key == "Enter") {
			try {
				let response = await fetch(`${URLBASE}/${USERBASE}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify([...todos, inputValue]),
				});
				if (response.ok) {
					getTask();
					setInputValue({ label: "", done: false });
				} else {
					console.log(response);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

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

	//BORRAR TODAS LAS TAREAS
	const delAllTasks = async () => {
		try {
			let response = await fetch(`${URLBASE}/${USERBASE}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
			});
			if (response.ok) {
				getTask();
			} else {
				console.log("error borrando...");
			}
		} catch (error) {
			console.log(error);
		}
	};

	//useEffect
	// useEffect(() => {
	// 	getTask();
	// }, []);



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
									{task}
									<button onClick={() => deleteTask(index)}>
										<i className="far fa-times-circle"></i>
									</button>
								</strong>
							</li>
						);
					})}
				</ul>

				{/* //NRO DE TAREAS PENDIENTES POR HACER Y BOTON BORRAR TODO */}
				<div>
					<div>
						<strong>&nbsp;&nbsp;&nbsp;&nbsp;Tengo {todos.length} tareas por hacer</strong>
					</div>

				</div>
			</div >
			<button
				className="btn btn-primary"
				onClick={() => delAllTasks()}
			>
				Borrar tareas
			</button>
		</>
	);
};

export default Home;
