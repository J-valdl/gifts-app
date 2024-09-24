import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {
  constructor() { }

  private _tagsHistory: string[] = []
  private apiKey: string = 'et1SAa16WV7v07PWr1zyW2HeRDY1ekSg'

  get tagHistory() {
    return [...this._tagsHistory];
  }

  public searchTag(tag: string): void {

    if (tag.length === 0)
      return;

    this.organizeHistory(tag);

  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(ele => ele !== tag)
    }

    this._tagsHistory.unshift(tag)
    this._tagsHistory = this._tagsHistory.splice(0, 10)

  }
}
