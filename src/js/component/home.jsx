import React from "react";


const Home = () => {
	return (
		<div className="container">
			<h1>My ToDos</h1>
			<ul>
				<li className="flex-container">
					<input
						type="text"
						placeholder="¿Que necesitas hacer?">
					</input>
				</li>
				<li>Hacer la cama <i class="far fa-times-circle"></i></li>
				<li>Comprar comida <i class="far fa-times-circle"></i></li>
				<li>Realizar proyectos <i class="far fa-times-circle"></i></li>
				<li>Cita en el cine <i class="far fa-times-circle"></i></li>
			</ul>
			<div>No. tasks left</div>
		</div>
	);
};

export default Home;
