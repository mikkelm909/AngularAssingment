import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheMovieComponent } from './the-movie.component';

describe('TheMovieComponent', () => {
  let component: TheMovieComponent;
  let fixture: ComponentFixture<TheMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheMovieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
