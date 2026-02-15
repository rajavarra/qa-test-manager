import { Component, input, output } from '@angular/core';
import { TestCase } from '../../../../models/test-case.model';

@Component({
  selector: 'qtm-test-card',
  imports: [],
  templateUrl: './test-card.component.html',
  styleUrl: './test-card.component.css'
})
export class TestCardComponent {
  test = input.required<TestCase>();

  //outputs for the parent to listen to
  statusChange = output<'passed' | 'failed'>();
  delete = output<void>();

}
