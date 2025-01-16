export type BookingStatus = 'pending' | 'completed' | 'rejected';
export interface IBookingModelDTO {
	room_id: string;
	bookingDate: Date;
	status?: BookingStatus;
}
