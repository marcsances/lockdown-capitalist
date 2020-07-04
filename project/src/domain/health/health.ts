import {initialHospitals, initialInfections, initialR} from "../base/constants";
import {Infections} from "./infections";
import {Hospitals} from "./hospitals";

export class Health {
  infections: Infections;
  hospitals: Hospitals;

  constructor() {
    this.hospitals = new Hospitals(initialHospitals);
    this.infections = new Infections(initialInfections, initialR, 0, this.hospitals);
  }
}
