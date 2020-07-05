import {Variable} from "../base/variable";
import {Hospitals} from "./hospitals";

export class Patients extends Variable {
  attended: Variable;
  unattended: Variable;
  hospitals: Hospitals;

  constructor(initialValue: number, initialExponentialGrowth: number, initialLinearGrow: number, hospitals: Hospitals) {
    super(initialValue, initialExponentialGrowth, initialLinearGrow, true);
    this.hospitals = hospitals;
    this.attended = new Variable(initialValue, 0, 0);
    this.unattended = new Variable(0, 0, 0);
  }
}
