export class User {
	id?: number;
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;

	constructor(
		id: number = null,
		firstName: string = null,
		lastName: string = null,
		email: string = null,
		password: string = null
	) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
	}
}
