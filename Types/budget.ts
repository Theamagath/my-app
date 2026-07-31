export interface Budget {
  id?: string;

  categoryId: string;
  categoryName: string;

  dailyAmount: number;

  amount: number;

  month: number;
  year: number;

  createdAt?: string;
}