import {Variable} from "../base/variable";
import {gdpToBudget, initialBudget} from "../base/constants";
import {GDP} from "./gdp";

export class Budget extends Variable {
  gdp: GDP;

  constructor(gdp: GDP, percent: number) {
    super(initialBudget, 0, 0);
    this.gdp = gdp;
  }

}
