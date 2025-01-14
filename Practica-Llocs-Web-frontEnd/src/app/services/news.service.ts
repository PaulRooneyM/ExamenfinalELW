import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private httpClient = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/news';

  constructor() { }

  getNews(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl);
  }

  addNews(news: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, news);
  }

  updateNews(news: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${news._id}`, news);
  }

  deleteNews(newsId: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${newsId}`);
  }
}
