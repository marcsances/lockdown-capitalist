export class Variable {
  currentValue: number = 0;
  dailyIncrease: number = 0;
  exponentialGrowth: number = 0.0;
  linearGrowth: number = 0.0;
  isint: boolean = false;

  constructor(initialValue: number, initialExponentialGrowth: number, initialLinearGrow: number, isint: boolean = false) {
    this.currentValue = initialValue;
    this.exponentialGrowth = initialExponentialGrowth
    this.linearGrowth = initialLinearGrow
    this.isint = isint
  }

  iterate(): void {

    this.dailyIncrease = this.linearGrowth + (this.currentValue * this.exponentialGrowth);
    if (this.isint) {
      this.dailyIncrease = Math.trunc(this.dailyIncrease);
    }
    this.currentValue = this.currentValue + this.dailyIncrease;

  }

  getValue(): number {
    return this.currentValue;
  }
}
