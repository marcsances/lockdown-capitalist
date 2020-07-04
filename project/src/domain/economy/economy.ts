import {Variable} from "../base/variable";
import {Budget} from "./budget";
import {GDP} from "./gdp";
import {dailyMaxGdp, gdpToBudget, initialGdp} from "../base/constants";

export class Economy {
  gdp: GDP;
  budget: Budget;

  constructor() {
    this.gdp = new GDP(initialGdp, 0.0, dailyMaxGdp);
    this.budget = new Budget(this.gdp, gdpToBudget);
  }
}
