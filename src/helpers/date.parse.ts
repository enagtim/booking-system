import { parse } from 'date-fns';
export function parseDate(value: string | Date): Date {
	switch (true) {
		case value instanceof Date:
			return value;
		case typeof value === 'string':
			return parse(value, 'dd-MM-yyyy', new Date());
		default:
			throw new Error('Дата должна быть строкой');
	}
}
