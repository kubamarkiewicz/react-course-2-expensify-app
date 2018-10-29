// Get expenses total
export default (expenses) => {
	return expenses.reduce((total, expence) => total + expence.amount, 0);
}
