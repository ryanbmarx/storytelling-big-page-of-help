// Does what it says
export function formatAPStyle(m) {
	// gives you some sweet AP style
	return m
		.replace("January", "Jan.")
		.replace("February", "Feb.")
		.replace("August", "Aug.")
		.replace("September", "Sept.")
		.replace("October", "Oct.")
		.replace("November", "Nov.")
		.replace("December", "Dec.")
		.replace("AM", "a.m.")
		.replace("PM", "p.m.");
}
