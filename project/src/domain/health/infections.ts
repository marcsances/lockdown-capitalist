import {Variable} from "../base/variable";
import {Hospitals} from "./hospitals";

export class Infections extends Variable {
    attended: number = 0;
    unattended: number = 0;
    hospitals: Hospitals;

    constructor(initialValue: number, initialExponentialGrowth: number, initialLinearGrow: number, hospitals: Hospitals) {
      super(initialValue, initialExponentialGrowth, initialLinearGrow, true);
      this.hospitals = hospitals;
      this.attended = initialValue;
      this.unattended = 0;
      this.attended = this.currentValue;
    }
}
