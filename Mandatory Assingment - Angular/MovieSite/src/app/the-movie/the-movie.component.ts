import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITheMovie } from '../ItheMovie';
import { MovieService } from '../MovieService';

@Component({
  selector: 'app-the-movie',
  templateUrl: './the-movie.component.html',
  styleUrls: ['./the-movie.component.css']
})


export class TheMovieComponent implements OnInit {

  movieId: number;
  movie: ITheMovie | undefined;

  constructor(private service: MovieService, private route: ActivatedRoute, private router: Router) {
    this.movieId = this.route.snapshot.params['id'];
    this.service.getTheMovie(this.movieId).subscribe(result  =>  this.movie = result);   
    console.log(this.movie)
   }

  ngOnInit(): void {
    //this.movie = this.service.getTheMovie(this.movieId)
    this.service.getTheMovie(this.movieId).subscribe(result  =>  this.movie = result);   
    console.log(this.movie)
  }
  GetMovieData() {
    this.service.getTheMovie(this.movieId).subscribe(result  =>  this.movie = result);  
    console.log(this.movie);
  }
} 
