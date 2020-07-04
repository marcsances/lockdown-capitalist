import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Game} from "../../domain/game/game";
import {hospitalCosts} from "../../domain/base/constants";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  router: Router;
  game: Game;
  smallCost: number;
  mediumCost: number;
  largeCost: number;

  constructor(router: Router) {
    this.router = router;
    this.game = new Game();
    this.smallCost = hospitalCosts[0];
    this.mediumCost = hospitalCosts[1];
    this.largeCost = hospitalCosts[2];
  }

  iterate() {
    this.game.iterate();
  }

  newGame() {
    this.game = new Game();
    this.smallCost = hospitalCosts[0];
    this.mediumCost = hospitalCosts[1];
    this.largeCost = hospitalCosts[2];
  }
}

