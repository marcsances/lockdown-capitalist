import {Variable} from "../base/variable";

export class GDP extends Variable {

  constructor(initialValue: number, initialExponentialGrowth: number, initialLinearGrow: number) {
    super(initialValue, initialExponentialGrowth, initialLinearGrow);
  }

}
