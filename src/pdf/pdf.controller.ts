import { Body, Controller, Post, Res } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { Response } from 'express';
import { PdfDto } from './pdf.dto';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('generate')
  async generatePdf(@Body() pdfDto: PdfDto, @Res() res: Response) {
    try {
      const pdfBuffer = await this.pdfService.generatePdf(pdfDto);
      
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="generated-pdf.pdf"`,
        'Content-Length': pdfBuffer.length,
      });
      
      res.send(pdfBuffer);
    } catch (error) {
      res.status(500).json({
        message: 'Error generating PDF',
        error: error.message,
      });
    }
  }
}
