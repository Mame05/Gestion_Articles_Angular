/*import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule,HttpClientModule, RouterLink, ReactiveFormsModule],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css'
})
export class ArticleFormComponent implements OnInit{
  @Output() articleAdded = new EventEmitter<void>();
  articleForm: FormGroup;
  isEditing: boolean = false;
  articleId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.articleId = +id;
        this.loadArticle(+id)
      }
    });
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

    const article = this.articleForm.value;

    if (this.isEditing) {
      this.articleService.updateArticle(this.articleId!, article).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.articleService.addArticle(article).subscribe((response) => {
        console.log('Article added successfully', response);
        this.articleAdded.emit(); // Émettre l'événement
        this.router.navigate(['/']);
      });
    }
  }
  
 
}*/

import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  @Input() articleId: number | null = null;
  @Output() articleAdded = new EventEmitter<void>();
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

    const article = this.articleForm.value;

    if (this.isEditing) {
      this.articleService.updateArticle(this.articleId!, article).subscribe(() => {
        console.log('Article updated successfully');
        this.articleAdded.emit(); // Émettre l'événement
        this.closeForm();
      });
    } else {
      this.articleService.addArticle(article).subscribe((response) => {
        console.log('Article added successfully', response);
        this.articleAdded.emit(); // Émettre l'événement
        this.closeForm();
      });
    }
  }

  closeForm(): void {
    this.formClose.emit();
  }
}


