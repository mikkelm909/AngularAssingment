import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieService } from './MovieService';
import { AppRouterModule } from './app-router/appRouterModule';
import { ViewVideoComponent } from './view-video/view-video.component';
import { TheMovieComponent } from './the-movie/the-movie.component';
import { SearchActorsComponent } from './search-actors/search-actors.component';
import { MovieCreditsComponent } from './movie-credits/movie-credits.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    ViewVideoComponent,
    TheMovieComponent,
    SearchActorsComponent,
    MovieCreditsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRouterModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }