import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { BackendService, ConfigService } from './services';
import { FetchBackend, HttpClient, HttpContext } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private backend: BackendService
  ) {}

  ngOnInit(): void {
    window.addEventListener('beforeunload', this.endSession.bind(this));
  }

  endSession(event: Event) {
    event.preventDefault();
    const url = this.backend.getURL('session', 'end', {sessionid: ConfigService.get('sessionId')});
    fetch(url, {
      headers: {
        sessionid: ConfigService.get('sessionId')
      },
      method: 'POST',
      keepalive: true,
    })
  }
}
