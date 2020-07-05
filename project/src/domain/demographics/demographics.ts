import {Exitus} from "./exitus";
import {Population} from "./population";
import {Health} from "../health/health";
import {initialPopulation} from "../base/constants";

export class Demographics {
  exitus: Exitus;
  population: Population;

  constructor(health: Health) {
    this.exitus = new Exitus();
    this.population = new Population(initialPopulation, 0.0, 0.0, this.exitus);
  }
}
