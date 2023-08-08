import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor(
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    console.log(this.contentService.globalContents());
  }
}
