import {
  DebugElement,
  Directive,
  EventEmitter,
  HostListener,
  Output,
  Pipe,
  PipeTransform,
  Predicate
} from '@angular/core';
import {MatIcon} from '@angular/material';
import {By} from '@angular/platform-browser';

export function buttonMatIcon(icon: string): Predicate<DebugElement> {
  return and(By.css('button.mat-icon-button'), containsMatIcon(icon));
}

function and(...predicates: Predicate<DebugElement>[]): Predicate<DebugElement> {
  return (it) => {
    for (const predicate of predicates) {
      if (!predicate(it)) {
        return false;
      }
    }
    return true;
  };
}

/**
 * Test if the {@link DebugElement} contains (into any direct or indirect child) the {@link MatIcon}.
 * Should be used with restrictive query, otherwise all parent {@link DebugElement} will match.
 *
 * @example
 * <parent>
 *   <button>
 *     <span>
 *       <mat-icon>research</mat-icon>
 *     </span>
 *   </button>
 *   <other>
 *     <mat-icon>ignored</mat-icon>
 *   <other>
 * </parent>
 *
 * fixture.debugElement.queryAll( containsMatIcon('research') )
 * // return ['<parent>', '<button>', '<span>']
 *
 * fixture.debugElement.query(By.css('button'))
 *                     .query( containsMatIcon('research') )
 * // return ['<button>']
 *
 * fixture.debugElement.queryAll(and(
 *   By.css('button'),
 *   containsMatIcon('research')
 * ))
 * // return ['<button>']
 */
function containsMatIcon(icon: string): Predicate<DebugElement> {
  return (it: DebugElement) => {
    const debugElement = it.query(By.css('mat-icon'));
    return debugElement && debugElement.nativeElement.innerText === icon;
  };
}

/** Make {@link FileReader} synchronous, and spy {@link EventTarget#result}. */
export function spyFileReaderSync(result: string) {
  spyOn(FileReader.prototype, 'readAsDataURL').and.callFake(function () {
    const event: ProgressEvent = {target: {result}} as any as ProgressEvent;
    this.onload(event);
  });
}

@Directive({
  selector: '[confirmedClick]'
})
export class DisabledConfirmDialogDirective {

  @Output('confirmedClick') confirmedClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
    this.confirmedClick.emit(event);
  }

}

@Pipe({
  name: 'translate'
})
export class MockedTranslatePipe implements PipeTransform {
  transform(value: string) {
    return value;
  }
}
