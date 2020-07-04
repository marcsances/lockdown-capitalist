import {Economy} from "../economy/economy";
import {Health} from "../health/health";
import {Demographics} from "../demographics/demographics";
import {
  dailyMaxGdp,
  dailyTreatedFatalityRate,
  dailyTreatedReleaseRate,
  dailyUntreatedFatailtyRate,
  dailyUntreatedReleaseRate,
  fullLockdownR,
  gdpToBudget,
  hospitalCosts,
  noLockdownR,
  partialLockdownR
} from "../base/constants";
import {Lockdown} from "../lockdown/lockdown";

export class Game {
  economy: Economy;
  demographics: Demographics;
  health: Health;
  lockdownStatus: Lockdown;
  lockdownStatusStr: string;
  day: number = 0;
  gameover: boolean = false;

  constructor() {
    this.economy = new Economy();
    this.health = new Health();
    this.demographics = new Demographics(this.health);
    this.lockdownStatus = Lockdown.NONE;
    this.lockdownStatusStr = "No lockdown";
    this.day = 0;
  }

  iterateEconomy() {
    this.economy.gdp.iterate();
    this.economy.budget.linearGrowth = this.economy.gdp.dailyIncrease * gdpToBudget;
    this.economy.budget.iterate();
  }

  iterateHealth() {
    let newInfections = this.demographics.exitus.dailyIncrease
      - dailyTreatedReleaseRate * this.health.infections.attended
      - dailyUntreatedReleaseRate * this.health.infections.unattended;
    this.health.infections.linearGrowth = newInfections;
    this.health.infections.iterate();
    let treated = this.health.hospitals.getCapacity() - this.health.infections.currentValue;
    if (treated < 0) {
      this.health.infections.attended = this.health.hospitals.getCapacity();
      this.health.infections.unattended = this.health.infections.currentValue - this.health.infections.attended;
    } else {
      this.health.infections.attended = this.health.infections.currentValue;
    }
    if (this.health.infections.currentValue == 0) {
      this.showAlert("All infections were discharged. The infection is over. You won!")
    }
  }

  iterateDemographics() {
    this.demographics.exitus.linearGrowth = this.health.infections.attended * dailyTreatedFatalityRate
      + this.health.infections.unattended * dailyUntreatedFatailtyRate;
    this.demographics.exitus.iterate();
    this.demographics.population.iterate();
    if (this.demographics.population.currentValue < 0) {
      this.showAlert("All your population died!");
      this.gameover = true;
    }
  }

  iterateLockdown() {
    switch (this.lockdownStatus) {
      case Lockdown.FULL:
        this.health.infections.exponentialGrowth = this.health.infections.exponentialGrowth * fullLockdownR;
        this.economy.gdp.linearGrowth = dailyMaxGdp * 0.3;
        break;
      case Lockdown.HALF:
        this.health.infections.exponentialGrowth = this.health.infections.exponentialGrowth * partialLockdownR;
        this.economy.gdp.linearGrowth = dailyMaxGdp * 0.5;
        break;
      case Lockdown.NONE:
        this.health.infections.exponentialGrowth = this.health.infections.exponentialGrowth * noLockdownR;
        this.economy.gdp.linearGrowth = dailyMaxGdp;
        break;
    }
  }

  buildHospital(size: number) {
    if (this.economy.budget.currentValue < hospitalCosts[size]) {
      this.showAlert("You don't have enough budget to build that hospital!");
      return;
    }
    this.economy.budget.currentValue = this.economy.budget.currentValue - hospitalCosts[size];
    this.health.hospitals.hospitals[size] = this.health.hospitals.hospitals[size] + 1;
    this.showToast("Hospital built!");
  }

  fullLockdown() {
    this.lockdownStatus = Lockdown.FULL;
    this.lockdownStatusStr = "Full lockdown";
    this.showToast("Sending everyone home!");
  }

  halfLockdown() {
    this.lockdownStatus = Lockdown.HALF;
    this.lockdownStatusStr = "Partial lockdown";
    this.showToast("Half lockdown started!");
  }

  noLockdown() {
    this.lockdownStatus = Lockdown.NONE;
    this.lockdownStatusStr = "No lockdown";
    this.showToast("Removing lockdown!");
  }

  showAlert(message) {
    alert(message);
  }

  showToast(message) {

  }

  iterate(): void {
    this.day = this.day + 1;
    this.iterateEconomy();
    this.iterateHealth();
    this.iterateDemographics();
    this.iterateLockdown();
  }

}
