import {Variable} from "../base/variable";
import {Constants} from "../base/constants";

export class Hospitals extends Variable {
  hospitals: number[];
  constants: Constants;

  constructor(constants: Constants, hospitals: number[]) {
    let totalHospitals = hospitals[0] + hospitals[1] + hospitals[2];
    super(totalHospitals, 0, 0);
    this.hospitals = hospitals;
    this.constants = constants;
  }

  getCapacity(): number {
    return this.hospitals[0] * this.constants.hospitalCapacity[0] + this.hospitals[1] * this.constants.hospitalCapacity[1]
      + this.hospitals[2] * this.constants.hospitalCapacity[2];
  }
}
