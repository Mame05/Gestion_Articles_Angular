import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  imports: [CommonModule],
  standalone: true,

  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: any;
  comments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const articleId = +this.route.snapshot.paramMap.get('id')!;
    this.loadArticle(articleId);
    this.loadComments(articleId);
  }

  loadArticle(id: number): void {
    this.articleService.getArticle(id).subscribe(
      data => {
        this.article = data;
      },
      error => {
        console.error('Erreur lors de la récupération de l\'article', error);
      }
    );
  }

  loadComments(postId: number): void {
    this.articleService.getComments(postId).subscribe(
      data => {
        this.comments = data;
      },
      error => {
        console.error('Erreur lors de la récupération des commentaires', error);
      }
    );
  }
}


