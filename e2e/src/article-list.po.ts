import {by, element} from 'protractor';

export class ArticleListPage {
  async getArticles(): Promise<{ title: string }[]> {
    return element.all(by.css('mat-list mat-list-item div.mat-list-text p.mat-card-title'))
      .map(it => ({title: it.getText()})) as any as Promise<{ title: string }[]>;
  }
}
