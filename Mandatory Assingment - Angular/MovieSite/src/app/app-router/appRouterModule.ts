import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from '../movies/movies.component';
import { ViewVideoComponent } from '../view-video/view-video.component';
import { TheMovieComponent } from '../the-movie/the-movie.component';
import { SearchActorsComponent } from '../search-actors/search-actors.component';
import { MovieCreditsComponent } from '../movie-credits/movie-credits.component';


const appRoutes: Routes = [
    {path: 'movies', component: MoviesComponent},
    {path: 'view-video/:path', component: ViewVideoComponent},
    {path: 'movie/:id', component: TheMovieComponent},
    {path: 'search-actors/:id', component: SearchActorsComponent},
    {path: 'credits/:id', component: MovieCreditsComponent},
    {path: '', redirectTo: '/movies', pathMatch: 'full'},
    {path: '**', component: MoviesComponent}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRouterModule {}