import {Economy} from "../economy/economy";
import {Health} from "../health/health";
import {Demographics} from "../demographics/demographics";
import {Lockdown} from "../lockdown/lockdown";
import {LockdownEffectiveness} from "../lockdown/lockdownefectiveness";
import {Constants} from "../base/constants";
import {MatSnackBar} from "@angular/material/snack-bar";

export class Game {
  economy: Economy;
  demographics: Demographics;
  health: Health;
  lockdownStatus: Lockdown;
  lockdownStatusStr: string;
  day: number = 0;
  gameover: boolean = false;
  lockdownEffectiveness: LockdownEffectiveness;
  constants: Constants;

  constructor(constants: Constants, private _snackBar: MatSnackBar) {
    this.constants = constants;
    this.economy = new Economy(this.constants);
    this.health = new Health(this.constants);
    this.demographics = new Demographics(this.health, this.constants);
    this.lockdownStatus = Lockdown.NONE;
    this.lockdownStatusStr = "No lockdown";
    this.day = 0;
    this.lockdownEffectiveness = new LockdownEffectiveness(this.constants.noLockdownR, 0, 0);
    this.health.releases.updateReleasesForDay(this.constants.mildReleaseDay, this.health.infections.currentValue, 0);
  }

  iterateEconomy() {
    this.economy.gdp.iterate();
    this.economy.budget.linearGrowth = Math.max(0, this.economy.gdp.dailyIncrease * this.constants.gdpToBudget);
    this.economy.budget.iterate();
  }

  iterateHealth() {
    let released = this.health.releases.totalReleasesForDay(this.day);
    this.health.infections.linearGrowth = -released;
    this.health.infections.iterate();
    let newPatients = this.health.infections.dailyIncrease;
    if (this.health.infections.currentValue > this.demographics.population.currentValue) {
      alert("All your population got infected! Game over.");
      this.gameover = true;
      return;
    }
    this.health.patients.linearGrowth = newPatients * this.constants.hospitalRate;
    this.health.patients.iterate();
    if (this.health.patients.currentValue < 0) {
      this.health.patients.currentValue = 0;
    }
    let mild = newPatients * (1 - this.constants.hospitalRate);
    let hospitalBeds = this.health.hospitals.getCapacity();
    let attendedPatients = Math.min(this.health.patients.currentValue, hospitalBeds);
    let unattendedPatients = this.health.patients.currentValue - attendedPatients;
    this.health.patients.attended.linearGrowth = attendedPatients - this.health.patients.attended.currentValue;
    this.health.patients.unattended.linearGrowth = unattendedPatients - this.health.patients.unattended.currentValue;
    this.health.patients.attended.iterate();
    this.health.patients.unattended.iterate();
    this.health.releases.updateReleasesForDay(this.day + this.constants.mildReleaseDay, mild, 0);
    this.health.releases.updateReleasesForDay(this.day + this.constants.treatedReleaseDay, this.health.patients.attended.dailyIncrease, this.constants.treatedFatalityRate);
    this.health.releases.updateReleasesForDay(this.day + this.constants.untreatedReleaseDay, this.health.patients.unattended.dailyIncrease, this.constants.untreatedFatalityRate)
    if (this.health.infections.exponentialGrowth < this.constants.exponentialThreshold) {
      this.health.infections.exponentialGrowth = -Math.abs(1.1 * this.health.infections.exponentialGrowth);
    }
    if (this.health.infections.currentValue < 1) {
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
        this.economy.gdp.linearGrowth = this.constants.dailyMaxGdp * this.constants.fullLockdownGDP;
        break;
      case Lockdown.HALF:
        this.economy.gdp.linearGrowth = this.constants.dailyMaxGdp * this.constants.partialLockdownGDP;
        break;
      case Lockdown.NONE:
        this.economy.gdp.linearGrowth = this.constants.dailyMaxGdp;
        break;
    }

  }

  buildHospital(size: number) {
    if (this.economy.budget.currentValue < this.constants.hospitalCosts[size]) {
      this.showAlert("You don't have enough budget to build that hospital!");
      return;
    }
    this.economy.budget.currentValue = this.economy.budget.currentValue - this.constants.hospitalCosts[size];
    this.health.hospitals.hospitals[size] = this.health.hospitals.hospitals[size] + 1;
    this.showToast("Hospital built!");
  }

  fullLockdown() {
    this.lockdownStatus = Lockdown.FULL;
    this.lockdownStatusStr = "Full lockdown";
    this.lockdownEffectiveness = new LockdownEffectiveness(this.constants.fullLockdownR, this.constants.fullLockdownEffectiveness, 0);
    this.showToast("Sending everyone home!");
  }

  halfLockdown() {
    this.lockdownStatus = Lockdown.HALF;
    this.lockdownStatusStr = "Partial lockdown";
    this.lockdownEffectiveness = new LockdownEffectiveness(this.constants.partialLockdownR, this.constants.partialLockdownEffectiveness, 0);
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
    this._snackBar.open(message, "Ok", {duration: 2000});
  }

  iterate(): void {
    this.day = this.day + 1;
    this.iterateLockdown();
    this.iterateEconomy();
    this.iterateHealth();
    this.iterateDemographics();
  }

}
