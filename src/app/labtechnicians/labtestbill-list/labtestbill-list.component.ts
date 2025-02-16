import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Labtestbill } from 'src/app/shared/model/labtestbill';
import { LabtestbillService } from 'src/app/shared/service/labtestbill.service';
//(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-labtestbill-list',
    templateUrl: './labtestbill-list.component.html',
    styleUrls: ['./labtestbill-list.component.scss']
})
export class LabtestbillListComponent implements OnInit {
    bills: Labtestbill[] = [];
    loading = false;
    totalAmount = 0;
    gstAmount = 0;
    grandTotal = 0;

    constructor(
        private labtestBillService: LabtestbillService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.loadBills();
    }

    loadBills(): void {
        this.loading = true;
        this.labtestBillService.getAllLabtestBills().subscribe({
            next: (bills) => {
                this.bills = bills;
                this.calculateTotals();
                this.loading = false;
            },
            error: (error) => {
                this.toastr.error('Failed to load bills');
                this.loading = false;
            }
        });
    }

    calculateTotals(): void {
        this.totalAmount = this.bills.reduce((sum, bill) => sum + bill.Price, 0);
        this.gstAmount = this.labtestBillService.calculateGST(this.totalAmount);
        this.grandTotal = this.totalAmount + this.gstAmount;
    }

    downloadPDF(): void {
        const documentDefinition = {
            content: [
                { text: 'Lab Test Bill', style: 'header' },
                { text: `Date: ${new Date().toLocaleDateString()}`, margin: [0, 0, 0, 20] },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', '*', '*', '*'],
                        body: [
                            ['Patient Name', 'Doctor Name', 'Test Name', 'Price'],
                            ...this.bills.map(bill => [
                                bill.PatientName,
                                bill.DoctorName,
                                bill.TestName,
                                `₹${bill.Price.toFixed(2)}`
                            ]),
                            ['', '', 'Subtotal', `₹${this.totalAmount.toFixed(2)}`],
                            ['', '', 'GST (18%)', `₹${this.gstAmount.toFixed(2)}`],
                            ['', '', 'Grand Total', `₹${this.grandTotal.toFixed(2)}`]
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                }
            }
        };

       // pdfMake.createPdf(documentDefinition).download('lab-test-bill.pdf');
    }
}