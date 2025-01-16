// export enum BookingStatus {
// 	PENDING = 'pending',
// 	COMPLETED = 'completed',
// 	REJECTED = 'rejected',
// }
export type BookingStatus = 'pending' | 'completed' | 'rejected';
export interface IBookingModelDTO {
	room_id: string;
	bookingDate: Date;
	status?: BookingStatus;
}
