import {Variable} from "../base/variable";
import {hospitalCapacity} from "../base/constants";

export class Hospitals extends Variable {
  hospitals: number[];

  constructor(hospitals: number[]) {
    let totalHospitals = hospitals[0] + hospitals[1] + hospitals[2];
    super(totalHospitals, 0, 0);
    this.hospitals = hospitals;
  }

  getCapacity(): number {
    return this.hospitals[0] * hospitalCapacity[0] + this.hospitals[1] * hospitalCapacity[1]
      + this.hospitals[2] * hospitalCapacity[2];
  }
}
