export class Constants {
  initialGdp: number = 30000000;
  initialBudget: number = 0;
  gdpToBudget: number = 0.1;
  dailyMaxGdp: number = 1000000;
  hospitalCosts: number[] = [10000, 20000, 40000];
  hospitalCapacity: number[] = [180, 400, 900];
  initialHospitals: number[] = [3, 2, 1];
  initialInfectionRate: number = 0.5;
  fullLockdownR: number = 0.945;
  partialLockdownR: number = 0.965;
  noLockdownR: number = 1.0001;
  fullLockdownGDP: number = -0.1;
  partialLockdownGDP: number = 0.1;
  mildReleaseDay: number = 14;
  treatedReleaseDay: number = 7;
  untreatedReleaseDay: number = 7;
  treatedFatalityRate: number = 2 / 100;
  untreatedFatalityRate: number = 90 / 100;
  initialPopulation: number = 10000000;
  initialInfections: number = 150;
  hospitalRate: number = 0.1;
  fullLockdownEffectiveness: number = -0.1;
  partialLockdownEffectiveness: number = -0.05;
  exponentialThreshold = 0.001;
}
