import React, { useEffect, useState } from "react";

//URL Y USUARIO BASE DE LA API
const URLBASE = "https://playground.4geeks.com/apis/fake/todos/user/jars4u"

//En React, si quiero agregar --> concat
// 			si quiero borrar  --> filter
// 			si quiero actualizar --> map

const Home = () => {
	const [allTasks, setAllTasks] = useState([])
	const [task, setTask] = useState({})



	//AGREGAR TAREA
	const addTask = async (event) => {
		if (event.key == "Enter") {
			try {
				let response = await fetch(`${URLBASE}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify([...allTasks, task]),
				});
				if (response.ok) {
					getAllTasks();
					// setAllTasks({ label: "", done: false });
				} else {
					console.log(response);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};





	//OBTENER TAREAS
	async function getAllTasks() {
		try {
			let response = await fetch(`${URLBASE}`)
			let data = await response.json()

			if (response.status == 404) {
				createUser()
			} else {
				setAllTasks(data)
			}
		} catch (err) {
			console.log(err)
		}
	}



	//BORRAR TAREAS:
	async function deleteAllTask() {
		try {
			let response = await fetch(`${URLBASE}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify([{ label: "example task", done: false }])
			}
			)
			getAllTasks()

		} catch (err) {
			console.log(err)
		}
	}



	useEffect(() => {
		getAllTasks()
	}, [])


	function handleChange({ target }) {
		setTask({
			...task,
			[target.name]: target.value,
			done: false
		})
	}



	function handleDeleteTask(index) {
		const oneLessTask = allTasks.filter(task => task.label != allTasks[index].label)
		setAllTasks(oneLessTask)
	}


	return (
		<>
			{/* EL INPUT DINAMICO */}
			<div className="container">
				<h1><strong>Mis TuDus</strong></h1>
				<ul>
					<li className="flex-container; justify-content: space-between;">
						<input
							type="text"
							onChange={handleChange}
							value={task.label}
							onKeyUp={addTask}
							placeholder="¿Que necesitas hacer?"
						></input>
					</li>

					{/* MAPEO DE TAREAS Y BOTON PARA ELIMINAR ALGUNA */}
					{allTasks.map((item, index) => {
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
