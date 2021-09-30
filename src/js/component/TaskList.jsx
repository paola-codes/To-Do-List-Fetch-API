import React from "react";

export const TaskList = () => {
	const [task, setTask] = React.useState("");
	const [list, setList] = React.useState([]);
	const [isHovering, setisHovering] = React.useState(-1);

	const handleInput = e => {
		if (e.keyCode == 13) {
			setTask(e.target.value);
			setList([...list, task]);
			setTask("");
		}
	};
	const deleteToDo = indexToRemove => {
		let filterList = list.filter((taskToRemove, i) => i != indexToRemove);
		setList(filterList);
	};

	return (
		<div className="d-flex flex-column justify-content-center shadow mb-5 bg-body m-0 p-0">
			<div className="input-group border">
				<input
					type="text"
					placeholder="What needs to be done?"
					className="form-control px-5 py-2 fw-light fs-5"
					value={task}
					onChange={event => setTask(event.target.value)}
					onKeyDown={e => handleInput(e)}
				/>
			</div>
			<div className="w-100 h-100">
				<ul className="ulStyle m-0 p-0">
					{list.map((singleTask, i) => {
						return (
							<li
								className="d-flex justify-content-between ps-5 pe-4 py-2 border-end border-start border-bottom text-muted fw-light fs-5"
								key={i}
								onMouseEnter={() => setisHovering(i)}
								onMouseLeave={() => setisHovering(-1)}>
								{singleTask}
								<span
									className={`text-danger ${
										isHovering == i ? "" : "hidden"
									}`}
									onClick={() => deleteToDo(i)}>
									x
								</span>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="w-100">
				<div className="ps-5 py-1 border-end border-start border-bottom text-muted fw-light fs-6 text-start">
					<span>{list.length} Items</span>
				</div>
			</div>
		</div>
	);
};
