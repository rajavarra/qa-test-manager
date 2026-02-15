import { computed, effect, Injectable, signal } from '@angular/core';
import { TestCase } from '../../models/test-case.model';

@Injectable({
  providedIn: 'root'
})
export class TestDataService {

  private testCasesSignal = signal<TestCase[]>(this.loadFromStorage());
  // using effect to read and store from local storage
  constructor() {
    // this runs every time testCasesSignal changes!
    effect(() => {
      localStorage.setItem('qa_tests', JSON.stringify(this.testCasesSignal()))
    })
  }

  private loadFromStorage(): TestCase[] {
    const saved = localStorage.getItem('qa_tests');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Login Test', description: 'Check login', status: 'passed', priority: 'high' },
      { id: 2, title: 'Signup Test', description: 'Check signup', status: 'pending', priority: 'medium' },
      { id: 3, title: 'Reset Password', description: 'Check reset', status: 'failed', priority: 'low' }
    ];
  }

  // Expose a rea-only version
  readonly testCases = this.testCasesSignal.asReadonly();

  totalTests = computed(() => this.testCases().length);

  // only service cab update the data
  updateStatus(testId: number, newStatus: 'passed' | 'failed' | 'pending'): void {
    this.testCasesSignal.update((allTests: TestCase[]) =>
      allTests.map((t: TestCase) => t.id === testId ? { ...t, status: newStatus } : t)
    );
  }

  passedTestsCount = computed(() => this.testCases().filter((t: TestCase) => t.status === 'passed').length);

  // Filtering the test cases

  filterStatus = signal<'all' | 'failed'>('all');

  // creating the search signal
  searchTerm = signal('');

  filteredTestCases = computed(() => {
    const allTests = this.testCasesSignal();
    const filter = this.filterStatus();
    const search = this.searchTerm().toLowerCase();

    // search by status
    let results = filter === 'all' ? allTests : allTests.filter((t: TestCase) => t.status === 'failed');

    // filter by search storm
    if (search) {
      results = results.filter((t: TestCase) => t.title.toLowerCase().includes(search))
    }

    return results;

  })

  setFilter(newFilter: 'all' | 'failed') {
    this.filterStatus.set(newFilter);
  }

  // method to update search
  updateSearch(query: string) {
    this.searchTerm.set(query)
  }

  // removes test from list
  deleteTest(id: number): void {
    this.testCasesSignal.update((allTests: TestCase[]) => allTests.filter((t: TestCase) => t.id !== id));
  }

  // add new test
  addTest(test: Partial<TestCase>) {
    const newTest: TestCase = {
      id: Date.now(), // generate a unique ID
      title: test.title || 'Untitled Test',
      status: 'pending',
      priority: test.priority || 'medium',
      description: test.description || ''
    };

    this.testCasesSignal.update((allTests: TestCase[]) => [...allTests, newTest]);
  }
}
