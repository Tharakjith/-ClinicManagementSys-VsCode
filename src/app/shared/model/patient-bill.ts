export class Patientbill {
    patientId: number = 0;
    patientName: string = '';
    patientPhone: string = '';
    patientAddress: string = '';
    appointmentId: number = 0;
    doctorId: number = 0;
    staffName: string = '';
    tokenNumber: number = 0;
    appointmentDate: string = '';
    consultationFee: number = 0;
    registrationFee: number = 0;

    constructor(data?: any) {
        if (data) {
            // Map from PascalCase (API) to camelCase (frontend)
            this.patientId = data.PatientId || 0;
            this.patientName = data.PatientName || '';
            this.patientPhone = data.PatientPhone || '';
            this.patientAddress = data.PatientAddress || '';
            this.appointmentId = data.AppointmentId || 0;
            this.doctorId = data.DoctorId || 0;
            this.staffName = data.StaffName || '';
            this.tokenNumber = data.TokenNumber || 0;
            this.appointmentDate = data.AppointmentDate || '';
            this.consultationFee = data.ConsultationFee || 0;
            this.registrationFee = data.RegistrationFee || 0;
        }
    }
}