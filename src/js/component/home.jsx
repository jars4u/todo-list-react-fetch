import React, { useEffect, useState } from "react";

//URL Y USUARIO BASE DE LA API
const URLBASE = "https://playground.4geeks.com/apis/fake/todos/user"
const USERBASE = "jars4u"

const initialState = {
	label: "",
	done: false,
};

const Home = () => {
	const [allTasks, setAllTasks] = useState([])
	const [task, setTask] = useState(initialState)



	//AGREGAR TAREA
	const addTask = async (event) => {
		if (event.key == "Enter") {
			try {
				let response = await fetch(`${URLBASE}/${USERBASE}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify([...allTasks, task]),
				});
				if (response.ok) {
					getAllTasks();
					setTask(initialState);
				} else {
					console.log("La tarea no se ha agregado");
				}
			} catch (error) {
				console.log(error);
			}
		}
	};


	//CREA UN USUARIO
	const createUser = async () => {
		try {
			let response = await fetch(`${URLBASE}/${USERBASE}`,
				{
					method: "POST",
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify([])
				})

			if (response.ok) {
				getAllTasks()
			} else {
				console.log("Usuario no se ha creado")
			}

		} catch (err) {
			console.log(err)
		}
	}





	//OBTENER TAREAS
	const getAllTasks = async () => {
		try {
			let response = await fetch(`${URLBASE}/${USERBASE}`)
			let data = await response.json()

			if (response.status == 404) {
				createUser()

			} else {
				setAllTasks(data)
				// setAllTasks({
				// 	label: "bañar al perro",
				// 	done: false,
				// })
			}
		} catch (err) {
			console.log(err)
		}
	}



	//BORRAR TAREAS:
	const deleteAllTask = async () => {
		try {
			let response = await fetch(`${URLBASE}/${USERBASE}`, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json"
				},
				// body: JSON.stringify([{ label: "example task", done: false }])
			})

			if (response.ok) {
				getAllTasks()
			} else {
				console.log("no se pudieron borrar las tareas")
			}

		} catch (err) {
			console.log(err)
		}
	}



	useEffect(() => {
		getAllTasks()
	}, [])


	const handleChange = ({ target }) => {
		setTask({
			...task,
			[target.name]: target.value,
		})
	}



	const handleDeleteTask = (index) => {
		const delTask = allTasks.filter(task => task.label != allTasks[index].label)
		setAllTasks(delTask)
	}


	return (
		<>
			{/* EL INPUT DINAMICO */}
			<div className="container">
				<h1><strong>Mis TuDus</strong></h1>
				<ul className="container">
					{/* <li className="flex-container; justify-content: space-between;"> */}
					<input
						className="rounded-top pt-2"
						type="text"
						onChange={handleChange}
						value={task.label}
						onKeyUp={addTask}
						placeholder=" ¿Que necesitas hacer?"
						name="label"
					></input>
					{/* </li> */}

					{/* MAPEO DE TAREAS Y BOTON PARA ELIMINAR ALGUNA */}
					{
						allTasks.length == 0
							?
							<p className="ps-2 text-danger">Crea un usuario y comienza a agregar tareas...</p>
							:
							allTasks.map((item, index) => {
								return (
									<li className="d-flex justify-content-between" key={index}>
										<strong>
											{item.label}
											<span onClick={() => handleDeleteTask(index)}>
												<i className="far fa-times-circle"></i>
											</span>
										</strong>
									</li>
								);
							})}
				</ul>

				{/* //NRO DE TAREAS PENDIENTES POR HACER Y BOTON BORRAR TODO */}
				<div className="d-flex justify-content-between mt-3 pe-3">
					<div>
						<strong>&nbsp;&nbsp;&nbsp;&nbsp;Tengo {allTasks.length} tareas por hacer</strong>
					</div>
					<button
						className="btn btn-danger"
						onClick={() => deleteAllTask()}
					>
						Borrar todas las tareas
					</button>
				</div>
			</div >
		</>
	);
};

export default Home;
