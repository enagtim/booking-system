import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { RoomModelDto } from '../src/room/dto/room.dto';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';
import * as request from 'supertest';

const testDto: RoomModelDto = {
	title: 'Отличная комната в центре города',
	description: 'Комната со всеми удобствами',
	roomNumber: 102,
	numberOfRooms: 3,
	facilities: ['Интернет', 'Душ', 'Кондиционер'],
};

const adminLoginDto: AuthDto = {
	email: 'alex@mail.ru',
	password: '12345678',
};

describe('RoomController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();
		app = moduleFixture.createNestApplication();
		await app.init();

		const { body } = await request(app.getHttpServer()).post('/auth/login').send(adminLoginDto);
		token = body.access_token;
	});
	it('/room/create (POST) - SUCCESS', async () => {
		return request(app.getHttpServer())
			.post('/room/create')
			.set('Authorization', 'Bearer ' + token)
			.send(testDto)
			.expect(201)
			.then(({ body }: request.Response) => {
				createdId = body._id;
				expect(createdId).toBeDefined();
			});
	});
	it('/room/create (POST) - BAD', () => {
		return request(app.getHttpServer())
			.post('/room/create')
			.set('Authorization', 'Bearer ' + token)
			.send({ ...testDto, numberOfRooms: 0 })
			.expect(400);
	});
	it('/room/all (GET) - SUCCESS', async () => {
		return request(app.getHttpServer())
			.get('/room/all')
			.set('Authorization', 'Bearer ' + token)
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
	it('/room/get/:id (GET) - SUCCESS', async () => {
		return request(app.getHttpServer())
			.get(`/room/get/:id?id=${createdId}`)
			.set('Authorization', 'Bearer ' + token)
			.expect(200);
	});
	it('/room/get/:id (GET) - BAD', () => {
		return request(app.getHttpServer())
			.get(`/room/get/:id?id=60e8f06a2e9b9b3b2c8d7e6a`)
			.set('Authorization', 'Bearer ' + token)
			.expect(404);
	});
	it('/room/update/:id (PATCH) - SUCCESS', async () => {
		return request(app.getHttpServer())
			.patch(`/room/update/:id?id=${createdId}`)
			.set('Authorization', 'Bearer ' + token)
			.expect(200)
			.send({ title: 'Прекрасная комната в центре города' });
	});
	it('/room/update/:id (PATCH) - BAD', () => {
		return request(app.getHttpServer())
			.patch(`/room/update/:id?id=60e8f06a2e9b9b3b2c8d7e6a`)
			.set('Authorization', 'Bearer ' + token)
			.expect(404);
	});
	it('/room/delete/:id (DELETE) - BAD', () => {
		return request(app.getHttpServer())
			.delete(`/room/delete/:id?id=60e8f06a2e9b9b3b2c8d7e6a`)
			.set('Authorization', 'Bearer ' + token)
			.expect(404);
	});
	it('/room/delete/:id (DELETE) - SUCCESS', async () => {
		return request(app.getHttpServer())
			.delete(`/room/delete/:id?id=${createdId}`)
			.set('Authorization', 'Bearer ' + token)
			.expect(204);
	});
	afterAll(() => {
		disconnect();
	});
});
