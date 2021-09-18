export interface Subs {
	area: string;
	name: string;
	sub_start_date: Date;
	sub_end_date?: Date;
	is_sub: string;
}

export class User {
	name: string;
	grade: string;
	subs?: Subs[];
}
