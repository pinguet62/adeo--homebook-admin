import {browser} from 'protractor';

import {LoginService} from '../../src/app/shared/security/login.service';
import {IndexPage} from './index.po';

export const MOCKEND_BACKEND = 'http://localhost:3334'; // see "protractor.config.js" and plugin "mockBackend"

export const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ1c2VycyBtcyIsImppZCI6IlRva2VuIDE1MjgyMTk5MDYiLCJzdWIiOiJsb2dpbiIsInVzZXIiOiI1YTEzZWI5ZmM1NDYzODAwMjcxODFlODAiLCJyb2xlcyI6WyJ1c2Vycy5tYW5hZ2UiLCJub3RpZmljYXRpb24uc2VuZCIsInBhY2thZ2UtbWFuYWdlbWVudC5tYW5hZ2UiXSwiaWF0IjoxNTI4MjE5OTA1fQ.fKlx6tuSuTHsYM44dsfYSzjLmjScfWA33zt_n-OuQYk';

export async function openApp(opts?: { logged?: boolean }): Promise<IndexPage> {
  await browser.get('/'); // "#executeScript()" require a "#get()" call previously

  await browser.executeScript('localStorage.clear();');

  if (opts && opts.logged === true) {
    const key = LoginService.LOCALSTORAGE_JWTTOKEN_KEY;
    await browser.executeScript(`localStorage.setItem('${key}', '${JWT_TOKEN}');`);
  }

  await browser.get('/');
  return new IndexPage();
}
