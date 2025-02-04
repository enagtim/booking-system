import { BookingStatus } from '../src/enum/booking.status.enum';
import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { disconnect } from 'mongoose';
import { AppModule } from '../src/app.module';
import { BookingModelDTO } from '../src/booking/dto/booking.dto';
import * as request from 'supertest';
import { AuthDto } from '../src/auth/dto/auth.dto';

const testDto: BookingModelDTO = {
	room_id: '6788d1e7e809a248c257e027',
	bookingDate: new Date(),
	status: BookingStatus.PENDING,
};

const userLoginDto: AuthDto = {
	email: 'kaberovnikita@gmail.com',
	password: '12345678',
};

const adminLoginDto: AuthDto = {
	email: 'alex@mail.ru',
	password: '12345678',
};

describe('BookingController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let userToken: string;
	let adminToken: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();
		app = moduleFixture.createNestApplication();
		await app.init();

		const res = await request(app.getHttpServer()).post('/auth/login').send(userLoginDto);
		userToken = res.body.access_token;

		const { body } = await request(app.getHttpServer()).post('/auth/login').send(adminLoginDto);
		adminToken = body.access_token;
	});
	it('/booking/create (POST) - SUCCESS', async () => {
		return request(app.getHttpServer())
			.post('/booking/create')
			.set('Authorization', 'Bearer ' + userToken)
			.send({ ...testDto, bookingDate: testDto.bookingDate.toISOString() })
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});
	it('/booking/create (POST) - BAD', () => {
		return request(app.getHttpServer())
			.post('/booking/create')
			.set('Authorization', 'Bearer ' + userToken)
			.send({ ...testDto, bookingDate: testDto.bookingDate.toISOString(), status: 'long' })
			.expect(400);
	});
	it('/booking/all (GET) - SUCCESS', async () => {
		return request(app.getHttpServer())
			.get('/booking/all')
			.set('Authorization', 'Bearer ' + adminToken)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(Array.isArray(body)).toBe(true);
				if (body.length > 0) {
					expect(body.length).toBeGreaterThan(0);
				} else {
					expect(body).toEqual([]);
				}
			});
	});
	it('/booking/get/:id (GET) - SUCCESS', async () => {
		return request(app.getHttpServer())
			.get(`/booking/get/:id?id=${createdId}`)
			.set('Authorization', 'Bearer ' + userToken)
			.expect(200);
	});
	it('/booking/get/:id (GET) - BAD', () => {
		return request(app.getHttpServer())
			.get('/booking/get/:id?id=60e8f06a2e9b9b3b2c8d7e6a')
			.set('Authorization', 'Bearer ' + userToken)
			.expect(404);
	});
	it('/booking/update/:id (PATCH) - SUCCESS', async () => {
		return request(app.getHttpServer())
			.patch(`/booking/update/:id?id=${createdId}`)
			.set('Authorization', 'Bearer ' + userToken)
			.send({ status: 'rejected' })
			.expect(200);
	});
	it('/booking/update/:id (PATCH) - BAD', () => {
		return request(app.getHttpServer())
			.patch('/booking/update/:id?id=60e8f06a2e9b9b3b2c8d7e6a')
			.set('Authorization', 'Bearer ' + userToken)
			.expect(404);
	});
	it('/booking/delete/:id (DELETE) - BAD', () => {
		return request(app.getHttpServer())
			.delete(`/booking/delete/:id?id=${createdId}&status=pending`)
			.set('Authorization', 'Bearer ' + adminToken)
			.expect(400);
	});
	it('/booking/delete/:id (DELETE) - SUCCESS', async () => {
		return request(app.getHttpServer())
			.delete(`/booking/delete/:id?id=${createdId}&status=rejected`)
			.set('Authorization', 'Bearer ' + adminToken)
			.expect(204);
	});
	afterAll(() => {
		disconnect();
	});
});
