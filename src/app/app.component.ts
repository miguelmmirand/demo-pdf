import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface Juegos {
  id: Number
  name: string
  platform: string
  reference: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proyect_PDF';
  constructor() {
    this.downloadPDF();
  }
  public downloadPDF() {
    // Extraemos el
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }

  listajuegos: Juegos[] = [
    {
      id: 1,
      name: "Animal Crossing",
      platform: "Nintendo Switch",
      reference: "1-770-736-8031"
    },
    {
      id: 2,
      name: "The Legend of Zelda: Ocarina of Time CV",
      platform: "Wii U",
      reference: "1-770-736-2323"
    },
    {
      id: 3,
      name: "Metal Gear Solid",
      platform: "Playstation (PSX)",
      reference: "1-4564-736-334"
    },
    {
      id: 4,
      name: "ShenMue",
      platform: "Sega Dreamcast",
      reference: "3-770-736-4532"
    },
    {
      id: 5,
      name: "Rise of the Tomb Raider",
      platform: "Playstation 4",
      reference: "1-324-736-3245"
    },
    {
      id: 6,
      name: "Resident Evil 2",
      platform: "Playstation",
      reference: "1-123-3336-4321"
    }
  ]
}
