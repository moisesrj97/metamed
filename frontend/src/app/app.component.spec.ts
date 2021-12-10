import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { CoreModule } from './core/core.module';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { LayoutComponent } from './core/layout/layout.component';
import { routes } from './app-routing.module';
import { of } from 'rxjs';
import { WebsocketService } from './services/websocket/websocket.service';
import { config } from './services/websocket/websocket.service.spec';
import { SocketIoModule } from 'ngx-socket-io';

const initialState = {
  darkMode: {
    darkMode: true,
  },
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CoreModule,
        SocketIoModule.forRoot(config),
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        LayoutComponent,
      ],
      providers: [provideMockStore({ initialState }), WebsocketService],
    }).compileComponents();

    localStorage.clear();
    localStorage.setItem('token', 'token');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    spyOn(window, 'matchMedia').and.returnValue({
      matches: true,
    } as unknown as MediaQueryList);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('.navbar__header-group-title')?.textContent
    ).toContain('MetaMed');
  });

  describe('Testing asynchronous routes', () => {
    it('Testing asynchronous routes', () => {
      routes.forEach((route, index) => {
        if (index < routes.length - 1) {
          expect(route.loadChildren?.()).toBeDefined();
        }
      });
    });
  });

  describe('If token exists', () => {
    it('Auth service should be called', () => {
      const fixture = TestBed.createComponent(AppComponent);
      spyOn(
        fixture.componentInstance.authService,
        'loginWithToken'
      ).and.returnValue(
        of({
          _id: 'aaa',
          name: 'aaa',
          surname: 'aaa',
          role: 'aaa',
          email: 'aaa',
          profilePicture: 'aaa',
        })
      );

      fixture.detectChanges();
      expect(
        fixture.componentInstance.authService.loginWithToken
      ).toHaveBeenCalled();
    });
  });
});
