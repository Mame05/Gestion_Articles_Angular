import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../post'; // Importez l'interface Article
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ArticleFormComponent } from '../article-form/article-form.component';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink, ArticleFormComponent],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  showForm: boolean = false;
  selectedArticleId: number | null = null;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadArticles();

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.selectedArticleId = +id;
        this.showForm = true;
      }
    });
  }

  loadArticles(): void {
    this.articleService.getArticles().subscribe(
      data => {
        this.articles = data;
      },
      error => {
        console.error('Erreur lors du chargement des articles', error);
      }
    );
  }

  showAddForm(): void {
    this.selectedArticleId = null;
    this.showForm = true;
  }

  hideForm(): void {
    this.showForm = false;
    this.selectedArticleId = null;
  }

  onArticleAdded(article: Article): void {
    if (this.selectedArticleId) {
      // Mise à jour de l'article existant
      const index = this.articles.findIndex(a => a.id === this.selectedArticleId);
      if (index !== -1) {
        this.articles[index] = article;
      }
    } else {
      // Ajouter le nouvel article en haut de la liste
      this.articles.unshift(article);
    }
    this.hideForm();
  }

  onEditArticle(articleId: number): void {
    this.selectedArticleId = articleId;
    this.showForm = true;
  }

  onDeleteArticle(articleId: number): void {
    this.articleService.deleteArticle(articleId).subscribe(
      () => {
        this.articles = this.articles.filter(article => article.id !== articleId);
      },
      error => {
        console.error('Erreur lors de la suppression de l\'article', error);
      }
    );
  }
}
