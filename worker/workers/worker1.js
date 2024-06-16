onmessage = event => {
	const {data} = event;
	// console.log('RUN: worker1.js');
	postMessage({
		name: 'worker1',
		data,
		time: new Date().toISOString(),
	});
};
