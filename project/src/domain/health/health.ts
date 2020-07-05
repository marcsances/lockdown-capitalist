import {Patients} from "./patients";
import {Hospitals} from "./hospitals";
import {Infections} from "./infections";
import {Releases} from "./releases";
import {Constants} from "../base/constants";

export class Health {
  patients: Patients;
  hospitals: Hospitals;
  infections: Infections;
  releases: Releases;

  constructor(constants: Constants) {
    this.hospitals = new Hospitals(constants, constants.initialHospitals);
    this.patients = new Patients(constants.initialInfections * constants.hospitalRate, -0.0001, 0, this.hospitals);
    this.infections = new Infections(constants.initialInfections, constants.initialInfectionRate, 0);
    this.releases = new Releases();
  }
}
