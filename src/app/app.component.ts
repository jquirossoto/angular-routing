import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { AuthService } from './user/auth.service';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  loading = true;
  pageTitle = 'Acme Product Management';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  constructor(private authService: AuthService, private messageService: MessageService, private router: Router) {
    router.events.subscribe((event:Event) => {
      this.checkRouterEvent(event);
    })
  }

  checkRouterEvent(event:Event) {
    if(event instanceof NavigationStart) {
      this.loading = true
    }
    if(event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
      this.loading = false;
    }
  }

  showMessages() {
    this.router.navigate([{outlets: {popup: 'messages'}}]);
    this.messageService.isDisplayed = true;
  }

  hideMessages() {
    this.router.navigate([{outlets: {popup: null}}]);
    this.messageService.isDisplayed = false;
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('welcome');
  }
}
