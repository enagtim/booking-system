import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { disconnect } from 'mongoose';
import { AppModule } from '../src/app.module';
import { IBookingModelDTO } from '../src/booking/dto/booking.dto';
import * as request from 'supertest';

const testDto: IBookingModelDTO = {
	room_id: '6788d1e7e809a248c257e027',
	bookingDate: new Date(),
};

describe('BookingController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();
		app = moduleFixture.createNestApplication();
		await app.init();
	});
	it('/booking/create (POST) ', async () => {
		return request(app.getHttpServer())
			.post('/booking/create')
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});
	it('/booking/all (GET) - SUCCESS', async () => {
		return request(app.getHttpServer())
			.get('/booking/all')
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
		return request(app.getHttpServer()).get(`/booking/get/:id?id=${createdId}`).expect(200);
	});
	it('/booking/get/:id (GET) - BAD', async () => {
		return request(app.getHttpServer())
			.get('/booking/get/:id?id=60e8f06a2e9b9b3b2c8d7e6a')
			.expect(404);
	});
	it('/booking/update/:id (PATCH) - SUCCESS', async () => {
		return request(app.getHttpServer())
			.patch(`/booking/update/:id?id=${createdId}`)
			.send({ status: 'rejected' })
			.expect(200);
	});
	it('/booking/update/:id (PATCH) - BAD', async () => {
		return request(app.getHttpServer())
			.patch('/booking/update/:id?id=60e8f06a2e9b9b3b2c8d7e6a')
			.expect(404);
	});
	it('/booking/delete/:id (DELETE) - BAD', async () => {
		return request(app.getHttpServer())
			.delete(`/booking/delete/:id?id=${createdId}&status=pending`)
			.expect(400);
	});
	it('/booking/delete/:id (DELETE) - SUCCESS', async () => {
		return request(app.getHttpServer())
			.delete(`/booking/delete/:id?id=${createdId}&status=rejected`)
			.expect(204);
	});
	afterAll(() => {
		disconnect();
	});
});
