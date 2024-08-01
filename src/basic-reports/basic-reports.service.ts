import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  private logger = new Logger();

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  hello() {
    const docDefinition = getHelloWorldReport({ name: 'Angel Chavez' });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
