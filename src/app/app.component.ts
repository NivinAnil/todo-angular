import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskListComponent],
  template: `
    <div class="bg-gray-100 p-4">
      <app-task-list></app-task-list>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Todo App';
}
