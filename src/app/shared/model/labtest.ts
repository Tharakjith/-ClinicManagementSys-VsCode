export class Labtest {
  LabTestId: number = 0;
  TestName: string = '';
  Price: number = 0.00;
  LowRange: number = 0.00;
  HighRange: number = 0.00;
  CreatedDate: string = new Date().toISOString().split('T')[0];
  Sample: string = '';
  IsActive: boolean = true;
}