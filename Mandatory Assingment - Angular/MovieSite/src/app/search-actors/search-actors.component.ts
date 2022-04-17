import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IActor } from '../IActor';
import { MovieService } from '../MovieService';

@Component({
  selector: 'app-search-actors',
  templateUrl: './search-actors.component.html',
  styleUrls: ['./search-actors.component.css']
})
export class SearchActorsComponent implements OnInit {

  search: number = 0;
  actor: IActor | undefined;
  constructor(private service: MovieService, private route: ActivatedRoute, private router: Router) {
    this.search = route.snapshot.params['id'];
    this.getActor()
   }

  ngOnInit(): void {

  }

  getActor(){
    this.service.getActor(this.search).subscribe(response => this.actor = response)
    console.log(this.actor)
  }
}
