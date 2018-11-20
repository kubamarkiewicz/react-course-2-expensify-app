const promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('this is my data');
	}, 1000);
});

promise.then((data) => {
	console.log(data);

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('this is my second data');
		}, 1000);
	});
}).then((data) => {
	console.log(data);
});



