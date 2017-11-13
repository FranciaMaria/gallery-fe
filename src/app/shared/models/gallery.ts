import { Image } from './image';
import { User } from './user';

export class Gallery {
	id?: number;
	name?: string;
	description?: string;
	images?: Array<Image>;
	user?: User;
	time?: string;
}
