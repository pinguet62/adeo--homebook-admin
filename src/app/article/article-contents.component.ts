import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import * as markdown from 'markdown-it';

const markdownRenderer = markdown({html: true});

@Component({
  selector: 'app-article-contents',
  template: `
    <div #contentHtml></div>
  `
})
export class ArticleContentsComponent implements OnChanges {

  @Input() markdown: string;

  @ViewChild('contentHtml', {read: ElementRef}) contentHtml: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if ('markdown' in changes) {
      this.generateHtml();
    }
  }

  private generateHtml() {
    if (this.contentHtml && this.markdown) {
      this.contentHtml.nativeElement.innerHTML = markdownRenderer.render(this.markdown);
    }
  }

}
