import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SideNavComponent } from './side-nav.component';

import { routes } from '../../app-routing.module';
import { Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

const myWindow = {
  location: {
    reload() {
      return 'something';
    },
  },
};

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;
  let router: Router;
  let store: MockStore;
  let initialState = {
    user: {
      _id: '123',
      patients: [
        {
          _id: '123',
          chatRef: { _id: '123', messages: [{ read: false, to: '123' }] },
        },
      ],
    },
    darkMode: {
      darkMode: true,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideNavComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    component.compWindow = myWindow as unknown as Window;
    fixture.detectChanges();
  });

  afterEach(() => {
    store?.resetSelectors();
  });

  describe('When there are unread messages', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
      expect(
        [
          '../../../assets/images/messagesNotification.png',
          '../../../assets/images/messagesNotificationDark.png',
        ].includes(component.menuItems[2].imagePath)
      ).toBeTrue();
    });
  });

  describe('When closeNav is called', () => {
    it('Event should be emited', () => {
      spyOn(component.toggleNav, 'next');

      component.closeNav();

      expect(component.toggleNav.next).toHaveBeenCalled();
    });
  });

  describe('When clicks outside', () => {
    it('closeNav should be called', async () => {
      spyOn(component, 'closeNav');
      component.onGlobalClick({ target: { className: 'toggle' } });
      expect(component.closeNav).not.toHaveBeenCalled();
      component.onGlobalClick({ target: { className: 'adsad' } });
      expect(component.closeNav).toHaveBeenCalled();
    });
  });

  describe('When store has a valid _id', () => {
    it('isRendered should be true', () => {
      expect(component.isRendered).toBe(true);
    });
  });

  describe('When logout is called', () => {
    it('Token service, store and window should be called', () => {
      spyOn(component.tokenService, 'deleteTokenFromLocalStorage');
      spyOn(component.compWindow.location, 'reload').and.callFake(() => {});
      component.logout();
      expect(
        component.tokenService.deleteTokenFromLocalStorage
      ).toHaveBeenCalled();
    });
  });
});
