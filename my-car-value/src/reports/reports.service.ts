import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './dto/create-report.dto';
import { Report } from './report.entity';
import { User } from '../users/user.entity';
import { GetEstimateDTO } from './dto/get-estimate.dto';

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

  async changeApproval(reportId: string, approved: boolean): Promise<Report> {
    const report = await this.reportsRepository.findOne(reportId);

    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;

    return this.reportsRepository.save(report);
  }

  async getEstimate(data: GetEstimateDTO): Promise<number> {
    const { make, model, lat, lng, mileage, year } = data;
    return await this.reportsRepository
      .createQueryBuilder('report')
      .select('AVG(price)', 'price')
      .where('make = :make', { make: make.toLowerCase() })
      .andWhere('model = :model', { model: model.toLowerCase() })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
