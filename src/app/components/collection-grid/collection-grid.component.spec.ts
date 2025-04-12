import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionGridComponent } from './collection-grid.component';

describe('CollectionGridComponent', () => {
  let component: CollectionGridComponent;
  let fixture: ComponentFixture<CollectionGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectionGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
