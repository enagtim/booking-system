export const ERROR_MESSAGES = {
	ROOM_NOT_FOUND: 'Комната по найдена',
	ROOM_BOOKING: 'Комната уже забронирована',
	BOOKING_NOT_FOUND: 'Заброниронированная комната не найдена',
	BOOKING_NOT_FOUND_OR_NOT_STATUS_REJECTED:
		'Заброниронированная комната не найдена или её статус не является отклоненным',
	REGISTER_ERROR: 'Пользователь с таким email зарегистрирован',
	EMAIL_ERROR: 'Неверный email',
	PASSWORD_ERROR: 'Неверный пароль',
	NOT_AUTHORIZATION: 'Вы не авторизированы',
} as const;
