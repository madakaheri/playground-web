onmessage = event => {
	const {data} = event;
	// console.log('RUN: worker2.js');
	postMessage({
		name: 'worker2',
		data,
		time: new Date().toISOString(),
	});
};
