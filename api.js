export const getServerTodos = async () => {
	const response = await fetch(
		"https://assets.breatheco.de/apis/fake/todos/user/paola9896"
	);
	if (response.status == 200) {
		const body = await response.json();
		return body;
	} else {
		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/paola9896",
			{
				method: "POST",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
		const todos = await getServerTodos();
		return todos;
	}
};

export const updateServerTodos = async todos => {
	await fetch("https://assets.breatheco.de/apis/fake/todos/user/paola9896", {
		method: "PUT",
		body: JSON.stringify(todos),
		headers: {
			"Content-Type": "application/json"
		}
	});
};
