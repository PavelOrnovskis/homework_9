export class LoanDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static generateLowRiskLoanRequest(): LoanDto {
    return new LoanDto(50000, 0, 31, true, 1040, 12)
  }

  static generateMediumRiskLoanRequest(): LoanDto {
    return new LoanDto(5000, 0, 31, true, 1040, 24)
  }

  static generateHighRiskLoanRequest(): LoanDto {
    return new LoanDto(50000, 0, 35, false, 7000, 30)
  }

  static generateEmptyLoanRequest(): any {
    return {}
  }

  static generateYoungUserRequest(): LoanDto {
    return new LoanDto(1900, 0, 16, true, 1000, 24)
  }
}
