import {Budget} from "./budget";
import {GDP} from "./gdp";
import {Constants} from "../base/constants";

export class Economy {
  gdp: GDP;
  budget: Budget;

  constructor(constants: Constants) {
    this.gdp = new GDP(constants.initialGdp, 0.0, constants.dailyMaxGdp);
    this.budget = new Budget(this.gdp, constants.gdpToBudget, constants);
  }
}
