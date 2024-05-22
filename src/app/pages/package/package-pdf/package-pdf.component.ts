import { Component, ElementRef, ViewChild } from '@angular/core';
// import jsPDF from 'jspdf';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { saveAs } from 'file-saver';
// Assign the vfs_fonts to pdfmake

import { RootPageService } from '../../root-page.service';
import { ActivatedRoute } from '@angular/router';
// import { loadImage, createCanvas } from 'canvas';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-package-pdf',
  templateUrl: './package-pdf.component.html',
  styleUrls: ['./package-pdf.component.scss'],
  providers: [RootPageService]
})
export class PackagePdfComponent {
  listData: any = [];
  randomNumber!: number;
  slider: any = [];
  constructor(private rootService: RootPageService, private route: ActivatedRoute) {
   //pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
  // Function to convert image to base64
 async convertImageToBase64(url:any) {
  try {
      // Fetch the image data as a Blob
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a FileReader object
      const reader = new FileReader();

      // Define a Promise to handle the FileReader onload event
      const readerPromise = new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
      });

      // Read the Blob data as base64
      reader.readAsDataURL(blob);

      // Wait for the FileReader to finish reading the Blob data
      const base64Data = await readerPromise;
      return base64Data;
  } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
  }
}

// Usage example:

 async export() {
    
    // this.convertImageToBase64(imageUrl)
    //   .then(base64Data => {
    //       console.log(base64Data); // This will log the base64 encoded data to the console
    //   })
    //   .catch(error => {
    //       console.error('Error converting image to base64:', error);
    //   });
    //   return;
    const dd:any = {
      content: [
          {text:'ABC Tour',fontSize: 20, bold: true, margin: [0, 0, 0, 15],color:'blue'},
        {
          alignment: 'justify',
          columns: [
            {
              text: [{text:'4N/5D',fontSize:15,color:'#1a4e9d',bold:true},{text:'\n₹ 21000',fontSize:25,color:'red'},{text:'\nPer Person on twin sharing',fontSize:15,color:'red'}],
            },
            {
                stack:[{
                              image: 'headerImg',
                              width: 100,
                              alignment:'center'
                            },
                   {text:[{text:'Booking Id: 547036\n',fontSize:15,color:'black',margin: [0, 15, 0, 15],alignment:'center'},{text:'ABC Pvt Ltd.',fontSize:15,color:'black',alignment:'center'}]}
              ]
              }
          ]
        },
        {text:'Package Overview',fontSize:20,bold:true,color:'#1a4e9d',margin: [0, 15, 0, 15]},
    
          {
          style: 'tableExample',
          color: '#444',
          table: {
            headerRows: 1,
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [{text: 'Inclusion', style: 'tableHeader'}, {text: 'Exclusion', style: 'tableHeader'}],
              ['☆ Accommodation for 3 Nights on double or triple sharing basis (as per requirement)\n☆ Transportation for 4 Days (as per group size) \n☆ Meal – (veg) Breakfast and Dinner (in Hotels and Houseboat only)  \n☆ Sight Seeing As per Itinerary ',
    '☆ Accommodation for 3 Nights on double or triple sharing basis (as per requirement)\n☆ Transportation for 4 Days (as per group size) \n☆ Meal – (veg) Breakfast and Dinner (in Hotels and Houseboat only)  \n☆ Sight Seeing As per Itinerary ',
                
              ]
            ]
          },
          layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex == 0) ? '#CCCCCC' : null;
            }
          },
        },
      
    {text:'Day Wise Itinerary',fontSize:20,bold:true,color:'#1a4e9d',margin: [0, 15, 0, 15]},
      {
          style: 'tableExample1',
          
          table: {
            headerRows: 1,
            widths:'100%',
            backgroundColor:"#1a4e9d",
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [{text: 'Day 1', style: 'tableHeader1',alignment:'center',color:'#fff',border: [false, false, false, false]}],
            
            ],
            
          },
          layout: {
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex % 2 === 0) ? '#1a4e9d' : null;
            }
          }
        },
        {
          style: 'tableExample1',
          
          table: {
            headerRows: 1,
            widths:'100%',
              
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [{image:'headerImg',width: 100,alignment:'center',border: [false, false, false, false],margin:[0,20,0,0]}],
            
            ],
            
          },
          layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 1) ? '#CCCCCC' : null;
            }
          },
        },
          {
        
          margin:[0,10,0,0],
          float:'center',
          table: {
            headerRows: 1,
            widths:'100%',
                 alignment:'center', 
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [{text: 'Sightseeing ABC', style: 'tableHeader1',alignment:'center',color:'#000000',border: [false, false, false, false],fillColor:'#CCCCCC'}],
            
            ],
            
          },
        layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 1) ? '#CCCCCC' : null;
            }
          },
        
        },
        {text: 'Vehicle Model: INNOVA OR MARAZO', style: 'tableHeader1',alignment:'center',color:'#1a4e9d',border: [false, false, false, false],margin:[0,15,0,0],fontSize:18},
            {text: 'Category: SUV/MUV', style: 'tableHeader1',alignment:'center',color:'#000',border: [false, false, false, false],margin:[0,0,0,0],fontSize:18},
            {text: [{text:'Facilities: ', style: 'tableHeader1',alignment:'center',color:'#1a4e9d',border: [false, false, false, false],margin:[0,0,0,0],fontSize:18},{text:'4+1 Seater | 4 Luggage Bags | AC | First Aid', style: 'tableHeader1',alignment:'center',color:'#CCCCCC',border: [false, false, false, false],margin:[0,0,0,0],fontSize:18}]},
       
       {
           alignment: 'justify',
           columns:[{
        
          margin:[0,10,0,0],
          float:'center',
          table: {
            headerRows: 1,
            widths:'100%',
                 alignment:'center', 
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [{image:'data:image/jpeg;base64,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',width: 100,alignment:'center',border: [false, false, false, false]}],
            
            ],
            
          },
        layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 1) ? '#CCCCCC' : null;
            }
          },
        
        },
        {
        
          margin:[0,10,0,0],
          float:'center',
          table: {
            headerRows: 1,
            widths:'100%',
                 alignment:'center', 
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [{image:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAUFBQUFBQYGBgYICQgJCAwLCgoLDBINDg0ODRIbERQRERQRGxgdGBYYHRgrIh4eIisyKigqMjw2NjxMSExkZIYBBQUFBQUFBgYGBggJCAkIDAsKCgsMEg0ODQ4NEhsRFBERFBEbGB0YFhgdGCsiHh4iKzIqKCoyPDY2PExITGRkhv/CABEIARsBHgMBIgACEQEDEQH/xAA1AAACAgMBAQEAAAAAAAAAAAAFBgQHAgMIAQAJAQACAwEBAAAAAAAAAAAAAAACAwABBAUG/9oADAMBAAIQAxAAAAA19lko8fNmUkb6TrqsPtmZDOMRvdiKpXW3ICaRtm7KTzz61bU6JUgRMo709q239WSrmmcnwLB9PKQmitI8xy+vrlLrMAhTSk1PQmJrVXBRk24y3Zgbgiu1wJnjmGv3PDZK89y+lac92yxKxZQ7UlSYhrDJaEamT+ekmGWDi74hCxlmbio6bddDojNo14kF5ri7CHKtLeS82tBO1tYnJ6YZiXS+lAOtbIrnQhlmCiT8yqcXGGWR2pJ/LuN5aNsrbnryusssfrGXGw8YMZmCy3L2y925Q1RolRlu05aAtWfnI8qS0rm59srQhv3FBGvKz7Bcwx5Ftan7Ow6iEwVm9Eas7ATlslmSJGSrGIhNq67+lYYejIYlPyR9zUj91P0/bbrHYMlWO3bGyIXjdN2Wmk4pGKLIEIgGo9n2iRUnTYRwh6E+lZ9bnDyMKRK4/tGqLSzOm5RZDFaQRgKJ2TJhS4IDKf8ACdV4m/MHSAaGGFLDa58MbLz1KdI05r8mQtsG7iG6JESYzPSEE3DExAosIEt0wTnIxnkTbY3xro71y7owprKWnuldlmrcNqd9YsjZVhMDvrGpPkstPVV/lW64FdbCFwz2mRWHNo1J1NMQiVE9zFcjcZTS3kN9CTF2UeWsfULwNDwr6JVVG2y99VF3T5V0M2GZMoHvNb5VAsAFt2Jh4m/KgUv7IUZWNEwqG5IxkKN2NatPRA7huzzNHQDulJ8qGczwFsMSTDh1R2nSo7B+Kaqz0FtPb1vWPT2gSHb5W4Jql7p9hGkzd1hBynYXVYarRBtpcxaI1iug3iJLgWXZRg6Dnd31l+fuOzT6jDJbUCQE6ILIj5wtvM4D64uf0BtiiGl+fVGnxhCzsJeMXWORX2Gtw2EWog/s1kytWFp8oA2vVw8wOLgvwY9oyIL+rQpk2vo9lgdvhATGoZC6HlQ4lkS+WJJVxGLmCvV82Xnq2AV4PlfKfI1mmOt5vlfUOpwAw9Ti4xpUcAtbTvjEpS3eSSseLYYIEBaVGfg3tC6SVps57VemebAHtVb3FcW+lWA4TfTdAOjfR+NDKLrU2bRa8GrXbLrMfDMVMoTPXn77zurRIHUYOJiF52tueaff0XP6T4svRZ3Bo26ORotWN9pNADEBywTOtyXPnQSnK2iaMbta0hrSmgaoQkg6uXf9qcpvydVvlucOnzKaNO10HOMUU+FOV1ueurvTa7+qu6h6x54rCTD9TwdoIomdO4ozdr52mQWAu1WMF2w/5WKNxIK9nPquJQ9nRdSUxe9EuPoElRN64dRgYnMjdoOtmeovU+cMi9UDkscLcpfqnB0KM6v1L+dljpzop6cFXPqdc+DqGUdlqvZznHm/qngDSm+dgXPhNS60ueg/QgKNCiB1CvOiugFXePzqGwP1iHhNAuO7YvYI5WNBja+e2fYlcGQS2qN5V+pqeLxjej5JP3W08vYA625F6MUdqKM+lMGjqarYA/r84xd1BO2HfIJoNuACbyB2zxO8V2PNjeU62rLzUUlZQ8pJO2D7dl9gXyrM+hvZb0xJ7RqQTnCp2hc6etaGrf1yUh7M6evHg/quOXyGwuL0XPSWB5Wnm1AYEtZ5LZz21VkROf8AoxDV/rLk7rlBKXIXYHJfTxA4+3T5Ts4PSNfuhAiWTrzJiHqt11Fe0FjhizTty0bZbewrBvSk5KFbHL1eY/GEtJafGglRcPfZcQVH3asT7fQLag8Pp0X1LyzddpPU6p7KsladVtiHWl1Lxx0rVjaNsaod2XZkc8yNEzY7CqIBq5MMA1hUnXdCHsqHDpPbR80Z2LNlrRu64L1VpkRtMhpP26PjGjdBuzrrl/ddVNem5YfV6xIba1aXnXPD6Kyda3mw4wm3jRTFS7Ci37V1ZfNZiM+lUIA3TXlc9K6swXGxubuskOf65uVYGVLVAjqdDrBT6Q6b0J/PLtvhzqBZkptxcrGMO2uVOh6u6KPz54Ibrre9aXkrLo4cI2q526lg1IU6sqW16/zW20Yz20l3JIiyaxYvrOnLNdZKXCBjOfQoH/TGjMl5BPsmiV+jX519HtCioAD4S6G6fovmYw7wsH8wemrqmLJrfoeiq/qqr6IsUzuDhLqqrpZHjTZOnqX011dPrbVluL0OI6mGF2bpPmViQwauGuiBrFN/Obsu2NSPD0ROt1CC2NDpytYGsl1r7H9U2RA3xLqb9o9kmZR/pJPsXKTyUPkSZ7ImchH2H7dSsoeyTbp1QrEyQi7xc66hmD82YA+qKc74DQbFMy8u5XQ/LXpkISoH1y2fU1nqf//EADoQAAEEAgEEAAMECQIGAwAAAAIBAwQFAAYRBxITIRQiMRUjQWEIEBYkJTIzUVIXQjQ1Q1NicSZEVP/aAAgBAQABDADtzjOEX64oqmducZ2IucZXtITgqv0tHVKN2rxl2Pe5zjcdVebXjFZU4DoinqTDNyMnKZ522Zj0UxJEFz9nZCze8iioQqiKi8pEmSK+UzLjlw7Dmx7WA3Mj/wAjgKvrtXNwjEUI3meUfjXDshhhlhpybKTV7OY0kiY8yTs5wKjsiQ4w/EWgjAsFbfPuPSYEa2F18k7giNRwJ5UEcdaVuFOeTjupXCkApkSDkrxyo4SIZJ4dlkvN63aE2vYVTLmPapYyXEElWRIRuO62jhNGhEDLpCWNtSO/xkyfl1z7QhtSWwrzkKmcZxiYofiOKmImIiKuVwe0y24QMsGlMlytgeR5tFxKZBYntiColhUs10CIRChZdBFftJioyPZT2AU5PC5Ejy2mJKIatknAquaxd/ZM3xvL+6mhJxxlo23IaUHmhMYslNXvkVVVIFlcDAZYjRUR6WZMwG3pUl/vc2CnsJNaF1KFGs6XH+62IZHlKSSR9cmfdBnJyK5rrpk3JbRFVGIQDH8jRr5NpDmjsOezimd8dOfJFycl4WIrIkvY4+4QJ2riS0KKnzcrTWQtwh+8UTTETE/UnOKKF/74VPS42K5E+QUXLEu5vnHg7zLNeqDkvg4pI209Z6+KKh28IMvH4dvDaGukMP5YgrdpMVcVR/D2nKfTGJHkTxkvzIqEnC/TRb1ibH+yZyorti1HVC7PpfwQnVrrRfzadtTL1JIelIQPVLEmQ+3Y2ECQeTZUifGdiuVslQ06ZMqHbNhI5m5Ry1emSQJVTIVy8+D7fwjC5TTViuvCDEZwisbMUTtjxBTYZ1k9QzkcSMgUsh5uA+g9vY7LlD8F2vKKPvTPEfc+aYwqfCAfvIvLrTa8ki+v1JiZxiJnCL6XGwTn64Pyjk4vkXGWkMu4vo1GdsIT0cCMBibDYMfuYw4TKM2DslOXokN0rR5uRJ5b9ii9hL65RUD8FxC4XBf7k9ZGlyYr7T7JKDlXZMXFa1MZREWeyhsek91muDDmKS8k3WvqTQiWJk6peYupktllSbhSkjTRISRFchTW3nXIkmL4m6q38nlaeicrXX7ggPxdcoXtVYQ9fseZsUhgIDUFoGy5WYoNrHH1xLdHxuKo+wdNIbIimQjJY7QCqoiGi8LgrnrExF/Wi8Y2/wAIiF7SWqKGNiq8CmRTSOwqJlU7qkWwflW8oAf2BaV2tcdpHwJfQoiYaYhoPpfoqcouAvYuChEKEJ+tauipJ/c4SrGMAMEUeCF+CKxBMU4KA4oqiY0SEnOEvCFxjxoEl9U5RVkIgt+yVIpn8vtcYM+BQnPWwuKtPbIpiq1hqsVpV+s0u8oyqnqQKK2/3LgKqQWBRfdSnkjpyuR5siMqdhcjFs2H+BJewxXnEXExFznF/USdycLjICi/m652tKmahEhvTJUh2M0bu6RY7MEnWWgbMxxeceReUTH5LvlJBMkQpL//AHSyutTiP8PGqsogknpUVNMuFcD7JkHyQhywiLih4nV/tGeThMU0XnJB8SJSrzhOkiM+l5id/I+8U+wiXkky77nau2aD3mt1J2lZCdafQcd1lXHnAV8kBaAjd+GJ7hD1RtIwKsksg0LEcADykq8ZxkawfjcJz3BFnsSfQlwSEud2c4ctkCUCJe5l9l8e5o0JFXFJUwn1MOCzSAUimqmb0CjXkmGHPOGPC4SJhtwG1+ZlOea9P+gi4JwU/wDqjw3OABQRaJEjWL7bgOMtkh1cl6bWRJLzaA5Ib5940qiuAXKLkwv3mWnvgy+Rjju5joiGPJY9wiGRCWO/P8U2omiaKitQorZJ7VR86++MBzulgvfkkuIzWR+FfT2iYreKHvFHFRUXI1o+xwLnzjHmMSU5A0578YkOMPtvsl2uWAWE+YUtX2QcbV1ARHSFS5xM6fMoaTi4zqIygQMVFTHE55XDHJJKTy4KYDfONMouV8TyOgiJkBjxxGm8Nvn6pitKK42v195KJBlzOecHkmYi8FwygofskVXE4R1URCQlVHneU4TUY8qM+9GdAlLwyCf9Mu43FmeXylGd7ZNLbl8OCQ3MSntWDE3YR8eLFZwmcJtUXCTOSBe4VVFZlmqJySqrb/P44L2d6Z34J502TuZnrnUYEKtDnH2iD64Q4ae8+EcIlJUTAhlz+GNxP/WMsAn14yvlxIjrZm0RIPUGCA8DXPYXUKMv8tY5hb8K/Srwd6cX6VzaY+53ynzVMbv5ngjojLaIN7KBU4Rvlb+cpEQeJEeu5yE6om1mn3Mxk5qq+Ckmxz/X76GFsc1EXusRwtidXnmzTE2JOS/iaYkfFj/ljkb1jjGG1hgqY3IVMblYEpcCVyQ888OSW3HnCZbUGgNVzpgqrEsFXOohcVSFnkQkVFRFR6P6Um/aPfTCfNpF9cok938G8Swkfg2mDPlfgI4k6X/44k2X/dM+Ll/5JiSZa/8AUzzTPwdLCcXyvLgq74hVCVM73PkQVLPKfrhVTDL0fGVAI488grynwn5YsJP8cWGn+OfBp/hngTFZ94bKLjsdMdjp79Y5HT36wbGOhEivDjdpE/F4cbs4f/dTBs4X+a5Gnx3S4FVwOFRFRUVOmjiBCn51AcFacs7k5xHOPoqZJYbkoqgQi5IbIF7CThUbwWsFrBZxI+Ix+WDH/LBje/pji/PJ+iqLfLAfRMIFVA9KicEpL393Jiao4nCotJEeORMVt00R1o2WAfdlOC2D8RwlBLNEUGIi8+S3BMSprZAooXaYrWK1itYTGOsesdj8IXrPEimeR2faYxG549YEX8shRVTyYYud3CKvHSxCGqm8rnUzn9nJHaq4ovqvozwY75f7iwIqp7JVXBZ54TEY+mAzyuAyi4DCf2wGPyxIyf2wY35YEf2icZOA4k6cw8CibMBx+PF4IUFat5xE5cDhKx4VRFcHCq3SE1J5MhAJWEqJ5C8iyJRAJusIoMvipKfwcfElL3qSA22rNfscuLH+DhPGaChJzitpit4reG0ipj0fkTwGfmLIkflUyPH+nrGIqKv0yLE9OLnwvJr6zpyx2VEvOobaFQvJgxU/tnwn5YsbEY44xGcBnG2cBnG2fywWcRnEbzqHReaH9sMivkgD+6xFwBRATn6qP0VcIUEHshSAZvkkeMySJEcnOJFhxX3zp+l6OtgVqfgWr1uhqU7IUBnyCjhkqqiKNZvkoxFJkISyNtlNI4An1ZNt1t4UNsxNMVtFw2uRPGYvKr6yJE+nrGInCJ6yPF/LGGEEDwI4qirmiNcVMjN6a76d1Mbi/lixfyxyPxhM8LnjXADG2saawGsFvFFM4RMcBt1pxpwUIGtfrmQbbDy9pU8IU9K5jlXDROEVzHKyILEgkVzNR0uRdPN2hH4oVJWVtXGGLCYFoSE1VRabJ04zUpEXzk3kklbQeFyKXkAO0DIHSec71AUVIk+bEQSbkOMlA3m0YeRqZ2Ot0l1HvopvsAo4ocoaY/bVcWG54ZbRSo21bDHkKDLKS107ZR2RZUd+CUWWxHTCBAAsaHkCzSA4qHs3BtCrXBwIvr6YcfhMdZxxnHCEV9qiYDzSf7hz4yIw35HXREZe9RWDNuGyJLH6kk2+ysiGybFJLqb+Ck2ud723YjYpjrbY46+wHPLgJjDjMhSRtwCU2Fx1heceYVIklc6fIQazVPm/2pEjADaKSJhmLY/VEwO5U5JVwmwP8UXJBOsqqMmqY6yKEyKGKNumrQAid6iKn2OKntOl7SLSTlHJYuDDmK36OPp09/V2L6KYOZpkFvSddfuLYyQIFlS3M1Z0JpQfaFOMfH5MjJyB5pQ/wl7NpTuimmA36wm+ceZx5tU5yvjMzXpSPNIWRKeuIS7ozeXlbWx3KaW60DcXY6B6onFLjGMiG7SR2gMZDyAHSjZItPtAxvKpRXzaBHEJBy1mNiBdvGW5i8ar+OhN/wAUmphtY617yU3xDl50vbtp8LwGxxBGUjrQONlyD0yUhdjMYlUvjX1RXXCQWUdhkTR965Ll+MmCAF73m3UCQfYmOkpsq38okaoCmJL9101HtpJSYqIveKp60AfsfV1GSgeO7s2hrFhtRhkrCsnLFPGsAGBbT0mSPTeQ0+R3NL/5U/myLywaY2OI3zzjrOPsZTM8Sp2MNc9w5PEI4lI+GB9uzGBslUcFxhsYu7UxQYPibjuqdRLd+Jhz4qqqw5y2ddDkEvaVkgAh85OJpHD9qudOAQracvvhxvHW/eTR4hSs0KQ+musseVzxpJkiPaMh4Udly0Qk+MkYxIkF9ZTy5ImyWj+WU8mTu4kYVpTxx0zB9CA8mg0rwgvCCAtvnMEDJS0qxr6+heWTJbAt36gPLFeh1XIJ02tHLOBO1xfcp6eVdPCO1PitsVMU4cUGnCEjb98ZK5RvIKfdu5pi/wAMfTNi/pnjaYKY4OOt858W/CnPiyALjVtZfVUjJjVnPeQmXWYptXZzoMmubsJUaLG3vWjnVMI4TZqsIKqtnOwzmqsbR4cW91uGaSz88zWWEFe6Q8uSNQrjJVJx5c1ajj1Fu94e/h0ccH3k9P3GZlFsVLrWsA/ZSDRyN1YrJMvxv1s2LHR3ySZY+ZSBoQT0pqmOnGbJUcEFx0g8rzYo4YlFZcfJUdXlf5/MqqRNvShB9xsG3HXVQHj83cc0rEnFNgk5zWLpys2GisGzUS6n3sG+mWCRILMeHqe6WtHFabkOLKixnAdbbdbXkJi/dpkH+m7mnL/D382FeWzxv2mTrCBUsJJsZTUZqv2PX7l0mK60jPukmSwQZzhYJe/eQ20NxM2uwPZNipdVr2RSX1MvTo637MgPqNkzq9JGhk1JVSLo5bw2byTUsyCLL3ctYp5BxZ1giP1ttVXoOu18hHUrmkSzRUx0cdDJ7a/BSkVFRQ6fxtkrqiW2bjcvf9Pepwak1rTxwdarPhdepgkNC05alWwQfRmMr67iyC19bKmS4rMVsfE+KNGiiaCjzRNtAiISpHUEDvWXCkux1ZiKjSyFaaVYUNeRbLmU7xgr2kfGbbLZk19ejSDjzitvBHbXOnW4seFijnvL3y1+7RPxg/yPZqBcQnUy+LkDzZbk6HXbKyb4V2M9b7RbQ2bG7clTKrS39YrzvZ8JLCxE1cADLhFmj3TSVFwXEXksanxq6O7NluCEfSptZSQLfqHsJEky1u5VpKttqsfSxpDxxAbI1VdQmLV7VRzkPtXffioV/avkgjmkWEiJuUF90yUK9tEsuMeBEzcrSbEk0tRCeWM4lrXVyts11vLmtNsSf2Xal1Qmb2t0U26pYrlyXiV4pNZP8hdvgGVENmPJYVDCbQw9jhtg2oJlVo1TChuWGxSVEHzkI4HBCbaqrKtjxwtvMPlY0clU5bgxUSFH4V6CnKSC55QuBIC5wX/ifggP+SzsaKzsXJFJWnDjV9uEZUfV0EPWuqLJsJFtlceymlxp8Zx6K+26OqH2xHc2SXGixnn33Rba6vbHHCjgRmHgUNdlpF2WrtJ8PxxJTV7fynIjMdTgb/ui6FX1rkSs8zb06NLVuZGPyMNGHavK++oN63Gix6oF9ypqJGjx35CmuwSF+xHwE/UB1DcRPwr/ALywrg98dUa6XHkOxFkAa1qutrFnC2qZUOhIsG3RX08P1zZoKvQvi2R5kBarczo4NTojQ6fAI9Zj+R8wEBbgR+BRSW5sDfMWiNOI1kb1CJNsdjm/dS9lKxfrKmecWPbXOx3nj+JcbGJ2uEh9zZKMx0m2iNEPmTIcYcJpn72ZLEK1kxU++TAFQiN/3dcVAJVzTdUk7WMxqLNaYchdEr6N9w7MjGxK0a8Kef2fBgJXvdP7w21F2ho3RtaiXpMUZzerx2HdR62sQ4oBNYSULO1UG5tPxa5VfPqTAWWxSQI9Wb0m5mTGZhVViw+0/qmy29TfwJrTjvg6jR2LPX36og73NB2isk156cEafDfZMVdcDke/qYyJv1kke1cbcN9+Q2a8q6PmYNpcpXkNABV4Nt1WHGXkXhbyE3eXjbjjQLHkQqm3pRrxisgz0/lG+osOFy4+QiJGS8DdTIzkZ6K3JDy/sNFmzojyuEo0rZtE40xwg3rqQog955VvyLC3rnfGTpLutUkaWfwMoAZejzZT77rioECBQyXnmjlNRVeOhYNGRETLqJLYD7MSIPa2qmoI1Uo2h2DBxiNl6QJvAna2KImPnyJ50RQklMoi5IrLE33ZISBAFYslEASYPkZhz+QP4p1D36xdgwqhpoS752q7VqLRfalY+MfpVs7LLCU1eqla2e6XjT/wztvWsntfUKjtrSZagwR2EOcbchqYwopK6o7H8dJrICKqLo8+bXwrPaJ8YZZW2zpOszsoCPMJXXVvdROZrouDDIEnPmJco9wBoo/TWKMbBzZpwGaYZfIWavOgDqxui4yEnVWwdpiejSBcyhs6zVtx2t+1kgw09Z1uwa2/LgSPJGhMHsFPGmQHWQOk2qTAs7CFcOjHXVJMeZXPS2TbXN2tysJzdZFPnNDigN46aJ66tvtV2up9ly2Yw7lGp40CDDq2fDJblsl5PJNbIhOuIyJXmFXZK+HZ0shpg2UfNGD4JIpq5IhSDVZDjXCkbxtfIy5yrclQMVjvc9EYMg7F9EaNEfqpUiI8yIhymqT/ACumjkZFqqSTWxPh+5XU6iwi+FpzJolPTbEG6t5iQRKlnR67WvTbKsrmIcnqBCnydmkm1FkuAWt3DxKbUbxrU65dfHxXpdY6rEnU9wspcqwnRRZOnoZtZX19awyhN9RNRQ5Db1exGjSPgjpnTY5PviPgk5EX+V0flIOfXTZ1mJNvq5930il2oJfzaJB1CXqtDZTYHfZRJOs6yBhVsLBC5t2Ng2yzeYLyMdPpBf6ci73mI6E5EZqrJuNJV9u01GVJmHOYs+VqIYUcBwq+ewwayqWpF+ZPuIRytbiMw4MeaSp3yKGk2qlcq7BHnQ32ihVW6W1bAckONG2PP0xQH8EzhP7Yhr9eVxHS/AyzzOJ9HTxZMhfXmcwJksE4GU+ONWtm37Cwlpi3VsS/8wl59sWyfSznpn21bF6OymmmuWE+TLcbcmSVCzceStnr53cijzHjqRKqgCfiuWBgNPO95dz0SrVMC3UAdfM1Fpk1kyH720+Vi4knZvnYki+VtOwyNM9GImPtKKWVdscJ1f6d5G+Et5bSfywIFlYiiR5rrba6ghm0M6ZJeJiugV0R0IICAw9hbqej7EVk+Jkrd9U02DU1EJuVKGX1yjNcFBoH1QqKIpJaOm6+dlrlEyThpEYU9UmtvaNrMh9wAFJ8oYYjXWaNl1KmWULdLhsJTyPGo/2wuExcIvWeQfxLEJF+i5ynP1xFT++d6e/mzu9+izu/8sBV5/mzVefjZC85bH/C5+R3FRpnAPnLiR2VMwctZSuQ+EXK6Olo0BESdnUa/BmvSBGL04qNxmE9d6iXYqZGmx2IyC86Iqc+OUxkwU1TaA7jalj7yA3cyidaqV++VN/YXt+DeTKPX+oWwm6DT0Rlul1Ot16xoIi8y3epgus7xei64p4Uhrn5kVVZNZdQ26iqSuCbbbMNgQ76uC1S67VVyiJKSxAooMl1kVTqXVvptUqe8Qkr3cjp+8LnCJUTnjK/WQdaZV1oFOvpa6HXt/FQohPLpOmz46kc9+NJl6NdRPK4aCsabFWA+rJGJr3Imdyf2xCwF4zVj4kyly3c/hM/GT4bbxHeMuXSOFKTJpKkVMcIi7ux0gK01yztpEmQshs1UxcFCwxThcPhT+mGPCZAaW61GyXtUnRmSozbj8OQbLz1hOf9vTZLmaUFfoOixp1s94DueqbZEzZ1kZxlN1s3ra+enuvNunR1rFo7ZI6aieo2STaUR7/dF62ijFHAJZnabZr4vIpLYQ2a6I7ENtvrmiNbgwAigNukpOue0wuf7pgqPkbQ/aU82I+nhEwYYvY9AxCSIxcPLIjynikFHJXDWqu50eOUBxshY2TtG2dQP5VUk/DFMv7YhL/bBXn8M1peHpa5bl/CZ+NmvaGd6rljx9nylX62SokVOMVzgi94y9x9orzjTn3Q4+vaGKvtecdL5Vzpu20ccmHB5bpqfSZsQTjw1I5kB6HPfgPAQH1smPAuuQRL5G7GW0yTKEhNo55xU1ERzXXiC1YZReB1Ayjy7aGvrG5DjFnXyRJRJ9y1jMk8bwCFrujLzcB1ScUOsN8zdlTT2gPmHoSG4TNjZoxJl9NLEmkdrJCPCxoVMrxsSLl9uTb1jdeTHwcz4ht6LNOczIQvljyX4zaNoXytWivSWRnAphs0tk7yYjKIjavj/lnmT/NM8qf5JgPCi+jTNZPlyUvci5bn/C5uAXypiHlgfMGSmWBKsXDcVCLBe4CxXIznc2CZILkcX2uOL8q5oLqs9/vjKepneFyI3NDhymuba9rrGUAiHWp9Hbaq7fSIpEQonK48LjJG0QKOVThBa1pLjqBU9QLFg0+SU2253KJGrtzZtSNFlSEc9QzVTaJVVc2WAVzWxmlwr174b5mVV4L62leWO4hEr6TZ6V8nsRXa6kKfIYitGDz3+g+wL6dt4yi50F2FRIVtWFRzpJcwYbivyoIsNsUkou2EDroar0zkbg5ISI00y3t/Sb9jokaXOfiuN+DXTQ1abRxaugO6mtwaupF56s/R92dXTkPzq6Hm19Edyg1M1YaMT1pKGyu7yPSMh45X+hO1f/ug5I6C7Y8y40M2DzK6D7W812DNgYuvzH9p/Z1h1p2SXQHaxGWC2Nciv/o59QIcdXIpV0vLavn08x+BYxXY0lF985qmqWu53TFNWAivlpNtpFy1WyXGZB7FQlVyEHxm1Hoxl7IwxEFo3Jm19Db3aH4Mqdb1lcWx/o67xTxTnV/wtowQOMqbTqEJ6F022zeZ7LtRBVY+y/o/XNvaLOZ2OqafutI23U2AK6ioCJNckarMjD3cQ3u3xJkSQPb83vPsuQLKKjLau/YstHZBkLPE/WrKUjZD4m06S6nELZmJhzRfc6gbrN1JK4IEVmQ//rRsDa9jtTCRb/rPJn1UutkRobQ1Tr97ZxKmmgqbsBin0KihRHnEAeuMJJWjOPoPK1pf8audEKGLA1Fu1QBWTu/WbYKTbLGkroLDTdP1/rxr5bl/BJt+N1OsGNwk7SddFekad1fvtr2OBUJTQ2w6l7o7outrasRW5L8v9IS+Bleyjg89Eq/7W3yTav8AsNv2aztr/aJrc2WiUu8bbr0oJsK4nNvdfQi3Wl6btpMI1NZbceMGmwIzkGx0K0JGQIf2t35+bKpNR2GCx8QdzGvbyscjvQ47ZdFmkr9J2PYo8dHbDqJJmbikeS+8ZztJ6m7bo9gxJrp7psbFsE/cNhlXE8WWXesVnZaDqGl61rSOQ6/qrIdAKac2b7b9H1V2wdNOglvjLbqvL9n3q8L4zUmHhEuMjSl7Prk/qTRQ+5G3SdOR1BvrAiCqrDRJI7fZqhWNh4G/0d9bYrKC0twedecvdModilty7Bp43XujukSE4dYmFm8Rqau2y2g07Stw+jGg/s3UreWbXbYdSNztNl2+GsOJN+zt7ipb6JdgCe60/kkrnR/qjV08AddvXfA1ca1qm5RRKZDjSR6sdJntRqZNtWPnIrlLOgFT5rS2tzH1+kVcI7LragF9Ti+6zpXW2Nd012i4r4jr8+N0x38DNF1ucmVfQGztJaTtnUK2H1x2INil1FHRIH2T0o0qLqcCR1C2sARnYi2Dd7ydeWchpHKI3JnRKsRT73fjVH2Siiaj1Me0a3sH4sfz1r9b0q6jPIlXarU2vVLpVZ6c+lg/ENxitrwJ7tlMPq1qXVqlt61jUd7pVmw906RU+704FrVq2eTIEijsSrJkQ47lHLX7SlNmSqzS65Ak17T85uW29Lg6lVACy5MltGnqaD/wkESVy4mmnAkLYuvGXJuERrptcGpaHVx3k4W43HYbCXYThu7IUhbNsbkVgyvbbnotoZbZcleWYKcDYepGm6rP+zbayRqT/rV014/5sWR5kC/pElRDR6Npuj3uz3EynrmeV3TorsmuqL9QLlnE6XMdRq7bm2qyNYNRuqUuHB6e7E9M4UBP2mdFqhKzRYj5Dw51Pu/tzbLyWhIoTXSVr5BUi32/tem2iadR0s44sxjqz1HcV1D2iaqTdmv7p0EsrSVITS9Ie3a5ZF1VCv2Prb02kurSPavKsocbqX0vdFP/AIBJbHX73Xdr1DZ4NBVHAyE5d7jYsUNPBU5GyQ7WFOepPhTak1dS1HqK1JTYOPyZ8t/odJfvFUnbTSLmw1aTsLFc+cOLI8DbYMGTWaff7T+2lCUGS+Uz9IcKsdyiPCSfFQJ7sSwYMUVEvILs0fC2640IUj8hFVJJ93emIf55UyocWzgyJoOOR9u/SEpL/WrakqqmzjSnyRI7yJ6SvVtGIqOqaBTdfNN1uhYqKfW7UBtLebdWMqynPK5IRz3mideKTVtUqaSfUWUh6q36fR7VabBrhux24P6S9OkQUsaCcj4fpLaqamKUFui9TeqVrvoCwTSRa/yJzwqqmNdfdYg0QVsCmswKU+boEbi8nClw4lpWyZzTjkbqdvbO+bEzYRYzrEWOftzG3U7wy36j1tdoCa3rcWVGOpqYrYA6rIcvJHeYKOQp2dON5jaHY2iWUV+Q1S2zldtCWVY89Gcl9SNP2GK0u06x8RKi7J0mgm08Or2Ti7t1AnbgbMfxDFr9F6pXGiWUqEaI/XXG7dFLOY85L0O1Zk1XVrpxp9e69qenSWpt7sNvd3UmztZKyH6qtp5IszGxMsFQ7+VVeXu1S5JM787s78ZL98lrj5/u72Ri4YZTO7O/O/EPIZ8MlnfjB8Pyckn9ziu55cec+RETJJ8iKZ3+8+IRkS5+sF54zNw+eJBK+cZhMKQiIgCvCLJ4/HJ4+YPKPPf8R4JTD6L6J5efRY88qqnv0rwCnJEiZcPQpbQ9jqK89KcN7yqpY4+6bqOoqcg0j7SiKogU9q7UySUkVWxktOgBgSEHlT3nK5z+pn/ipOPr9w7jP9Fv9XK/qRfeRf6WcrjP9WRj6r2JiquIq44q9qY/9Bw1VBVcaTySAEvacIKDxkf3Yxuc7iVPriqvP1wFXnJvpHET6RiUorRKvu0mSgPtF1UTvM/mIiVVVfGi5KREcDG/5FyIq/Edn+2Z/wBA/wDdq7hkzJbIlUETP//EAEQQAAIBAgQEBAMFBgMECwAAAAECAwARBBIhMRNBUWEQInGxIDJSBRQwcoEjQmKRocEzktEkQ1OyFSVUY3SCosLS4eL/2gAIAQEADT8A/AFDbwzr71Gwq9K1iCLA+hrEyATp0J2df70RcGo2uOhHMHsacajmrDdTVqiIKGliQS8PRFJG7sdBQtw4Ih5QDuC51JqRDkiS36s3apEEgNtCTvULWKMNCxoh3Y2vYhrWpFzLZRSltWGwIqIFHj2YHk9CJrM31dqR4rFV1UnS4owKrEpdcxXnTYdsptozdqbDkksRbIedM6s1mAy6fh3ouvvTBGFF9az2A5jSnjKqs65gL+xony9u3hOQsn8Dcn8DoQRWMHDk6LfY/pUqDhJyA+tui0/+NOfmc8kTt0FRtlhw9vMIm3Z6zrUWKIYkkKsbtbbmSRRhbY0CuhPashFifm7WoQyWGbY1a1uRB5Ghh0YL+7tzo4PQAfKOZpYZAe+u9MqMxHp+IjBmc9uQoqBrIORpGLHK4riWI8R/UeEKkwud2QcvVatWUlTUUxgeYm5lEegUUuuGhUrkQfU192qVCpu6Deo5QrgMFta+9T8QC/msxN9B1oplNywNM+7ki1qyMRYE0YXuBF5v50RZgQDTYYKbKNBavuJ2FjQDAd+tCNQSD+Jk0CNlJ7X71D5MnAVmW3Ik71b5imRv0K0qhb8z60d/AbHwjYMjdxRusqfQ43Hhx3lRDsGY3v44tEY25OoIN6ScnQ/xVLLcBr5kDa600reXLt3Nar8hGnWlgfOgU3K9RTqGJOlidxRgjAO3KhgRm71d8tBFN9bk/iZakQKIhckjqQKUaoNGCncgH45rLOvs47iiLgjYg7GlJPjlPtXFNvUNWRNPeg7M3dTsprik+i/TRhkIPRPprJ7UsEZavuFgaMrgG21BRa1c1O1dD+GFVQzKDWdQSotcH4BXrTmzXPyn6hRH6EUgJwzE7rzSreNjQncD9WNcOK36D+9CUsO7HkaE2Zh3HKmjdtRs1vlqWylTyINZFTv5Ta9HCkZ/y1d+t97Vw9SSeR8fpNfSfgA2Ckmv6jx61da4ifAa9K/LQFgBSMGRuYIqSFWdRsD42NceS/8AmpoorE9hpQksOz9TSyi5B3bkaZmWQdXI0tSYh1I6Wa1Fn1/81cCQf1omQf8AqrhH3+H+ormOfghurWBtRN86pkJPcCuZXQePEWjInwDT4CQKVAPGxoyyf8xpoY9T6aUXC+gv81K9h/ED+9+lCTLvo1x836VFjbAgEg3N6Lt+6bHzUqOtwuxvehxSTppmNxRUgbN8XIirfFxV9qMq1yPiT8CsCQK/OK7yCu8ld3NF3JAPUmljUUCP3b3UmgxKjLQOlhyNF4zcgEaLyr9K/MK/OK03f8LMMwG5HMUT5EJzFR3Phxx7UJko105j8PX3q3WhbL3FBjkFbj151kX8K1Zj4+ldSPD7wPahKnj66Gr6j8EMw/rRjB0o2K69DRP8qOnoetIEUkAAkkX50x0JK1/EwrsSa7Mx+LK3tWdvf4MvgcV/ahLF716mvX8NZGuCOpowrr61oLHtRBvVrHTW1FOMmTS/DTY0LHIfMtXPlC6UwtYJ7UVZmZYsoy3svxZG9qzt7/Bl8PvR9qMkfv8AiwqEnAG8fJv0owJVzVrVlo4d0Kpv5ltemUDIhue5PSv+FC+ZrdGNc5HGdh6k1y1y0eaHKf5GvplGWiN1II8cje1Zm9/gy1evvR9q4ifiuhRl6g6EUihVF9gK9a9a4bHfoKyFM27ydQtAbJ8zd2Y1floo9TXJUGg/U7+DFluR59dr9BTC6Lmt8u5FE+URE0DqzLZv6VG4RgTfWsje1GRlCk/JruaXVl4Zt+hWsMFMkZuVKtsRfwtWavvLVnX4+pNKNXkNgD6Cm0YKbMDQbI6nRo2+lh4+oobgEG3jwX9qaSVET67tW4HTwPXTwd0jyjy+v870rmNRmvYL1NRyFC9MwI7AV99b+goYeXKe+WpVeVsKovIkKbyd6xUKzKiR5yidWqaBWu8RikeLkSOniHr7w1Zl+GMra/eh1FQ4xmxBVb+UxkA27GsSxeGUfJMjm9GATgE+cBuVqxqfd5Cdg+8bUKsfA4Zffx4D+1YfLJBinHkXW7pTDRlF7jtVjdiKJ2AtW4I1ormby5gKzqynkS296MueyHSw0vahdbelDGN7UVYfpakx+JSJt7xM5sL1JZFU6qEbe4G4rDWhjlHzSqB05KPHPX3k1nHw3SiKiCyFG2W2hbv6URdY1XL6FelJI74acMWLKvfoKZ0IJ+sHVTUsAz9mGh8AK+6jf18eA/tWd7oGNqA0AYgCh/3hrvIaO/nNFTGACAbjUGrA9CLb0IlUNqrdaugu3Q6XpsUxykgM2UWuBUgKvJfzFTUaHFYND/vov97F+ZdxUwspnBBWQnRKzMzMoyqSxvoPHiVxzWcfC6qSWFflNSJldcp1BrFTjDxcEEszn5Uua+zy9403eN/mt1NYhv2b5SDDMNi3Y7GoFMUyIdmFEdaPLNUmFN8xvsfHgSe1NI4hgj/xJD2FHT7w8iG3dlBqN0ydGVlvrXrvXVzSMHjZBZiRprWfMUBuTRvYgEH+RrQKo3J3saJu5zXKepGg9BVt6w+PiJPRWOR/6Gp8dnB/3kuRcud6Q2KSG7BBzRqdAynqGFx4cSuMaDDwLWDSG1z0XqaUXMQaz29D4cMVestYXGJipnm04USasR3IrHoyow3hiOhkpVvI5kN1NSwF0zaFilKPPEiNI6+oWktnUqUdb9VNfd2H9fEwPv6Usl57/I8IaxUdGqYMAzJdkYGwV6w+Gw6MFAdswt52P0kUWzOMlzrsydgd6DvHGHujFzqSSKLG/wBNmH9aZSLgWsF03orozNdfS+9cQF3L2yLbbqaXWWXmxoKKBDrWIcSG3IAbUkZJH5qDhMJKdiTrwfUUDWeuPWcVFDaEHYyNotO7pEZjdIVtdiqiwuaE6nCxQsM8QzWVwxIpkDEXvYkUI/CCIyyseSrrX2viZBhod5VhQ+SFB7mspaGO98oGiIPSm/aP3Zjekx0asf4ZPIal/aXGotsDWKiMD9wdRXAYf18PtOWUPi1ALQxRLc5AQRmNTu8RM5Mqu6fOAx+UisO8ziJToy31PqKnUtktdyDSYYxuz6hlB0qdLgILmx3FqEnEyume261DEzPDC1o4TbQF93euTEWuL8+leVdNBrT6ZuYWm1dvpoyWB62rY+hrDlM/5QbsP1FLGc4c3Zz1pf8ADAcKU9O/U0AMk8S52HZ6LA+VgSNOYrj0rDM7myip34xfdWUbVBiUDSMpQFSCua1QToQ8bhAiE3AbqCKmnEZ+iJE1I7uw2qfDJLC41DK+tZtqlAnm6BFPlX1JpYyUUm4jEhuQvS9Fb2v0o4dWFHHYbbf/ABBTQq6sAQTEGuVPeosQkg025EU+FLD0PhhP2kXp+9amilaSCwRl06dTUsskPDH7wY0iBc5NyABTArlt1FF44Dw1KlQ27X9zWFnytLBYSTyKLFi300r3jw0WkYPframDXUDQ0SAqMLagW0qQ+ZuUf/3Trdj9Io3b+db0Zwi50Lg3S/Knb9rkDK+TtSQRRQRyouYBFsS2m5NHlksackRS4IyM+ZddctOwZmQFJFogO+GlhJ8vVhUU7zxLh8OzKiBclmpR/hzqVbXlY9adIsJiVY6TRRtluR1TNWLmjjwuoBWcm6NWDEhuZRKAyNZ1RjrkvSsAVuLimgeJ7diCKVBlPodqKkUsRQj8pqKWOT/Iwaovs9Hd9y3E2C1wQt0UAq1tCDWFjmw0g7xtQFyTTqMyK1jkbvQkDsBoCqbCo0uU5ZjTZmJoymYxLvw4/XnUCSl2KABSi31qV5ZQd7mRy1ZOLGJkN2GwX1pRdpNr9rcrVkkLkfVTC7yuwz69BRYZlGpHqaCirGhiEL69UrjFiC5UBAPmJ2uOVA5nkaeyvGfkCgbEdedF4xL58wya5rDYNWKxMsKMNlYobZqVyPvUY4kJP51rG4uSaV9QBDGnk83SobHE4aVTneBhuCp+Y8jRjEUA0kESpoAzmoryo5IGq7g30I12qDDLiZ16TSiyr+gqBQsmUWkmzaFb9VFPH8pbzC3Ujeo4wRyfWimxFjoabUV9m/ZrYsKBofNYg0VP9angRYYnYcQqq5BpSHLiIhrlYcwaxIhfD31Ltbz5AKxWEcxSAEVhHMGIQmwlYalgaSQLh4XUBHS18wanma+Q3tl60bKxHIHeoMNYfqa+0ccYMVeLiCdSDnRq40k0gD3bhtsOwHIU7ZizSLcmiSWYyC5NRDiw+casnL9RXQkqKzaBQWJq30GiPoaopoixYW3SmGmYgrcHmOlSOkg/gdd8g6dKDswc2zHNqb1FinZSNbXWnmJKSjNcHkaxICTzQLlOW/LpXAhCyHd7DUqelBblH0278zUcgkkDFQCE1AN+RNTzZ2lZrhc+ii1RsGnLkeZrb0VIaKIW47nmT2FFABn9NTYfujlTKYx271up+k9a+0vsiaAyn6txarWPqKinMTukhRnKEgOaedpZGaTdn3JzVAgCTLqh/LUbY0DzELpIRQxgOYi2pFC8qRYhOIisdLaWuKxMStKHe0BlG5UXup7UzF3ZZAFRANhWOdGzK37hF1AqT7Qk0VzeNkY2YVhOHCZJB52cLc/F61+aj9MjL7Gu07/612mf/Wu2Jk/1ro07t7mhCTYyNvehh3Iu56Vwk1Y3O3h93arwe4pN2/sKhRmjjOwT/U1ijnCH9xNlXsBSnTvbeiL0ZgGH5tKLl19H1qBz+zBNrtzAFSH5HkZ1A7g1wyGA7CsbLiEj7CSY6ikgDTkIY5c/NnD21agNp5gvtepZ7jDSOTHG05zXt/DfSnLKxTvuDUccVydAAnlrEfa3CAjYZmQsTz29aWfLKxbMzWUbn8Xgf3r7u9CNfbwMBFXh9xSXLKdFjtuWp64ag9bAeAYgX5ihIpLAWsAd6NkJ6gi4oAO63tmWupCe5NLZZXlceUN2S96wX2fOY2f5BIXBd1WnmSQZ+QZBpS629KeNQANySKsIhY3cs5t/MmsMsSPcaZudJ9sM5AGvzHQVjyZwo/cXRQKDt4thszAksc/16bLTNYOIvIVPYmiLKYUURA9SlK9hilF437isoa4Ft/h4I96+7tWRfbw4RrNF7ijzU2B7NUJF02FgL6UVHwQfZ4nTqWhNcI5XQ2ax3Fc80rmsU/3iYkEsS+iRqOZtUJbDO2JUPdJdc6ItTwxMXjXKtQYCWWAcnlXZCe9RHhsPY199S2daDBgoNr2pvtwMGJBBRySFo4FCgA7m9Z28C63Ha+tcEIxHzv016U9givbIX5ajalYr5FJFxuL1c54H6N9QNZBb0+HhL71wWrKPDhms8XuKuauf+SrCj4y/ZziQdm3pw8cPFkJLlbqQAdmFJOYiG3F2sKjwzyfroopmDFWGYXXY1/CLCsQ3Dalb+WRitDFRG/Q5rUgZpGL2AWosWk17bqtIksTZx9RDUQX4UaZ1y/mq9jx7RD9CKhys6ZFApyRe2WzCkVhlPU865nvRRY8wHPvSsFQDkB8ORa4Rqw8ClZ4vermrH/lqw8bXr/o1vapJeNAdv267DtmqbEwo3FNmvC1mBoYN/eiRpQOqk0uJiP6ZwanLFehEoDUdsykKoHpT/Z2/6Uy9ajmuLd1oSlgd8qbWNZcybWU1CWQmRymn/uqcpGiOfKHPvbc1zC1ayrUUTNK5OpCigMwkdQAQdrVCt3lkW63Oy1NLwwUW2tr0rlGAS1iKfZFTMfU9BTxIOEAZCDQj1SE2f9FapHKESgrkKrc5vBhV05mmxhwyup8hapAQLtSDVY5irVFpJFILMPCfdm+SNF3duwp8Arh4wVUjYjWsSxaHXVJBqVBH8xTSAgILkSJosw9npIChjmYt7FaQb4R/P+iGkcqwa4II0IIOoIqCRTJiZTkhUqdr8zRRAkRvmulHRpoXLwE+tha9YcOpIO6ubi9Wq1ZzYk3Fr6GnS3lNrmlLCzPoBWARpQi7I5BUViCxZZGKhUWuzmp4jGxRy7gNU8gRM2gHViByFGWOIuF1lnlNqwuMhk/zHJRxj1j3ZmfmEQ2C1g1j886FnkLVDEXjMF2WY8l7GpImjSIkoqKe6jVqmcmWRZnJRFG4BWmnSOKGRyitmNmNwDtRst+M+masFDNipD/HM1S4uYRIkzqAqDIMoU87XqLXI8zuhtrZkcmsUVhl7q8Rkp2Cqqi7MzGwAHMmvtyG7uu+Ei//ABWIwISS/SRQwNLaSJs/mV1qJ5I0W1yuRM1qRHdI2JZJANXReQcbigRxMLK7PDInSx2rFyi+RAiJyH8qniXjTwmxawHkzdWqMsgkVyNGUNow1vpWIgAE+JBkkiTmvemwXsasNvDkoo/K7C3vQ5K1Y3EiLivzSCkiyKVcqFFW/wC0NWGm4SXbOWyDVqxkd1Vt4IK+zcYgw/8As8vnZXs8u1P9ntKnqBcUcVIaWQnC4k/IofdHop5J0IzjuHFBlEivq8N28IIBBGf4pNWqCAzydnc2FZ096xrSx4WJbZ24YyVn0JyUoUysZRndRutfZsdonvpJJbJ/JRWFX/q2D/iynQP/AGWp3vluWEaDRY07LX2awiY9ozkFAXJPICsXiLzYbYt/ElSLn4N1Ri/1hGqd7cfDf4eaih0eyi5pWWOLFhBKAF+QyCopOKkLv2tYGoH4ciE6rYU2AkUqdc1NI1wHsoUHQU2gAfOT+i0P3iK6IKAvrrtWF+z+NP3crnc1NLLKgjxcyKFY3UAKwA0orc/7bP8A/OsHNm8+vHnoRK5iVGcqrbXy1/4Z6xeGYo1iLqwqHHTpPM+iRBHK3esgzMigSo3daMsIxCSoywCP98kNRwjIB1Z9B4Y2RsS3dW0ShiRDH+SI2rOtlG5PICpIg80iBSxRVuT5gaz/AExf2Sraq8hy/qosKwpE2Ml2AUfuA9WrAylIWXhCI5NLoGYUeZEP9nqCBn4Zy6uy6N5SakiLyagCy6MeyrUUmSYuMuUjpf3oZpA51KAm6gHtViuGaX5ms9ojUEgAkQ69CbDUoOZq91Ja4YnmGo4qKFUUkCSMnzh1GjALSfZqCZF7nyFqMgXRuTaUhzAqxOY+lA2IIsfGLExSSpHbM6owYqM2mtqnwxhSaUw5EB7I5oIbVZA5SxYLfUrfS/SsPBkh4hgyl/qez1iZTJI3c8h2Gw8MJFkMsJiyN/ncVicfPLwJrEMsjlikgU1+/wDdnjZP5uy0veD+z1FKrR4ZTcs19Hc11FRYPgQsxiyghbA6NTuGY9WY3JqHGwyypHbOwjbMAt7DcVBhVhhiltnUk3f5SRWc1aph/tuKlyB5PqtkogNqOtMOWnoRU8AjKw5bkjZvORUc0j4Z72IVmuUcDQg8xSCwmgy+7EUmqLM6MvvUB/ZYZfdqd/2uDlN1AbaWM8gdmpj+3+7PCiOf89apxsYyO6r9VwzVO+d32DA7Begq9yGYnK45H4vLWQ1kHw8V/fwuntWdffxzLWceGYmiPLTyKD6UBbwQfzWg4v4WruaQHIwF1IO6nsa0DAna1DYDa3Sr/s/4GO6nsabyyp/f1FMLqw5j4dKyGsg+HO3v4XX2rOvv451rP8AzEfy+AM1ZBXaupPgRrQNMpuKZPMetjSMCo6X8P//EADIRAAICAQMCBQMCBQUBAAAAAAECABEDBBIhMUEQEyJRcQVhgRQyIEJSkcEjJDNyguH/2gAIAQIBAT8AleAiH0ytxjr1i0DR6ToYjb1inYT94E3ks0dSmtCfymyJpzuQg9QSInKQISBXZhAch/lHWXkscD+AdYD6Yp5jZ7JB8VbaYQCLEQ+YK5FTUab14nW+Cb+CJi3Ysj2GCkX0vmI4Cj9/4ExNu/q695R4nfxHgrkcGIe8cEgH014HwwtyFMqiCJVzGvLxVAAjiiJRlc+Ny/AEiFrAHgTLgJ7SuBBE6tB0j9V8D1m2V43A1zsPA1OICAQZ57+889/6pZE3H3juQLvpPOM80yoVhWVNsNiX6AZvhN+Fy/AnpNwmVuD1qua+YEHsx/M2JYsNz94+lyp1Q/jmFYwgWBZkUXCPQvxNsI/gqBuAD2m4ThyRV2pE213NwSjuPtGxY8oO5QT0uarGMeZ1HQGZNVjxqdlMwNV95gy+bjD1Uc+uHoJUYTzB5myjcGRVNMImZVNsoImo+o4cQvywfzNL9U/U6nHhGEAMTzuvoLnliBAr/wDkyiZs+8ABA+f8ywFBHzM+my58+RgKXdyxmr0ebHrXx1YZiUPuDMC+XiVfYRj652HyIIwhxZPN3gd5qsWZlXIgNAer7VMT78RB/dG+ia/UjenlUeRbzQ/Q9dpNVhzZTi2qTdMSele0qajqvwZkLgdYu4167ik8Dvtj+lWFH7R3INCModgxFlRxNViBXei8r+77xjeSHovyJYAJJ4AsxMyZSwXt3gX03GxZG0+1FJLEKABdkzS6TBpcQD4wzMLN8zNmGiVVxgUxNCYtR+pwsxFFTRjuMaFz0AmfUHNkVcSsCEY/2In+4KbmXgD8mb9QMi7MZ7m76f3n0ptUFfJrdWmTIzUEStmPbxtH+ZqMwKgA/JhN5QPYXXtCwTk9INWmJUCksa5+TMh02VtwDIx68cf2mbS5sS2VDKP5lNiYNNjy4WbK9bgQAJj0w0orqTd/iYXRrXkEHpMTri+nLtUWVPP3PBjMTkHxPqOMPhVh+9W9M0YOLJkQmw6WPlT/APZlUNgyFh6QJptEc+F828oFNWOpjH00O80eEbnLAWAAJpcebCQGyL5Ys0OSzMbJJM02YNhAsWOOsQgM5PHtMrWrf9agj/tMyZjl05xNdGaVV0ROZMgYsgHq5KjvUz5UyVZEwHGmYuAQ1RDehxjvRMyGip7A8zVrux9a6xQC+PnoZgwJqNO+Nz6WK9+Z5GrwFsZ4w2dq2DKszEjDNYdqANjpcFiVc2kTkS3J6mEvRtjMH/GIKgiqEWFVUIvsoEzp+5PxNwfTBm7dfkRcicAKbmFsmJy4IsAKJrdRlcJbdz0mm3FrJJhJYOK71cI5Mwvhwo+TMaAodLmt1WofIv6UqUCjcPufiYchyqwbHRWrYdDcAhEwj0CAQRHYEc94zd5kIow5lxI4Kmi7xaFkSySTczjdjP2ImlFqfUAbi3v5qHDowCtCZMenyocaqByDMn04MylDVEQ4l0+NcZquOnebfTuCGoEvjaYuJlAFRVJ6CbG9ooNj5iZ0dSAwMyN6TMhYIGHZyTMblg3TqKlxhuUrMNq5UxWIhdRyaE/0WckKCTHTISSrkTyjkcbiTUsFWUDgCJQfmNvBsHiKWurjMd3E5G35uLnxlkNbCLu+Jl1GMkAuKHPzLVlIHQzFW0gdjLoXL4BgJ8xSfeXzKmOhZnO38wEIOOsV76yk5uWFBF3EoG/A9esobiTK3DpRgJ4F12iqFFCDrDR7RkJa74lSoO87SpU7+NToLg5Pgw5B8AK/g//EADERAAICAQMDAwIEBQUAAAAAAAECABEDEiExBBBBEyJRBWEyQnGRFCAzYoEjNHKCwf/aAAgBAwEBPwDtXZhbS6WKTtKbYjs66D9ow1CNkVAFSY2D9CXv3CgZnGnIK4NTKQuVoXG9/FSsdcmEIFPMqV2IqEbxuJ6e0HAlRlsSqMK6GuYM9JmxtwwFfqDMwTIq7qSPvMiqWv2f5MyhRxprbibfAh47EHuVhEFavPYSpmSxqEvbtkagsZjcQ+02fMJE1Cu9QiUYRcqnP69h2M8ntk4WHmIfa47Capf8hWH8X/aV3IuegnxPRT4lA8iaFPiIq8VPTE9MS5cBm8uDeEf6tf3TQJph7XLgG5lGJtvtPUP9sGR96K/tFzI3DQdrlwHaH+pf901QQ9r7EbyjKIA/5CUPjsNgNt5qKGgTwDMLF8ak+Zi6PLkcBwVUrqv7GdRi9HKyBrqt4Pww8/57Kd4UOnVcx9PrTXzvxMvTWPYaMwfTs2Zq1kfep1X0j+G6XJnOYkqBtp+TU1GA2P8AMuXGY6jZ/T9oNRYgnkV/7MTKmNR5nT9ZiPSo11oUBvkVOpyetndxwTB+CeewMRGfGNtqnRFMSsmUAMT7ZlTTlDDZTtMXX9JhOks9jY+2fUvqPTZ+hzomvUQKsfcS504u4irfEZVH5JpFcbXUSyUN7cmAQsRQB2PMxneidjxK9k/NEQuVA8mhM3TPgCFttXj4nT/0kmbKmPIuogAAk2Zn6nLnyagxAHFTAGzhmY7qBZnUKVxN+kx42y5FxryxoTB038LfrlaLqP3Bmf8Ah/U043G53HgRB04BLmxcYGvavJ38TClFj+08SrqekzE3tAMqiqBEVlZocrIyaAPaQZ1HUP1TjwPyj9ZhQqig0R4InWB3+oOGbYEUPtVwChOhfRrBPtNXM2QZumc1RWdMXHVYRjNPqE+pdSMWdMWlWJF14EQeT4mbJdAbWd6gRhW5r4jr7rhvaKNx+om0U+4RG9LKGFWOLnVZD1eNMRxaQrWdOwYxVYcAzJkzNhGNja3D/uTBuCBMLAMLBO4njJsaIj5snTdSHx/iWxxMmbpM6rkU3noajREYhUnrKenbGca6rFNXHa5fe5k/FDDCbM1Ekn5Mxtw0rTlqFSBZYVM3p5UVADVlifkmdHgxKXpfAnWBdFAARCQoUhedVjmXMzhVtmpRyYctteLKamDNkyMQwFS4DHPuhMMZQQYBtEBiYWzvSsAQq8xruj2wHTkH3nUgEi/iVQ5uDJ1F34jDIwGs7fFQKoMxe7dRxzNfurULmqt7EORSbuFh5M1r8wkQoV5EUbzDoORlN2VFGZkCsvN73fZTpZT8TNTIrCEQKTtvLyhaLbRWQcrc1hF2FX4lEFWJ3JjWU2i6CKI3jBauooFbywSYcLUa93naJiyGyFJlMj3wQZmvUGP5hcVSzBR5mn3Fb8xgBiYDu+9CeYQWO8KVxLbaoQWINRrM4gisfSAWBtBqzUKjc1Y2Ijuzm2niAkGLkASq3gJEuHkS95cuXsJf8gak7YzYKw/y/wD/2Q==',width: 100,alignment:'center',border: [false, false, false, false]}],
            
            ],
            
          },
        layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 1) ? '#CCCCCC' : null;
            }
          },
        
        }
        ]
       },
       {
           alignment: 'justify',
           columns:[{
        
          margin:[0,10,0,0],
          float:'center',
          table: {
            headerRows: 1,
            widths:'100%',
                 alignment:'center', 
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [{text: 'Sightseeing ABC', style: 'tableHeader1',alignment:'center',color:'#000000',border: [false, false, false, false],fillColor:'#CCCCCC'}],
            
            ],
            
          },
        layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 1) ? '#CCCCCC' : null;
            }
          },
        
        },
        {
        
          margin:[0,10,0,0],
          float:'center',
          table: {
            headerRows: 1,
            widths:'100%',
                 alignment:'center', 
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [{text: 'Sightseeing ABC', style: 'tableHeader1',alignment:'center',color:'#000000',border: [false, false, false, false],fillColor:'#CCCCCC'}],
            
            ],
            
          },
        layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 1) ? '#CCCCCC' : null;
            }
          },
        
        }
        ]
       },
       {
           columns:[
               {
          style: 'tableExample',
          alignment:"center",
          table: {
            headerRows: 1,
            widths:"50%",
            body: [
              [{text: 'DURATION', style: 'tableHeader',widths:'50%'}, {text: 'PLACES COVERED', style: 'tableHeader',widths:'50%'}],
              ['8 hours', '1'],
              
              
            ]
          },
        layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 1) ? '#CCCCCC' : null;
            }
          },
        },
        ]
       },
      
      {
          style: 'tableExample1',
          
          table: {
            headerRows: 1,
            widths:'100%',
            backgroundColor:"#1a4e9d",
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [{text: 'Day 2', style: 'tableHeader1',alignment:'center',color:'#fff',border: [false, false, false, false]}],
            
            ],
            
          },
          layout: {
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex % 2 === 0) ? '#1a4e9d' : null;
            }
          }
        },
        {
          style: 'tableExample1',
          
          table: {
            headerRows: 1,
            widths:'100%',
              
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [{image:'data:image/jpeg;base64,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',width: 100,alignment:'center',border: [false, false, false, false],margin:[0,20,0,0]}],
            
            ],
            
          },
          layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 1) ? '#CCCCCC' : null;
            }
          },
        },
          {
        
          margin:[0,10,0,0],
          float:'center',
          table: {
            headerRows: 1,
            widths:'100%',
                 alignment:'center', 
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [{text: 'Sightseeing ABC', style: 'tableHeader1',alignment:'center',color:'#000000',border: [false, false, false, false],fillColor:'#CCCCCC'}],
            
            ],
            
          },
        layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 1) ? '#CCCCCC' : null;
            }
          },
        
        },
        {text: 'Vehicle Model: INNOVA OR MARAZO', style: 'tableHeader1',alignment:'center',color:'#1a4e9d',border: [false, false, false, false],margin:[0,15,0,0],fontSize:18},
            {text: 'Category: SUV/MUV', style: 'tableHeader1',alignment:'center',color:'#000',border: [false, false, false, false],margin:[0,0,0,0],fontSize:18},
            {text: [{text:'Facilities: ', style: 'tableHeader1',alignment:'center',color:'#1a4e9d',border: [false, false, false, false],margin:[0,0,0,0],fontSize:18},{text:'4+1 Seater | 4 Luggage Bags | AC | First Aid', style: 'tableHeader1',alignment:'center',color:'#CCCCCC',border: [false, false, false, false],margin:[0,0,0,0],fontSize:18}]},
       
       {
           alignment: 'justify',
           columns:[{
        
          margin:[0,10,0,0],
          float:'center',
          table: {
            headerRows: 1,
            widths:'100%',
                 alignment:'center', 
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [{image:'data:image/jpeg;base64,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',width: 100,alignment:'center',border: [false, false, false, false]}],
            
            ],
            
          },
        layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 1) ? '#CCCCCC' : null;
            }
          },
        
        },
        {
        
          margin:[0,10,0,0],
          float:'center',
          table: {
            headerRows: 1,
            widths:'100%',
                 alignment:'center', 
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [{image:'data:image/jpeg;base64,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',width: 100,alignment:'center',border: [false, false, false, false]}],
            
            ],
            
          },
        layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 1) ? '#CCCCCC' : null;
            }
          },
        
        }
        ]
       },
       {
           alignment: 'justify',
           columns:[{
        
          margin:[0,10,0,0],
          float:'center',
          table: {
            headerRows: 1,
            widths:'100%',
                 alignment:'center', 
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [{text: 'Sightseeing ABC', style: 'tableHeader1',alignment:'center',color:'#000000',border: [false, false, false, false],fillColor:'#CCCCCC'}],
            
            ],
            
          },
        layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 1) ? '#CCCCCC' : null;
            }
          },
        
        },
        {
        
          margin:[0,10,0,0],
          float:'center',
          table: {
            headerRows: 1,
            widths:'100%',
                 alignment:'center', 
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [{text: 'Sightseeing ABC', style: 'tableHeader1',alignment:'center',color:'#000000',border: [false, false, false, false],fillColor:'#CCCCCC'}],
            
            ],
            
          },
        layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 1) ? '#CCCCCC' : null;
            }
          },
        
        }
        ]
       },
       {
           columns:[
               {
          style: 'tableExample',
          alignment:"center",
          table: {
            headerRows: 1,
            widths:"50%",
            body: [
              [{text: 'DURATION', style: 'tableHeader',widths:'50%'}, {text: 'PLACES COVERED', style: 'tableHeader',widths:'50%'}],
              ['8 hours', '1'],
              
              
            ]
          },
        layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 1) ? '#CCCCCC' : null;
            }
          },
        },
        {
          style: 'tableExample',
          alignment:"center",
          table: {
            headerRows: 1,
            widths:"50%",
            body: [
              [{text: 'Includes', style: 'tableHeader'}, {text: 'Room Type', style: 'tableHeader'}],
              ['MAP ( Breakfast and Dinner) hours','Standard'],
              
              
            ]
          },
        layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 1) ? '#CCCCCC' : null;
            }
          },
        },]
       },
       {text:'Fare Summary',fontSize:20,bold:true,color:'#1a4e9d',margin: [0, 15, 0, 15]},
       {text:'Here is the detailed quotation of your desired holiday.',fontSize:20,bold:true,color:'#000',margin: [0, 0, 0, 0]},
      {
          style: 'tableExample',
          alignment:"center",
          
          table: {
            headerRows: 1,
          
            body: [
              [{text: 'Price Summary Per Person', style: 'tableHeader',margin:[8,8,8,8],}, {text: 'Adult(Double)', style: 'tableHeader',margin:[8,8,8,8],}, {text: 'Child With Bed	', style: 'tableHeader',margin:[8,8,8,8],}, {text: 'Child WithOut Bed	', style: 'tableHeader',margin:[8,8,8,8],}, {text: 'Infants', style: 'tableHeader',margin:[8,8,8,8],}],
              ['No. Of travellers', '1', '0','0','0'],
              ['Tour Cost () Per Person', '2000', 'NA','NA','NA'],
            ]
          },
        layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 1) ? '#CCCCCC' : null;
            }
          },
        },
        {text:'Total Tour Cost Calculation',fontSize:12,bold:true,color:'#000',margin: [0, 15, 0, 15]},
      {
          style: 'tableExample',
          
          table: {
            headerRows: 0,
            widths:"50%",
            alignment:"left",
            body: [
              [{text: 'Total tour Cost', style: 'tableHeader',widths:'50%',alignment:"left"}, {text: 'INR 21000', style: 'tableHeader',widths:'50%',fontSize:22}],
              [{text: 'Gross Amount', style: 'tableHeader',widths:'50%',alignment:"left"}, {text: '21000', style: 'tableHeader',widths:'50%'}],
              [{text: 'Goods & Service Tax', style: 'tableHeader',widths:'50%',alignment:"left"}, {text: '', style: 'tableHeader',widths:'50%'}],
              [{text: 'CGST Calculated @2.5%', style: 'tableHeader',widths:'50%',alignment:"left"}, {text: '525', style: 'tableHeader',widths:'50%'}],
              [{text: 'SGST Calculated @2.5%', style: 'tableHeader',widths:'50%',alignment:"left"}, {text: '525', style: 'tableHeader',widths:'50%'}],
              [{text: 'Final Cost For All Passengers', style: 'tableHeader',widths:'50%',alignment:"left"}, {text: '21525', style: 'tableHeader',widths:'50%'}],
              
              
            ]
          },
        layout: {
            hLineWidth: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 0.6 : 0.6;
            },
            vLineWidth: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 0.6 : 0.6;
            },
            hLineColor: function (i: number, node: { table: { body: string | any[]; }; }) {
              return (i === 0 || i === node.table.body.length) ? 'gray' : 'gray';
            },
            vLineColor: function (i: number, node: { table: { widths: string | any[]; }; }) {
              return (i === 0 || i === node.table.widths.length) ? 'gray' : 'gray';
            },
            fillColor: function (rowIndex: number, node: any, columnIndex: any) {
              return (rowIndex > 4) ? '#1a4e9d' : null;
            }
          },
        },
        {
            alignment: 'justify',
            columns:[
                {text: 'Call Us- 123456789', alignment:"center",style: 'tableHeader1',color:'#1a4e9d',margin:[0,0,0,0],fontSize:18},
               
    
                ]
        },
        {
            alignment: 'justify',
            columns:[
                {text: 'Book Now- https://4dhamyatra.in/', alignment:"center",style: 'tableHeader1',color:'#000',margin:[0,0,0,0],fontSize:12},
               
    
                ]
        },
            ],
            images:{headerImg:'http://localhost:4200/assets/images/logo.jpeg'},
      styles: {
        header: {
          fontSize: 20,
          bold: true
        },
        bigger: {
          fontSize: 15,
          italics: true
        },
          tableExample: {
          border:"5 solid red",
          margin: [0, 5, 0, 15],
          fontFamily:'sans-sarif'
          
        },
        
          tableExample1: {
          background:'#1a4e9d',
          
          
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
          alignment:'center'
        },
        tableHeader1:{
            bold: true,
          fontSize: 15,
          width:'100%'
        }
      },
      defaultStyle: {
        columnGap: 20
      }
      
    }
    pdfMake.createPdf(dd).download('test.pdf');
  }
}




