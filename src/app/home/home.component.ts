import { Component, OnInit, Inject } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Dish } from '../shared/dish';
import { Leader } from '../shared/leader';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  dish : Dish;
  promo : Promotion;
  leader : Leader
  dishErrMess: string;
  promErrMess: string;
  leaderErrMess: string

  constructor(private dishService : DishService,
    private  promotionService : PromotionService,
    private  leaderService : LeaderService,
    @Inject('BaseUrl') private BaseUrl) { }

  ngOnInit(): void {
    
    this.dishService.getFeaturedDish().subscribe(dish => this.dish = dish,
      dishErrMess => this.dishErrMess = dishErrMess);
    this.promotionService.getFeaturedPromotion().subscribe(promo => this.promo = promo,
      promErrMess => this.promErrMess = promErrMess);
    this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader,
      leaderErrMess => this.leaderErrMess = leaderErrMess);
    
  }

}
