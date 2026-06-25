export const USER_PROFILE: any = {
  name: "STUDENT TAXPAYER",
  pan: "STUDENT123",
  aadhaar: "XXXX-XXXX-XXXX",
  dob: "01/01/2000",
  email: "student@taxportal.edu",
  phone: "+91-0000000000",
  address: "University Campus, New Delhi - 110001",
  aoDetails: {
    areaCode: "DEL",
    aoType: "W",
    rangeCode: "1",
    aoNumber: "1",
    jurisdiction: "ITO WARD 1(1), NEW DELHI",
  },
  aadhaarLinked: false,
  bankAccounts: []
};

export const DASHBOARD_KPIS = [
  { id: "tax-paid", label: "Total Tax Paid", value: "₹ 0", trend: { value: "Up to date", isPositive: true } },
  { id: "refund", label: "Expected Refund", value: "₹ 0", subtitle: "No refunds" },
  { id: "demand", label: "Outstanding Demand", value: "₹ 0", subtitle: "No pending dues", trend: { value: "Clear", isPositive: true } },
  { id: "compliance", label: "Compliance Score", value: "100/100", trend: { value: "Excellent", isPositive: true } },
];

export const ITR_HISTORY: any[] = [];

export const FORM_26AS_TDS: any[] = [];

export const AIS_SUMMARY: any = {
  tds: [],
  sft: [],
  taxes: []
};

export const NOTICES: any[] = [];

export const GST_RETURNS: any[] = [];

export const GST_INVOICES: any[] = [];

export const TDS_CHALLANS: any[] = [];

export const EWAY_BILLS: any[] = [];

