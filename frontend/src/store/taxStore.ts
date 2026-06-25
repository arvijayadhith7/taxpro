import { create } from 'zustand';
import { TaxForm } from '@/types/tax.types';

interface TaxState {
  filingStep: number;
  draftForms: TaxForm[];
  submittedForms: TaxForm[];
  selectedForm: TaxForm | null;
  setFilingStep: (step: number) => void;
  submitForm: (form: TaxForm) => void;
}

export const useTaxStore = create<TaxState>((set) => ({
  filingStep: 1,
  draftForms: [],
  submittedForms: [],
  selectedForm: null,
  setFilingStep: (step) => set({ filingStep: step }),
  submitForm: (form) =>
    set((state) => ({
      submittedForms: [...state.submittedForms, form],
      filingStep: 1, // Reset after submit
    })),
}));
