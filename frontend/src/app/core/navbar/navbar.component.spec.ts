import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let store: MockStore;
  let initialState = { user: { _id: '' } };

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
});
