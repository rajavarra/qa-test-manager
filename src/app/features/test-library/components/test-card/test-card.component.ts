import { Component, input, output } from '@angular/core';
import { TestCase } from '../../../../models/test-case.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'qtm-test-card',
  imports: [CommonModule],
  templateUrl: './test-card.component.html',
  styleUrl: './test-card.component.css'
})
export class TestCardComponent {
  // the data being passed down from the parent
  test = input.required<TestCase>();

  //outputs for the parent to listen to
  statusChange = output<'passed' | 'failed'>();
  delete = output<void>();

}
