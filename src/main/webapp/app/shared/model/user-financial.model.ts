export interface IUserFinancial {
  id?: number;
  housePrice?: number;
  savingMoney?: number;
  loanRate?: number;
  loanFromPeople?: number;
  customerMoneyHave?: number;
  customerMobile?: string;
  customerEmail?: string;
  userLogin?: string;
  userId?: number;
}

export const defaultValue: Readonly<IUserFinancial> = {};
