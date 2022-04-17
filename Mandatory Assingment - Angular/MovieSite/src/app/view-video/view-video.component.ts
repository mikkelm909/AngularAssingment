import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../MovieService';

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.css']
})
export class ViewVideoComponent implements OnInit {
  url: SafeResourceUrl | undefined;
  private path: string;

  constructor(private sanitizer: DomSanitizer, private service: MovieService, private route: ActivatedRoute, private router: Router) {
      this.path = this.route.snapshot.params['path'];
   }

  ngOnInit(){    
    console.log("badabing")
    this.path = "http://www.youtube.com/embed/" + this.path;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.path);
    
  }

  

}
