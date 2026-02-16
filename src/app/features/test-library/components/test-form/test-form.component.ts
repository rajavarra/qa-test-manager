import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TestDataService } from '../../../../core/services/test-data.service';

@Component({
  selector: 'qtm-test-form',
  imports: [FormsModule],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.css'
})
export class TestFormComponent {
  private testService = inject(TestDataService);

  newTitle = '';
  newPriority: 'high' | 'medium' | 'low' = 'medium';

  createTest() {
    if (this.newTitle.trim()) {
      this.testService.addTest({
        title: this.newTitle,
        priority: this.newPriority
      });
      this.newTitle = ''; // Reset
    }
  }
}
