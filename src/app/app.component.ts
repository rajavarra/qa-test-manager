import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestListComponent } from './features/test-library/test-list/test-list.component';

@Component({
  selector: 'qtm-root',
  imports: [TestListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'qa-test-manager';
}
