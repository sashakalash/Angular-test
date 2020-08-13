import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Card } from './models/Card';
import { CardService } from './services/card-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  cardList$: Observable<Card[]>;

  constructor(private cardService: CardService) {

  }

  ngOnInit(): void {
    this.cardList$ = this.cardService.getCardList();
  }

}
