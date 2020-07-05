import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Game} from "../../domain/game/game";
import {Color, Label} from "ng2-charts";
import {ChartDataSets} from "chart.js";
import {Constants} from "../../domain/base/constants";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    {data: [], label: 'Cumulative infections'},
    {data: [], label: 'Active cases'},
    {data: [], label: 'Patients requiring hospital'},
    {data: [], label: 'Patients rejected hospital assistance'},
    {data: [], label: 'Cumulative deaths'},
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions = {
    responsive: false,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public lineChartData2: ChartDataSets[] = [
    {data: [], label: 'Active cases last day'},
    {data: [], label: 'Patients requiring hospital last day'},
    {data: [], label: 'Patients rejected hospital assistance last day'},
    {data: [], label: 'Deceased last day'},
  ];
  public lineChartLabels2: Label[] = [];
  public lineChartOptions2 = {
    responsive: false,
  };
  public lineChartColors2: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend2 = true;
  public lineChartType2 = 'line';
  public lineChartPlugins2 = [];

  router: Router;
  game: Game;
  constants: Constants;
  smallCost: number;
  mediumCost: number;
  largeCost: number;
  smallCap: number;
  mediumCap: number;
  largeCap: number;
  totalInfections: number;
  totalDeceased: number;

  constructor(router: Router) {
    this.router = router;

  }

  ngOnInit() {
    this.newGame();
    this.updateChart();
  }

  updateChart() {
    this.lineChartLabels.push(this.game.day.toString());
    this.lineChartLabels2.push(this.game.day.toString());
    this.lineChartData[0].data.push(Math.trunc(this.totalInfections));
    this.lineChartData[1].data.push(Math.trunc(this.game.health.infections.currentValue));
    this.lineChartData[2].data.push(Math.trunc(this.game.health.patients.currentValue));
    this.lineChartData[3].data.push(Math.trunc(this.game.health.patients.unattended.currentValue));
    this.lineChartData[4].data.push(Math.trunc(this.game.demographics.exitus.currentValue));
    this.lineChartData2[0].data.push(Math.trunc(this.game.health.infections.dailyIncrease));
    this.lineChartData2[1].data.push(Math.trunc(this.game.health.patients.dailyIncrease));
    this.lineChartData2[2].data.push(Math.trunc(this.game.health.patients.unattended.dailyIncrease));
    this.lineChartData2[3].data.push(Math.trunc(this.game.demographics.exitus.dailyIncrease));
  }

  iterate() {
    this.game.iterate();
    if (!this.game.gameover) {
      this.totalInfections = Math.max(0, this.game.health.infections.dailyIncrease) + this.totalInfections;
      this.totalDeceased = Math.max(0, this.game.health.releases.deceasedForDay(this.game.day) + this.totalDeceased);
      this.updateChart();
    }
  }

  newGame() {
    this.constants = new Constants();
    this.game = new Game(this.constants);
    this.smallCost = this.constants.hospitalCosts[0];
    this.mediumCost = this.constants.hospitalCosts[1];
    this.largeCost = this.constants.hospitalCosts[2];
    this.smallCap = this.constants.hospitalCapacity[0];
    this.mediumCap = this.constants.hospitalCapacity[1];
    this.largeCap = this.constants.hospitalCapacity[2];
    this.game.health.infections.dailyIncrease = this.game.health.infections.currentValue;
    this.totalInfections = this.game.health.infections.currentValue;
    this.totalDeceased = 0;
    this.lineChartData = [
      {data: [], label: 'Cumulative infections'},
      {data: [], label: 'Active cases'},
      {data: [], label: 'Patients requiring hospital'},
      {data: [], label: 'Patients rejected hospital assistance'},
      {data: [], label: 'Cumulative deaths'},
    ];
    this.lineChartData2 = [
      {data: [], label: 'Active cases last day'},
      {data: [], label: 'Patients requiring hospital last day'},
      {data: [], label: 'Patients rejected hospital assistance last day'},
      {data: [], label: 'Deceased last day'},
    ];
    this.lineChartLabels = [];
    this.lineChartLabels2 = [];
  }
}

