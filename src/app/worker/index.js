const worker1 = new Worker(new URL('workers/worker1.js', import.meta.url), {name: 'worker1', type: 'module'});
const worker2 = new Worker(new URL('workers/worker2.js', import.meta.url), {name: 'worker2', type: 'module'});

export function play() {
	worker1.onmessage = event => {
		console.log(event.data);
	};

	worker2.onmessage = event => {
		console.log(event.data);
	};

	function * generator() {
		let i = 0;

		while (i < 1000) {
			yield i++;
		}
	}

	for (const index of generator()) {
		worker1.postMessage(index);
		worker2.postMessage(index);
	}
}

export {worker1, worker2};
