import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Bold.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  private logger = new Logger();

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  hello() {
    const printer = new PdfPrinter(fonts);
    const docDefinition: TDocumentDefinitions = {
      content: ['Hello World'],
    };
    const doc = printer.createPdfKitDocument(docDefinition);

    return doc;
  }
}
