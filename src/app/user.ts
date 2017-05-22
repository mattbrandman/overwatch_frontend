export class User {

	constructor(
		public username: string,
		public password: string,
		public rank: string,
		public wins: number,
		public losses: number,
		public draws: number,
	) { }

}