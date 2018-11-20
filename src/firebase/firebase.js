import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

// Register subscription

// database.ref('expenses')
// .on('value', (snapshot) =>  {
// 	const expenses = [];

// 	snapshot.forEach((childSnapshot) => {
// 		expenses.push({
// 			id: childSnapshot.key,
// 			...childSnapshot.val()
// 		});
// 	});

// 	console.log(expenses);
// });

// database.ref('expenses').on('child_changed', (snapshot) =>  {
// 	console.log(snapshot.val());
// });

// database.ref('expenses').push({
// 	description: 'loco',
// 	note: 'hello world',
// 	amount: 10,
// 	createdAt: '1234'
// });

/*database.ref().set({
	name: 'Kuba',
	isSingle: false,
	address: {
		city: 'Madrid'
	}
}).then(() => {
	console.log('data saved');
}).catch((e) => {
	console.log('This failed', e);
});

*/

/*database.ref('isSingle')
	.remove()
	.then(() => {
		console.log('data removed');
	})
	.catch((e) => {
		console.log('This failed', e);
	});*/
/*
database.ref()
.update({
	age: 23,			// update
	job: 'new job',		// add
	isSingle: null, 		// remove
	'address/city': 'Boston' 		
});*/
/*
database.ref()
.once('value')
.then((snapshot) =>  {
	const val = snapshot.val();
	console.log(val);
});*/


// database.ref()
// .on('value', (snapshot) =>  {
// 	const val = snapshot.val();
// 	console.log(val);
// });