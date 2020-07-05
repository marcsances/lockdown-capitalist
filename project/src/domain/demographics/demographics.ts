import {Exitus} from "./exitus";
import {Population} from "./population";
import {Health} from "../health/health";
import {Constants} from "../base/constants";

export class Demographics {
  exitus: Exitus;
  population: Population;

  constructor(health: Health, constants: Constants) {
    this.exitus = new Exitus();
    this.population = new Population(constants.initialPopulation, 0.0, 0.0, this.exitus);
  }
}
