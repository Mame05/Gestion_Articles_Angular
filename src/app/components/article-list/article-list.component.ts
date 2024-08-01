import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { Article } from '../post';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, ReactiveFormsModule],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  showForm: boolean = false;
  selectedArticleId: number | null = null;
  addForm: FormGroup;

  constructor(
    private articleService: ArticleService,
    private fb: FormBuilder
  ) {
    this.addForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
    });
  }

  showAddForm(): void {
    this.selectedArticleId = null;
    this.showForm = true;
  }

  onEditArticle(articleId: number): void {
    this.selectedArticleId = articleId;
    this.showForm = true;
  }

  hideForm(): void {
    this.showForm = false;
    this.selectedArticleId = null;
  }

  addPost(): void {
    if (this.addForm.valid) {
      const newArticle: Article = this.addForm.value;
      console.log('Article à ajouter:', newArticle);
      this.articleService.addArticle(newArticle).subscribe((article: Article) => {
        this.articles.unshift(article); // Ajouter le nouvel article au début de la liste
        this.addForm.reset(); // Réinitialiser le formulaire
      });
    }
  }

  onDeleteArticle(articleId: number): void {
    this.articleService.deleteArticle(articleId).subscribe(
      () => {
        this.loadArticles(); // Rafraîchir la liste après suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'article', error);
      }
    );
  }
}
