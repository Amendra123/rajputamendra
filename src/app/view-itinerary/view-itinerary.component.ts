import { Component } from '@angular/core';
import { RootPageService } from '../pages/root-page.service';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view-itinerary',
  templateUrl: './view-itinerary.component.html',
  styleUrls: ['./view-itinerary.component.scss']
})


export class ViewItineraryComponent {
  listData: any = [];
  randomNumber!: number;
  slider: any = [];
  constructor(private rootService: RootPageService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.randomNumber = Math.floor(100000 + Math.random() * 900000);
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Router Parameter ID:', id);
      // Use the 'id' parameter in your component logic
      this.rootService.getPackageListData(id, "", 50).subscribe((res: any) => {
        console.log(res);
        if (res && res.status == 200) {
          this.listData = res.response;
          if (this.listData && this.listData[0]?.slider != "") {
            let str = this.listData[0]?.slider;
            let substr = 'upload';
            let substrNull = 'null';
            //console.log(str1,res.slider1);
            if (res.slider != "" && str.includes(substr)) {
              if (str.includes(substrNull) != null) {
                this.slider.push(res.slider);
              } else {
                this.slider.push([]);
              }
            }
            else {
              let url = this.listData[0]?.slider.split('/');
              this.slider.push(url[0] + "//" + url[2] + "/upload/" + url[3]);
            }
          }
          console.log(this.slider);
        } else {
          this.listData = [];
        }
      })
    });

  }
  removeHtmlTags(input: any) {
    if (input && input.length > 0) {
      return input.replace(/<[^>]*>/g, '');
    } else {
      return '';
    }

  }
  getCommaSeprator(data: any) {
    let event: any = [];
    data && data.event != "" && data.event != null ? event.push(data.event) : "";
    data && data.event1 != "" && data.event1 != null ? event.push(data.event1) : "";
    data && data.event2 != "" && data.event2 != null ? event.push(data.event2) : "";
    data && data.event3 != "" && data.event3 != null ? event.push(data.event3) : "";
    data && data.event4 != "" && data.event4 != null ? event.push(data.event4) : "";
    data && data.event5 != "" && data.event5 != null ? event.push(data.event5) : "";
    data && data.event6 != "" && data.event6 != null ? event.push(data.event6) : "";
    data && data.event7 != "" && data.event7 != null ? event.push(data.event7) : "";
    data && data.event9 != "" && data.event9 != null ? event.push(data.event9) : "";
    data && data.event10 != "" && data.event10 != null ? event.push(data.event10) : "";
    //console.log(event)
    return event && event.length > 0 ? event.join(" , ") : "";
    //total:event && event.length > 0?event.length:""}
  }
  getCommaSepratorNew(data: any) {
    let event: any = [];
    data && data.event != "" && data.event != null ? event.push(data.event) : "";
    data && data.event1 != "" && data.event1 != null ? event.push(data.event1) : "";
    data && data.event2 != "" && data.event2 != null ? event.push(data.event2) : "";
    data && data.event3 != "" && data.event3 != null ? event.push(data.event3) : "";
    data && data.event4 != "" && data.event4 != null ? event.push(data.event4) : "";
    data && data.event5 != "" && data.event5 != null ? event.push(data.event5) : "";
    data && data.event6 != "" && data.event6 != null ? event.push(data.event6) : "";
    data && data.event7 != "" && data.event7 != null ? event.push(data.event7) : "";
    data && data.event9 != "" && data.event9 != null ? event.push(data.event9) : "";
    data && data.event10 != "" && data.event10 != null ? event.push(data.event10) : "";
    // console.log(event)
    return event && event.length > 0 ? event.length : "";
    //total:event && event.length > 0?event.length:""}
  }
  async generatePDF() {
    
    const data = document.getElementById('pdfTable');
    if (data) {
      const canvas = await html2canvas(data, { imageTimeout: 15000 });
      const pdf = new jsPDF('p', 'pt', 'a4');

      await this.addImagesToPDF(pdf, canvas);

      // Save the PDF
      pdf.save('download.pdf');
    }
  }

  private async addImagesToPDF(pdf: jsPDF, canvas: HTMLCanvasElement) {
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;
    const pageHeight = (contentWidth / 592.28) * 841.89;
    let leftHeight = contentHeight;
    let position = 0;
    const imgWidth = 600;
    const imgHeight = (592.28 / contentWidth) * contentHeight;
    const pageData = canvas.toDataURL('image/jpeg', 1.0);

    // Add new page and split content if necessary
    if (leftHeight < pageHeight) {
      pdf.addImage(pageData, 'JPEG', -50, -50, imgWidth, imgHeight);
    } else {
      while (leftHeight > 0) {
        pdf.addImage(pageData, 'JPEG', -10, position, imgWidth, imgHeight);
        leftHeight -= pageHeight;
        position -= 841.89;
        // Avoid adding an empty page at the end
        if (leftHeight > 0) {
          pdf.addPage();
        }
      }
    }
  }
  // async convertPNGtoJPEG(pngDataURL: string): Promise<string> {
  //   // Load PNG image
  //   const image = await loadImage(pngDataURL);

  //   // Create a canvas
  //   const canvas = createCanvas(image.width, image.height);
  //   const ctx = canvas.getContext('2d');

  //   // Draw PNG image onto the canvas
  //   ctx.drawImage(image, 0, 0);

  //   // Convert canvas to JPEG data URL
  //   const jpegDataURL = canvas.toDataURL('image/jpeg', 1.0);

  //   return jpegDataURL;
  // }
}