import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  username: string = '';
  repositories: any[] = [];
  currentPage: number = 1;
  // githubService: any;
  constructor(
    private apiService: ApiService
  ) {}

  loadRepositories() {
    if (this.username) {
      // Calculate the page number based on the current page and items per page (e.g., 10)
      const itemsPerPage = 10;
      const page = this.currentPage;
      const startIndex = (page - 1) * itemsPerPage;

      this.apiService.getRepos(this.username, itemsPerPage, startIndex).subscribe((data: any) => {
        this.repositories = data;
      });
    }
  }

  nextPage() {
    this.currentPage++;
    this.loadRepositories();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadRepositories();
    }
  }

  ngOnInit() {
    // this.getRepos(this.currentPage);
    this.apiService.getUser('johnpapa').subscribe(console.log);
  }
}
