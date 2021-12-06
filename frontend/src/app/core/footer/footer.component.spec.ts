import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let store: MockStore;
  let initialState = { user: { _id: '' } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('With no valid _id in the store', () => {
    it('Should set loggedIn to false', () => {
      expect(component.isLoggedIn).toBeFalse();
    });
  });

  describe('With no valid _id in the store', () => {
    it('Should set loggedIn to false', () => {
      TestBed.inject(MockStore).setState({ user: { _id: '123' } });

      expect(component.isLoggedIn).toBeTrue();
    });
  });
});
