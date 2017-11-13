import { User } from './user';

export class Comment {
	id?: number;
	text?: string;
	galleryId?: number;
	authorId?: number;
	time?: string;
	user?: User;

	constructor(
		id: number = null,
		text: string = null,
		galleryId: number = null,
		authorId: number = null,
		time: string = null
	) {
		this.id = id;
		this.text = text;
		this.galleryId = galleryId;
		this.authorId = authorId;
		this.time = time;
	}
}
