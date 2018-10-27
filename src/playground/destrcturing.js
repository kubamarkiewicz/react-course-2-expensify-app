/*
const location = {
	city: 'Philadelphia',
	temp: 92
};

const {city = 'unknown', temp: temperature} = location; 

console.log(`It's ${temperature} in ${city}`);

*/

const address = ['1299 S Juniper Street', 'Philadephia', 'Pennsylvania', '129897'];

const [, city, state] = address;

console.log(`You are in ${city} ${state}`);