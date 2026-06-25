export interface TaxSummary {
  totalIncome: number;
  taxLiability: number;
  taxPaid: number;
  refundDue: number;
  filingDeadline: string;
}

export interface Refund {
  id: string;
  year: string;
  amount: number;
  status: 'processing' | 'approved' | 'rejected' | 'pending';
  filedDate: string;
}

export interface TaxForm {
  form: string;
  period: string;
  status: 'submitted' | 'verified' | 'draft';
  date: string;
  ack?: string;
}
