import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private gifService: GifsService) {

  }


  public tagHistory: string[] = this.gifService.tagHistory;

  get tags(): string[] {
    return this.gifService.tagHistory;
  }

  public searchTag(tag: string) {
    this.gifService.searchTag(tag);
  }

}
