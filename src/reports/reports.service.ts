import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TenantService } from 'src/tenant/tenant/tenant.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report)
    private readonly reportModel: typeof Report,
    private readonly tenantService: TenantService,
  ) {}

  create(createReportDto: CreateReportDto) {
    return this.reportModel.create({
      ...createReportDto,
      account_id: this.tenantService.tenant.id,
    });
  }

  findAll() {
    return this.reportModel.findAll({
      where: {
        account_id: this.tenantService.tenant.id,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  async update(id: string, updateReportDto: UpdateReportDto) {
    const report = await this.reportModel.findByPk(id, { rejectOnEmpty: true });
    return report.update(updateReportDto);
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
