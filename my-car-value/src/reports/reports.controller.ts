import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../users/user.entity';
import { CreateReportDTO } from './dto/create-report.dto';
import { ReportDTO } from './dto/report.dto';
import { Report } from './report.entity';
import { ReportsService } from './reports.service';
import { ApproveReportDTO } from './dto/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDTO } from './dto/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDTO)
  async createReport(
    @Body() data: CreateReportDTO,
    @CurrentUser() user: User,
  ): Promise<Report> {
    return this.reportsService.create(data, user);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  async approveReport(
    @Param('id') reportId: string,
    @Body() data: ApproveReportDTO,
  ): Promise<Report> {
    return this.reportsService.changeApproval(reportId, data.approve);
  }

  @Get()
  async getEstimate(@Query() query: GetEstimateDTO): Promise<number> {
    return await this.reportsService.getEstimate(query);
  }
}
