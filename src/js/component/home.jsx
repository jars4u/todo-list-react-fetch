import React, { useEffect , useState } from "react";

//En React, si quiero agregar --> concat
// 			si quiero borrar  --> filter
// 			si quiero actualizar --> map

const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	return (
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
					<li>
						<strong>
							{task}<i class="far fa-times-circle"
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
	);
};

export default Home;
