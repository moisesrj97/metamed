import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SideNavComponent } from './side-nav.component';

import { routes } from '../../app-routing.module';
import { Router } from '@angular/router';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideNavComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  /* describe('Router thing', () => {
    it('Router thing', () => {
      router.navigate(['/']);
    });
  }); */
});
