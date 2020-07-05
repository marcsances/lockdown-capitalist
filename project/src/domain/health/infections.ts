import {Variable} from "../base/variable";

export class Infections extends Variable {
  rate: number;

  iterate() {
    let last = this.currentValue;
    super.iterate();
    this.rate = this.dailyIncrease / last * 100;
  }
}
