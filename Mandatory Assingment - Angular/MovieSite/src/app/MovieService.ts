import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empty, NEVER, Observable } from 'rxjs';
import { map, first, mergeMap } from 'rxjs/operators';

import { MoviesComponent } from './movies/movies.component';
import { IMovie } from './imovie';
import {IVideo} from './IVideo';
import { ITheMovie } from './ItheMovie';
import { isNull, nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { TheMovieComponent } from './the-movie/the-movie.component';
import { IActor } from './IActor';

interface IMovieData { results: IMovie[];}
interface IActorData {cast: IActor[];}

export interface IVideoData { results: IVideo[];}
export interface IdaMovieData { results: ITheMovie[];}




@Injectable()
export class MovieService{
    private movies: IMovie[] | undefined;
    private key: string | undefined;
    private movie: ITheMovie[] | undefined;
    private actors: IActor[] | undefined;

    constructor(private http: HttpClient){ }


    public getMovies(): Observable<IMovie[]> {
      // tslint:disable-next-line: max-line-length
          return this.http.get<IMovieData>('http://api.themoviedb.org/3/search/movie?query=skyfall&api_key=81c50c197b83129dd4fc387ca6c8c323')
          .pipe(map(movies => {
             return movies.results.filter(movie => movie.poster_path !== null).map(movie => {
              return { id: movie.id,
                       title: movie.title,
                       poster_path: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path,
                       adult: movie.adult,
                       overview: movie.overview,
                       release_date: movie.release_date,
                       genres: movie.genres,
                       vote_average: movie.vote_average } as IMovie; });
      
          }));
        }  

    public getMovie(title: string): Observable<IMovie[]> {
      // tslint:disable-next-line: max-line-length
          return this.http.get<IMovieData>('http://api.themoviedb.org/3/search/movie?query=' + title + '&api_key=81c50c197b83129dd4fc387ca6c8c323')
          .pipe(map(movies => {
             return movies.results.filter(movie => movie.poster_path !== null).map(movie => {
              return { id: movie.id,
                       title: movie.title,
                       poster_path: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path,
                       adult: movie.adult,
                       overview: movie.overview,
                       release_date: movie.release_date,
                       genres: movie.genres,
                       vote_average: movie.vote_average } as IMovie; });
      
          }));
        }  
        public getMostPopularMovies(): Observable<IMovie[]> {
          // tslint:disable-next-line: max-line-length
              return this.http.get<IMovieData>('http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=81c50c197b83129dd4fc387ca6c8c323')
              .pipe(map(movies => {
                  return movies.results.filter(movie => movie.poster_path !== null).map(movie => {
                  return { id : movie.id,
                           title : movie.title,
                           poster_path : 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path,
                           adult : movie.adult,
                           overview : movie.overview,
                           release_date : movie.release_date,
                           genres : movie.genres,
                           vote_average : movie.vote_average } as IMovie; });
      
              }));
            }
            public getMostPopularKidsMovie(): Observable<IMovie[]> {
              // tslint:disable-next-line: max-line-length
                  const v = this.http.get<IMovieData>('http://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=81c50c197b83129dd4fc387ca6c8c323')
                  .pipe(map(movies => {
                      return movies.results.filter(movie => movie.poster_path !== null).map(movie => {
                      return { id : movie.id,
                               title : movie.title,
                               poster_path : 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path,
                               adult : movie.adult,
                               overview : movie.overview,
                               release_date : movie.release_date,
                               genres : movie.genres,
                               vote_average : movie.vote_average } as IMovie; });
          
                  }));
                  console.log(v);
                  return v;
                }
            public searchMovieName(title: string): Observable<IMovie[]> {
              return this.http.get<IMovieData>('http://api.themoviedb.org/3/search/movie?query=' + title + '&api_key=81c50c197b83129dd4fc387ca6c8c323').pipe(map(movies => {
                return movies.results.filter(movie => movie.poster_path !== null).map(movie => {
                  return{ 
                    id: movie.id,
                    title: movie.title,
                    poster_path: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path,
                    adult: movie.adult,
                    overview: movie.overview,
                    release_date: movie.release_date,
                    genres: movie.genres,
                    vote_average: movie.vote_average
                  } as IMovie;
                })
              }))
            }

            public getMovieCredits(movieId: number): Observable<IActor[]> {
              return this.http.get<IActorData>('https://api.themoviedb.org/3/movie/'+ movieId + '/credits?api_key=81c50c197b83129dd4fc387ca6c8c323&language=en-US').pipe(map(actors => {
                return actors.cast.map(actor => {
                  return {
                    id: actor.id,
                    known_for_department: actor.known_for_department,
                    name: actor.name,
                    popularity: actor.popularity, 
                    character: actor.character,
                    profile_path: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + actor.profile_path,
                  } as IActor;
                })
              }))
            }

            public getActor(actorId: number): Observable<IActor> {
              return this.http.get<IActor>('https://api.themoviedb.org/3/person/' + actorId + '?api_key=81c50c197b83129dd4fc387ca6c8c323&language=en-US').pipe(map(actor => {
                return{
                id: actor.id,
                known_for_department: actor.known_for_department,
                name: actor.name,
                popularity: actor.popularity, 
                character: actor.character,
                profile_path: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + actor.profile_path,
                biography: actor.biography,
                also_known_as: actor.also_known_as,
                birthday: actor.birthday,
                deathday: actor.deathday,
                imdb_id: 'https://www.imdb.com/name/' + actor.imdb_id + '/',
                homepage: actor.homepage,
                place_of_birth: actor.place_of_birth
                } as IActor

              }))
            }
            public getVideo(id: number){
              const video = this.http.get<IVideoData>('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=81c50c197b83129dd4fc387ca6c8c323').
              pipe(
              map(videos => videos.results), 
              mergeMap(processArray => processArray.filter(x => x.key !== null)),
              first()
              );
              return video;
            }

            public async getVideoPath(id: number): Promise<string> {
              console.log('getvideo1: ' + id);
              const videos = await this.http.get<IVideoData>('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=81c50c197b83129dd4fc387ca6c8c323').toPromise();
              if(videos){
                console.log(videos)
                return videos.results[0].key;
              }
              return "";
            }

            public getMovieId(id: number){
              return id;
            }


            public getTheMovie(id: number){
              return this.http.get<ITheMovie>('https://api.themoviedb.org/3/movie/'+id+'?&api_key=81c50c197b83129dd4fc387ca6c8c323').pipe(map(movie => { return {
                id: movie.id,
                title: movie.title,
                poster_path: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path,
                adult: movie.adult,
                overview: movie.overview,
                tagline: movie.tagline,
                genres: movie.genres,
                site: movie.site,
                owned: movie.owned,
                budget: movie.budget,
                originalLang: movie.originalLang,
                popularity: movie.popularity,
                production: movie.production,
                revenue: movie.revenue,
                runtime: movie.runtime,
                release_date: movie.release_date
              }}))
            }

            public async getTheMovie1(id: number): Promise<ITheMovie> {
              const movie1 = await this.http.get<IdaMovieData>('https://api.themoviedb.org/3/movie/'+id+'?&api_key=81c50c197b83129dd4fc387ca6c8c323').toPromise();  
              console.log(movie1?.results[0])
              if(movie1){
                return movie1?.results[0];
              }
              return null as any
            }
          
  //         public getTheMovie2(id: number): Promise<ITheMovie> {
  //           return this.http.get<ITheMovie>('https://api.themoviedb.org/3/movie/'+id+'?&api_key=81c50c197b83129dd4fc387ca6c8c323').toPromise().
  //           pipe(
  //             map(movie => {
  //               return {
  //                 id: movie.id,
  //                 title: movie.title,
  //                 poster_path: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path,
  //                 adult: movie.adult,
  //                 overview: movie.overview,
  //                 tagline: movie.tagline,
  //                 genres: movie.genres,
  //                 website: movie.site,
  //                 oweed: movie.owned,
  //                 budget: movie.budget,
  //                 originalLang: movie.originalLang,
  //                 popularity: movie.popularity,
  //                 production: movie.production,
  //                 revenue: movie.revenue,
  //                 runtime: movie.runtime,
  //                 release_date: movie.release_date
  //               } as ITheMovie
  //             })
  //           );            
  //         }

}


           //     id: movie.id,
           //     title: movie.title,
           //     poster_path: 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path,
           //     adult: movie.adult,
           //     overview: movie.overview,
           //     tagline: movie.tagline,
           //     genres: movie.genres,
           //     website: movie.site,
           //     oweed: movie.owned,
           //     budget: movie.budget,
           //     originalLang: movie.originalLang,
           //     popularity: movie.popularity,
           //     production: movie.production,
           //     revenue: movie.revenue,
           //     runtime: movie.runtime,
           //     release_date: movie.release_date