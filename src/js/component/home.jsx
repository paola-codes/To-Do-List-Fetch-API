import React from "react";
import { TaskList } from "./TaskList.jsx";

const Home = () => {
	return (
		<div className="container-fluid">
			<div className="pt-5 text-center mx-auto">
				<h1 className="fw-light title opacity-25">todos</h1>
			</div>
			<div className="row px-5 d-flex justify-content-center">
				<div className="text-center d-flex justify-content-center">
					<TaskList />
				</div>
			</div>
		</div>
	);
};

export default Home;
