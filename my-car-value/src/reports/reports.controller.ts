import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../users/user.entity';
import { CreateReportDTO } from './dto/create-report.dto';
import { ReportDTO } from './dto/report.dto';
import { Report } from './report.entity';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDTO)
  async createReport(@Body() data: CreateReportDTO, @CurrentUser() user: User): Promise<Report> {
    return this.reportsService.create(data, user);
  }
}
