import React from "react";

const Home = () => {
	return (
		<div className="container">
			<h1>My ToDos</h1>
			<ul>
				<li>
					<input
						type="text"
						placeholder="¿Que necesitas hacer?">
					</input>
				</li>
				<li>Hacer la cama</li>
				<li>Comprar comida</li>
				<li>Realizar proyectos</li>
				<li>Cita en el cine</li>
			</ul>
			<div>N items left</div>
		</div>
	);
};

export default Home;
