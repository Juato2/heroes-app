import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(private route: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router) { }

  ngOnInit(): void {
    // First get the product id from the current route.
    // const routeParams = this.route.snapshot.paramMap;
    // const heroeIdFromRoute = String(routeParams.get('id'));

    // console.log(heroeIdFromRoute);

    // this.heroesService.getHeroesPorId(heroeIdFromRoute)
    //   .subscribe(heroe => {
    //     this.heroe = heroe;
    //   })
    // First get the product id from the current route.
    this.route.params.
      pipe(
        switchMap(({ id }) => this.heroesService.getHeroesPorId(id))
      )
      .subscribe(heroe => this.heroe = heroe);
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }

}
