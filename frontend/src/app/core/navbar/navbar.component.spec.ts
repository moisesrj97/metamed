import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { NavbarComponent } from './navbar.component';

const initialState = {
  user: {
    _id: '',
  },
  darkMode: {
    darkMode: true,
  },
};

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When clicking openNav', () => {
    it('It should call toggleNav', () => {
      spyOn(component.toggleNav, 'next');
      component.openNav();

      expect(component.toggleNav.next).toHaveBeenCalled();
    });
  });

  describe('With no valid _id in the store', () => {
    it('Should set loggedIn to false', () => {
      expect(component.loggedIn).toBeFalse();
    });
  });

  describe('With no valid _id in the store', () => {
    it('Should set loggedIn to false', () => {
      TestBed.inject(MockStore).setState({ user: { _id: '123' } });

      expect(component.loggedIn).toBeTrue();
    });
  });

  describe('When toggleDarkMode is executed', () => {
    it('Expect store dispatch to have been called', () => {
      spyOn(component.store, 'dispatch');
      component.toggleDarkMode();
      expect(component.store.dispatch).toHaveBeenCalled();
    });
  });
});
