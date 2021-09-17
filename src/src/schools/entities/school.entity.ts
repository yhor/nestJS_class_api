export interface News {
	id?: number;
	subject: string;
	content: string;
	reg_date?: Date;
	update_date?: Date;
	delete_date?: Date;
	is_delete?: string;
}

export class School {
	area: string;
	name: string;
	news?: News[];
}
