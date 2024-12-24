import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ScheduleDocument, ScheduleModel } from './models/schedule.model';
import { Model } from 'mongoose';

@Injectable()
export class ScheduleService {
	constructor(@InjectModel(ScheduleModel.name) private scheduleModel: Model<ScheduleDocument>) {}
}
