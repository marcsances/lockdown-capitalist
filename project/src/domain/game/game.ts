import {Economy} from "../economy/economy";
import {Health} from "../health/health";
import {Demographics} from "../demographics/demographics";
import {
  dailyMaxGdp,
  fullLockdownEffectiveness,
  fullLockdownGDP,
  fullLockdownR,
  gdpToBudget,
  hospitalCosts,
  hospitalRate,
  mildReleaseDay,
  noLockdownR,
  partialLockdownEffectiveness,
  partialLockdownGDP, partialLockdownR,
  treatedFatalityRate,
  treatedReleaseDay,
  untreatedFatalityRate,
  untreatedReleaseDay
} from "../base/constants";
import {Lockdown} from "../lockdown/lockdown";
import {LockdownEffectiveness} from "../lockdown/lockdownefectiveness";

export class Game {
  economy: Economy;
  demographics: Demographics;
  health: Health;
  lockdownStatus: Lockdown;
  lockdownStatusStr: string;
  day: number = 0;
  gameover: boolean = false;
  lockdownEffectiveness: LockdownEffectiveness;

  constructor() {
    this.economy = new Economy();
    this.health = new Health();
    this.demographics = new Demographics(this.health);
    this.lockdownStatus = Lockdown.NONE;
    this.lockdownStatusStr = "No lockdown";
    this.day = 0;
    this.lockdownEffectiveness = new LockdownEffectiveness(noLockdownR, 0, 0);
  }

  iterateEconomy() {
    this.economy.gdp.iterate();
    this.economy.budget.linearGrowth = this.economy.gdp.dailyIncrease * gdpToBudget;
    this.economy.budget.iterate();
  }

  iterateHealth() {
    let released = this.health.releases.totalReleasesForDay(this.day);
    this.health.infections.linearGrowth = -released;
    this.health.infections.iterate();
    let newPatients = this.health.infections.dailyIncrease > 0 ? this.health.infections.dailyIncrease : 0;
    if (this.health.infections.currentValue > this.demographics.population.currentValue) {
      newPatients = this.health.infections.dailyIncrease - (this.health.infections.currentValue - this.demographics.population.currentValue);
      this.health.infections.currentValue = this.demographics.population.currentValue;
    }
    this.health.patients.linearGrowth = newPatients * hospitalRate;
    this.health.patients.iterate();
    let mild = newPatients * (1 - hospitalRate);
    let hospitalBeds = this.health.hospitals.getCapacity();
    if (this.health.patients.currentValue > hospitalBeds) {
      this.health.patients.attended =  hospitalBeds;
      this.health.patients.unattended = this.health.patients.currentValue - hospitalBeds;
    } else {
      this.health.patients.attended = this.health.patients.currentValue;
    }
    this.health.patients.iterate();
    this.health.releases.updateReleasesForDay(this.day + mildReleaseDay, mild, 0);
    this.health.releases.updateReleasesForDay(this.day + treatedReleaseDay, this.health.patients.attended, treatedFatalityRate);
    this.health.releases.updateReleasesForDay(this.day + untreatedReleaseDay, this.health.patients.unattended, untreatedFatalityRate)
    if (this.health.infections.currentValue < 0) {
      this.showAlert("All infections were discharged. The infection is over.");
      this.gameover = true;
    }
  }

  iterateDemographics() {
    this.demographics.exitus.linearGrowth = this.health.releases.deceasedForDay(this.day);
    this.demographics.exitus.iterate();
    this.demographics.population.iterate();
    if (this.demographics.population.currentValue < 0) {
      this.showAlert("All your population died!");
      this.gameover = true;
    }
  }

  iterateLockdown() {
    this.health.infections.exponentialGrowth = this.health.infections.exponentialGrowth * this.lockdownEffectiveness.currentValue;
    switch (this.lockdownStatus) {
      case Lockdown.FULL:
        this.economy.gdp.linearGrowth = dailyMaxGdp * fullLockdownGDP;
        break;
      case Lockdown.HALF:
        this.economy.gdp.linearGrowth = dailyMaxGdp * partialLockdownGDP;
        break;
      case Lockdown.NONE:
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
    this.lockdownEffectiveness = new LockdownEffectiveness(fullLockdownR, fullLockdownEffectiveness, 0);
    this.showToast("Sending everyone home!");
  }

  halfLockdown() {
    this.lockdownStatus = Lockdown.HALF;
    this.lockdownStatusStr = "Partial lockdown";
    this.lockdownEffectiveness = new LockdownEffectiveness(partialLockdownR, partialLockdownEffectiveness, 0);
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
    this.iterateLockdown();
    this.iterateEconomy();
    this.iterateHealth();
    this.iterateDemographics();
  }

}
