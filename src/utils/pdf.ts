import PDFDocument = require('pdfkit');
import fs = require('fs');
import axios from 'axios';
import { promisify } from 'util';
import { writeFile } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Gerador } from '../external/GeradoresApi';
import { formatToCurrency } from './formatter';
const writeFileAsync = promisify(writeFile);

export type PdfCreateProps = {
  items: Gerador[];
  title: string;
  text: string;
}

const downloadImage = async (url: string): Promise<string> => {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(response.data, 'binary');
  const fileName = `${uuidv4()}-image.jpg`;
  await writeFileAsync(fileName, buffer);
  return fileName;
};

export const createPdfSimulation = async (content: PdfCreateProps): Promise<void> => {
  const { items, title, text } = content;

  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const stream = fs.createWriteStream(`public/simulation-${uuidv4()}-simulation.pdf`);
  doc.pipe(stream);

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const margin = 50;
  const contentWidth = pageWidth - 2 * margin;

  doc.fontSize(24).text(title, { align: 'center', width: contentWidth });

  doc.moveDown(1.5);

  doc.fontSize(12).text(text, { align: 'center', width: contentWidth });

  doc.moveDown(1.5);

  for (const item of items) {

    const boxMargin = 10;
    const boxWidth = contentWidth;
    const boxHeight = 150;

    if (doc.y + boxHeight + boxMargin > pageHeight - margin) {
      doc.addPage();
    }

    const boxX = (pageWidth - boxWidth) / 2;
    const boxY = doc.y;
    doc.rect(boxX, boxY, boxWidth, boxHeight).stroke();

    const textX = boxX + boxMargin;
    const textY = boxY + boxMargin;

    const { name, price, power, panels } = item;
    const priceFormatted = formatToCurrency(parseFloat(price as string));

    doc.fontSize(14)
      .text(`Nome: ${name}`, textX, textY, { align: 'left', width: boxWidth - 2 * boxMargin })
      .text(`Preço: ${priceFormatted}`, textX, textY + 20, { align: 'left', width: boxWidth - 2 * boxMargin })
      .text(`Potência: ${power}`, textX, textY + 40, { align: 'left', width: boxWidth - 2 * boxMargin })
      .text(`Paineis: ${panels}`, textX, textY + 60, { align: 'left', width: boxWidth - 2 * boxMargin });

    if (item.image) {
      const imageWidth = 120;
      const imageHeight = 120;
      const imageX = boxX + boxWidth - imageWidth - boxMargin;
      const imageY = boxY + (boxHeight - imageHeight);

      try {
        const imagePath = await downloadImage(item.image);
        doc.image(imagePath, imageX, imageY, { width: imageWidth, height: imageHeight });
        fs.unlinkSync(imagePath);
      } catch (error) {
        doc
          .fontSize(12)
          .fillColor('red')
          .text('Error loading image', boxX + boxMargin, imageY,
            { align: 'center', width: boxWidth - 2 * boxMargin });
      }
    }

    doc.moveDown(5);
  }

  doc.end();

  stream.on('finish', () => {
    console.log('PDF created successfully');
  });
};
