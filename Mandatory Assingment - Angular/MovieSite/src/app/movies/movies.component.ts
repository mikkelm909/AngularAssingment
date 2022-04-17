import { Component, OnInit } from '@angular/core';
import { MovieService } from '../MovieService';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IMovie } from '../imovie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: []
})
export class MoviesComponent{

  movies: IMovie[] | undefined;

  constructor(private service: MovieService, private route: ActivatedRoute, private router: Router) {
      
   }

  popularMovies() {
    this.service.getMostPopularMovies().subscribe(response => this.movies = response);
    console.log(this.movies);
  }
  popularKidsMovies() {
    this.service.getMostPopularKidsMovie().subscribe(response => this.movies = response);
    console.log(this.movies);
  }
  getMovieName(titel: string){
    this.service.searchMovieName(titel).subscribe(response => this.movies = response)
  }
  async toTrailer(movie: IMovie){
    console.log("help plz");
    const path: string = await this.service.getVideoPath(movie.id);
    this.router.navigate(['/view-video', path]);
  }

  async getId(movie: IMovie){
    const pas: string = await this.service.getMovieId(movie.id).toString();
    this.router.navigate(['/movie', pas]);
  }
  async goToCredits(movie: IMovie){
    const pas: string = await this.service.getMovieId(movie.id).toString();
    this.router.navigate(['/credits', pas]);
  }
}
