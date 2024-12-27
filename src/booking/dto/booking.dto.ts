enum BookingStatus {
	PENDING = 'pending',
	COMPLETED = 'completed',
	REJECTED = 'rejected',
}
export interface IBookingModelDTO {
	room_id: string;
	bookingDate: Date;
	status: BookingStatus;
	deletedAt?: Date;
}
