import {Variable} from "../base/variable";
import {Infections} from "../health/infections";
import {dailyTreatedFatalityRate, dailyUntreatedFatailtyRate} from "../base/constants";

export class Exitus extends Variable {
  infections: Infections;

  constructor(infections: Infections) {
    super(0, 0, 0, true);
    this.infections = infections;
  }
}
