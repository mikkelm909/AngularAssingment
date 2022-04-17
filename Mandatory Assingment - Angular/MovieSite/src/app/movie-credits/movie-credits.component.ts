import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IActor } from '../IActor';
import { IMovie } from '../imovie';
import { ITheMovie } from '../ItheMovie';
import { MovieService } from '../MovieService';

@Component({
  selector: 'app-movie-credits',
  templateUrl: './movie-credits.component.html',
  styleUrls: ['./movie-credits.component.css']
})
export class MovieCreditsComponent implements OnInit {
  movie: ITheMovie | undefined
  movieId: number = 0;
  actors: IActor[] | undefined
  constructor(private service: MovieService, private route: ActivatedRoute, private router: Router) { 
    this.movieId = this.route.snapshot.params['id'];
    this.getCredits()
    this.getMovie(this.movieId);

  }

  ngOnInit(): void {
  }

  getCredits() {
    this.service.getMovieCredits(this.movieId).subscribe(response => this.actors = response);
    console.log(this.actors);
  }
  getMovie(id: number){
    this.service.getTheMovie(this.movieId).subscribe(result  =>  this.movie = result); 
  }

  goToActor(actor: IActor){
    const pas: string = actor.id.toString();
    this.router.navigate(['/search-actors', pas]);
  }
}
