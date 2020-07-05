import {Variable} from "../base/variable";
import {GDP} from "./gdp";
import {Constants} from "../base/constants";

export class Budget extends Variable {
  gdp: GDP;

  constructor(gdp: GDP, percent: number, constants: Constants) {
    super(constants.initialBudget, 0, 0);
    this.gdp = gdp;
  }

}
