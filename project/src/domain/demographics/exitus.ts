import {Variable} from "../base/variable";
import {Patients} from "../health/patients";
import {treatedFatalityRate, untreatedFatalityRate} from "../base/constants";

export class Exitus extends Variable {

  constructor() {
    super(0, 0, 0, true);
  }
}
