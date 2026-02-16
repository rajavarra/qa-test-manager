import { Component, inject } from '@angular/core';
import { TestDataService } from '../../../core/services/test-data.service';
import { FormsModule } from '@angular/forms';
import { TestCardComponent } from "../components/test-card/test-card.component";
import { TestFormComponent } from "../components/test-form/test-form.component";

@Component({
  selector: 'qtm-test-list',
  imports: [FormsModule, TestCardComponent, TestFormComponent],
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.css'
})
export class TestListComponent {
  private testService = inject(TestDataService);



  testCases = this.testService.filteredTestCases;
  totalTests = this.testService.totalTests;
  passedTestsCount = this.testService.passedTestsCount;
  currentFilter = this.testService.filterStatus;


  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'blue';
      default: return 'gray';
    }
  }

  changeStatus(id: number, status: 'passed' | 'failed' | 'pending') {
    this.testService.updateStatus(id, status);
  }

  applyFilter(filter: 'all' | 'failed') {
    this.testService.setFilter(filter);
  }
  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.testService.updateSearch(value);
  }

  onDelete(id: number, title: string) {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      this.testService.deleteTest(id);
    }
  }
}
