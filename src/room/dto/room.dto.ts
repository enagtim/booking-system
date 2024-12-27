interface ILocation {
	city: string;
	country: string;
	region: string;
	address: string;
}
interface IFeedback {
	author: string;
	text: string;
	location?: ILocation;
	createdAt: Date;
}
export interface IRoomModelDto {
	title: string;
	images: string[];
	discription: string;
	countRooms: number;
	facilities: string[];
	rating: number;
	location: ILocation;
	feedback: IFeedback[];
}
