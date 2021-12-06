import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule],
      providers: [provideMockStore()],
    }).compileComponents();
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

  describe('When token exists in local storage', () => {
    it('LoggedIn should be true', () => {
      localStorage.clear();
      localStorage.setItem('token', '123');
      expect(component.loggedIn).toBeTruthy();
    });
  });
});
