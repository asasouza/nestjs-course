import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './dto/create-report.dto';
import { Report } from './report.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
  ) {}

  async create(data: CreateReportDTO, user: User): Promise<Report> {
    const report = this.reportsRepository.create(data);

    report.user = user;

    return this.reportsRepository.save(report);
  }
}
