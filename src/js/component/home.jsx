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
	}

	//CREAR UN USUARIO
	const createUser = async () => {
		try {
			let response = await fetch(`${URLBASE}/${USERBASE}`, {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify([])
			})

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
					body: JSON.stringify([...todos, inputValue])
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
	}

	//BORRAR TAREA
	const delTask = async (item) => {
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

	//ERROR MESSAGE ON INSPECTOR
	// useEffect(() => {
	// 	getTask()
	// }, [])



	return (
		<>
			<div className="container">
				<h1><strong>Mis TuDus</strong></h1>
				<ul>
					<li className="flex-container; justify-content: space-between;">
						<input
							type="text"
							onChange={(event) => setInputValue(event.target.value)}
							value={inputValue}
							onKeyUp={(event) => {
								if (event.key === "Enter") {
									setTodos(todos.concat(inputValue));
									setInputValue("");
								}
							}}
							placeholder="¿Que necesitas hacer?"
						></input>
					</li>
					{todos.map((task, index) => (
						<li key={index}>
							<strong>
								{task}<i className="far fa-times-circle"
									onClick={() => setTodos(todos.filter((task, newIndex) => index != newIndex))}></i>
							</strong>
						</li>
					))}
				</ul>
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
