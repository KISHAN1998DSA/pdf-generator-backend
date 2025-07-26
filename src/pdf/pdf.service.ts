import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PdfDto } from './pdf.dto';
import * as path from 'path';

@Injectable()
export class PdfService {
  async generatePdf(pdfDto: PdfDto): Promise<Buffer> {
    // Define fonts with absolute paths
    const fonts = {
      Roboto: {
        normal: path.resolve(process.cwd(), 'node_modules/pdfmake/fonts/Roboto/Roboto-Regular.ttf'),
        bold: path.resolve(process.cwd(), 'node_modules/pdfmake/fonts/Roboto/Roboto-Medium.ttf'),
        italics: path.resolve(process.cwd(), 'node_modules/pdfmake/fonts/Roboto/Roboto-Italic.ttf'),
        bolditalics: path.resolve(process.cwd(), 'node_modules/pdfmake/fonts/Roboto/Roboto-MediumItalic.ttf'),
      },
    };

    // Create PDF printer
    const printer = new PdfPrinter(fonts);

    // Define document content
    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          text: pdfDto.title,
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          text: pdfDto.content,
          fontSize: 12,
          margin: [0, 20, 0, 20],
        },
      ],
      footer: {
        text: `Generated on ${new Date().toLocaleString()}`,
        alignment: 'center',
        fontSize: 8,
      },
    };

    // Create PDF document
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    
    return new Promise((resolve, reject) => {
      try {
        const chunks: Uint8Array[] = [];
        pdfDoc.on('data', (chunk) => chunks.push(chunk));
        pdfDoc.on('end', () => {
          const result = Buffer.concat(chunks);
          resolve(result);
        });
        pdfDoc.on('error', reject);
        pdfDoc.end();
      } catch (error) {
        reject(error);
      }
    });
  }
}
