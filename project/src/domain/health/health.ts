import {hospitalRate, initialHospitals, initialInfections, initialInfectionRate} from "../base/constants";
import {Patients} from "./patients";
import {Hospitals} from "./hospitals";
import {Infections} from "./infections";
import {Releases} from "./releases";

export class Health {
  patients: Patients;
  hospitals: Hospitals;
  infections: Infections;
  releases: Releases;

  constructor() {
    this.hospitals = new Hospitals(initialHospitals);
    this.patients = new Patients(initialInfections * hospitalRate, 0, 0, this.hospitals);
    this.infections = new Infections(initialInfections, initialInfectionRate, 0);
    this.releases = new Releases();
  }
}
