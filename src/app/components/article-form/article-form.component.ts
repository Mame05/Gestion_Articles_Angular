import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { HttpClientModule } from '@angular/common/http';
import { Article } from '../post'; // Importez l'interface Article

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  @Input() articleId: number | null = null;
  @Output() articleAdded = new EventEmitter<Article>();
  @Output() formClose = new EventEmitter<void>();

  articleForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.articleId !== null) {
      this.isEditing = true;
      this.loadArticle(this.articleId);
    } else {
      this.isEditing = false;
    }
  }

  loadArticle(id: number): void {
    this.articleService.getArticle(id).subscribe(article => {
      this.articleForm.patchValue({
        title: article.title,
        body: article.body
      });
    });
  }

  onSubmit(): void {
    if (this.articleForm.invalid) {
      return;
    }

    const article: Article = this.articleForm.value;

    if (this.isEditing && this.articleId !== null) {
      // Mise à jour de l'article existant
      this.articleService.updateArticle(this.articleId!, article).subscribe((updatedArticle) => {
        console.log('Article updated successfully');
        this.articleAdded.emit(updatedArticle);
        this.closeForm();
      });
    } else {
      // Ajout d'un nouvel article
      this.articleService.addArticle(article).subscribe((response) => {
        console.log('Article added successfully', response);
        this.articleAdded.emit(response);
        this.closeForm();
      });
    }
  }

  closeForm(): void {
    this.formClose.emit();
  }
}
