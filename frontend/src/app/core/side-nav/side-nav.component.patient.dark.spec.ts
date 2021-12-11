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
      role: 'Patient',
      professionals: [
        {
          _id: '123',
          chatRef: { _id: '123', messages: [{ read: false, to: '123' }] },
        },
      ],
    },
    darkMode: {
      darkMode: false,
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

  describe('When there aren´t unread messages', () => {
    it('should create with icon unmarked', () => {
      expect(component.menuItems[2].imagePath).toBe(
        '../../../assets/images/messagesNotification.png'
      );
    });
  });
});
