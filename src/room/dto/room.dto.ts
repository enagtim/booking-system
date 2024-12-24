interface IFeedback {
	author: string;
	text: string;
	location?: {
		city?: string;
		country?: string;
		region?: string;
	};
	createdAt: Date;
}
interface ILocation {
	city: string;
	country: string;
	region: string;
	address: string;
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
