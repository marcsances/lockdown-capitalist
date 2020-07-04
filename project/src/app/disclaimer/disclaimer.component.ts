import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss']
})
export class DisclaimerComponent {
  router: Router;
  version = "0.1.0";

  constructor(router: Router) {
    this.router = router;
  }

  onPlayClicked() {
    this.router.navigate(['game']);
  }
}

