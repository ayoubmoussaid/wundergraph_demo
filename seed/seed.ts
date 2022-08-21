import { Client } from '../.wundergraph/generated/wundergraph.client';
import fetch from 'node-fetch';

const seed = async () => {
	const client = new Client({
		customFetch: (input, init) => fetch(input, init),
	});
	var out = await client.mutation.CreateTask({
		input: {
			title: "first task",
			content: "Click on title or description to edit task",
			status: "TODO"
		},
	});
	console.log('seed:out', JSON.stringify(out));
	var out = await client.mutation.CreateTask({
		input: {
			title: "second task",
			content: "Hover over the icons on top right of tiles to see what you can do!",
			status: "DOING"
		},
	});
	console.log('seed:out', JSON.stringify(out));
	var out = await client.mutation.CreateTask({
		input: {
			title: "third task",
			content: "Add tasks by selecting the button below",
			status: "DONE"
		},
	});
	console.log('seed:out', JSON.stringify(out));
};

seed();
