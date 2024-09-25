import { HttpClient, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  constructor(private http: HttpClient) {
    this.loadLocalStorage()
  }

  private _tagsHistory: string[] = []
  private apiKey: string = 'et1SAa16WV7v07PWr1zyW2HeRDY1ekSg'
  private url: string = 'http://api.giphy.com/v1/gifs'
  public gifList: Gif[] = [];

  get tagHistory() {
    return [...this._tagsHistory];
  }

  async searchTag(tag: string): Promise<void> {

    if (tag.length === 0)
      return;

    this.organizeHistory(tag);

    // fetch('http://api.giphy.com/v1/gifs/search?api_key=et1SAa16WV7v07PWr1zyW2HeRDY1ekSg&q=' + tag + '&limit=10')
    //   .then(response => response.json())
    //   .then(d ata => console.log(data))

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.url}/search`, { params })
      .subscribe(resp => {
        this.gifList = resp.data;
        //console.log(this.gifList)
      })

  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(ele => ele !== tag)
    }

    this._tagsHistory.unshift(tag)
    this._tagsHistory = this._tagsHistory.splice(0, 10)

    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem("history", JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem("history")) {
      return;
    }

    this._tagsHistory = JSON.parse(localStorage.getItem("history")!);

    if (this._tagsHistory.length > 0)
      this.searchTag(this._tagsHistory[0]);
  }
}
