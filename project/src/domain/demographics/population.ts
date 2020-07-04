import {Variable} from "../base/variable";
import {Exitus} from "./exitus";

export class Population extends Variable {
  exitus: Exitus;

  constructor(initialValue: number, initialExponentialGrowth: number, initialLinearGrow: number, exitus: Exitus) {
    super(initialValue, initialExponentialGrowth, initialLinearGrow, true);
    this.exitus = exitus;
  }

  iterate() {
    this.currentValue = this.currentValue - this.exitus.dailyIncrease;
  }
}
