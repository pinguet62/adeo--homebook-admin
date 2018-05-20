import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import * as markdown from 'markdown-it';

const markdownRenderer = markdown({html: true});

@Component({
  selector: 'app-article-contents',
  template: `
    <div #contentsHtml></div>
  `
})
export class ArticleContentsComponent implements OnChanges {

  @Input() markdown: string;

  @ViewChild('contentsHtml', {read: ElementRef}) contentsHtml: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if ('markdown' in changes) {
      this.generateHtml();
    }
  }

  private generateHtml() {
    if (this.contentsHtml && this.markdown) {
      this.contentsHtml.nativeElement.innerHTML = markdownRenderer.render(this.markdown);
    }
  }

}
