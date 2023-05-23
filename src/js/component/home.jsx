import React, {useState} from "react";

//En React, si quiero agregar --> concat
// 			si quiero borrar  --> filter
// 			si quiero actualizar --> map

const Home = () => {
	const [inputValue, setInputValue] = useState ("");
	const [todos, setTodos] = useState ([]);



	return (
		<div className="container">
			<h1>My ToDos</h1>
			<ul>
				<li className="flex-container; justify-content: space-between;">
					<input
						type="text"
						onChange= {(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyPress  ={(e) => {
							if (e.key === "Enter") {
								setTodos(todos.concat(inputValue));
							}
						}}
						placeholder="¿Que necesitas hacer?">
					</input>
				</li>
				<li>Hacer la cama <i class="far fa-times-circle "></i></li>
				<li>Comprar comida <i class="far fa-times-circle"></i></li>
				<li>Realizar proyectos <i class="far fa-times-circle"></i></li>
				<li>Cita en el cine <i class="far fa-times-circle"></i></li>
			</ul>
			<div>No. tasks left</div>
		</div>
	);
};

export default Home;
