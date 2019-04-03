import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-detailpage',
  templateUrl: 'detailpage.component.html',
  styleUrls: ['../../../app/app.component.scss']
})

export class DetailpageComponent implements OnInit {
  private id: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params["id"];
  }

}



