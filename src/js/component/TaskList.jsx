import React from "react";
import { getServerTodos, updateServerTodos } from "../../../api";

export const TaskList = () => {
	const [task, setTask] = React.useState("");
	const [list, setList] = React.useState(null);
	const [isHovering, setisHovering] = React.useState(-1);

	const handleInput = e => {
		if (e.keyCode == 13) {
			setList([...list, task]); /*why passing ...list if list is supposed to be empty, only task is needed*/
			setTask("");
		}
	};
	const deleteToDo = indexToRemove => {
		let filterList = list.filter((taskToRemove, i) => i != indexToRemove);
		setList(filterList); /*list of lis whose index does not match the index selected to be removed*/
	};

	/*Why do I need this two use effects*/
	React.useEffect(() => {
		const func = async () => {
			const todos = await getServerTodos();
			setList(
				todos.map(item => {
					return item.label;
				})
			);
		};
		func();
	}, []);

	React.useEffect(() => {
		const func2 = async () => {
			await updateServerTodos(
				list.map(item => ({ label: item, done: false }))
			);
		};
		if (list !== null) {
			func2();
		}
	}, [list]);

	if (list == null) {
		return null;
	}

	return (
		<div className="d-flex flex-column justify-content-center shadow mb-5 bg-body m-0 p-0">
			<div className="input-group border">
				<input
					type="text"
					placeholder="What needs to be done?"
					className="form-control px-5 py-2 fw-light fs-5"
					value={task} /*why here before i have entered an input*/
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
