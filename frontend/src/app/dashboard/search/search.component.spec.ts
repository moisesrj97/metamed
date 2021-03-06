import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { SearchComponent } from './search.component';

const initialState = {
  darkMode: {
    darkMode: true,
  },
};

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When emitSearch is called', () => {
    it('search emit should be called', () => {
      spyOn(component.search, 'emit');
      component.emitSearch({
        target: { value: 'test' } as unknown as HTMLInputElement,
      } as unknown as Event);

      expect(component.search.emit).toHaveBeenCalled();
    });
  });
});
