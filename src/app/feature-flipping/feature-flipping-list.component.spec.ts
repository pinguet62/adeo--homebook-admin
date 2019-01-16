import {HttpErrorResponse} from '@angular/common/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatDialogModule, MatSlideToggleModule, MatTableModule} from '@angular/material';
import {By} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {of, throwError} from 'rxjs';
import {AlertLevel, AlertService} from '../shared';
import {DisabledConfirmDialogDirective, MockedTranslatePipe} from '../test-utils.spec';
import {FeatureFlippingListComponent} from './feature-flipping-list.component';
import {FeatureFlippingService, IFeature} from './feature-flipping.service';

describe('feature-flipping/feature-flipping-list.component', () => {
  // service dependencies
  let translateService: TranslateService;
  let alertService: jasmine.SpyObj<AlertService>;
  let featureFlippingService: jasmine.SpyObj<FeatureFlippingService>;
  beforeEach(() => {
    translateService = {get: x => of(x)} as TranslateService;
    alertService = jasmine.createSpyObj(AlertService.name, Object.keys(AlertService.prototype));
    featureFlippingService = jasmine.createSpyObj(FeatureFlippingService.name, Object.keys(FeatureFlippingService.prototype));
  });

  // build component
  let fixture: ComponentFixture<FeatureFlippingListComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FeatureFlippingListComponent,
        // mocks
        MockedTranslatePipe,
        DisabledConfirmDialogDirective,
      ],
      providers: [
        {provide: TranslateService, useValue: translateService},
        {provide: AlertService, useValue: alertService},
        {provide: FeatureFlippingService, useValue: featureFlippingService},
      ],
      imports: [FormsModule, MatDialogModule, MatSlideToggleModule, MatTableModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
  }));

  function getSlideToggle() {
    const tableElement = fixture.debugElement.query(By.css('table')).nativeElement as HTMLTableElement;
    return tableElement.querySelector<HTMLUnknownElement>('mat-slide-toggle');
  }

  function clickOnSlideToggle() {
    getSlideToggle().querySelector<HTMLElement>('label').click();
    fixture.detectChanges();
  }

  function getSlideToggleValue() {
    switch (getSlideToggle().getAttribute('ng-reflect-model')) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        throw new Error(`Invalid boolean value`);
    }
  }

  describe('"enabled" switch', () => {
    it('When success: switch value', fakeAsync(() => {
      featureFlippingService.list.and.returnValue(of<IFeature[]>([{key: 'A', enabled: false}]));
      featureFlippingService.update.and.callFake((it: IFeature) => of(it));

      fixture = TestBed.createComponent(FeatureFlippingListComponent);
      fixture.detectChanges();

      // false > true
      clickOnSlideToggle();
      expect(fixture.componentInstance.features[0].enabled).toEqual(true);
      expect(getSlideToggleValue()).toEqual(true);

      // true > false
      clickOnSlideToggle();
      expect(fixture.componentInstance.features[0].enabled).toEqual(false);
      expect(getSlideToggleValue()).toEqual(false);
    }));

    it('When error: keep initial value', fakeAsync(() => {
      featureFlippingService.list.and.returnValue(of<IFeature[]>([{key: 'A', enabled: false}]));
      featureFlippingService.update.and.returnValue(throwError(new HttpErrorResponse({status: 500})));

      fixture = TestBed.createComponent(FeatureFlippingListComponent);
      fixture.detectChanges();

      clickOnSlideToggle();

      expect(alertService.show).toHaveBeenCalledWith(jasmine.any(String), AlertLevel.ERROR);
      expect(fixture.componentInstance.features[0].enabled).toEqual(false);
      expect(getSlideToggleValue()).toEqual(false);
    }));
  });

  describe('Delete', () => {
    xit('Should call webservice & remove from list');

    xit('When webservice error: should not delete entity');
  });

  describe('Create', () => {
    xit('Should call webservice & append to list');

    xit('When webservice error: should not add entity');
  });
});
