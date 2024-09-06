import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="modal" *ngIf="showModal">
      <div class="modal-content">
        <h2 class="text-2xl font-semibold mb-4">{{ task.id ? 'Edit' : 'New' }} Task</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="mb-4">
            <label for="assigned-to" class="block text-sm font-medium text-gray-700">Assigned To <span class="text-red-500">*</span></label>
            <select id="assigned-to" [(ngModel)]="task.assignedTo" name="assignedTo" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
              <option value="User 1">User 1</option>
              <option value="User 2">User 2</option>
              <option value="User 3">User 3</option>
              <option value="User 4">User 4</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="status" class="block text-sm font-medium text-gray-700">Status <span class="text-red-500">*</span></label>
            <select id="status" [(ngModel)]="task.status" name="status" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="due-date" class="block text-sm font-medium text-gray-700">Due Date</label>
            <input id="due-date" type="date" [(ngModel)]="task.dueDate" name="dueDate" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          </div>
          <div class="mb-4">
            <label for="priority" class="block text-sm font-medium text-gray-700">Priority <span class="text-red-500">*</span></label>
            <select id="priority" [(ngModel)]="task.priority" name="priority" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" [(ngModel)]="task.comments" name="comments" rows="3" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" class="px-4 py-2 btn-yellow rounded" (click)="onClose()">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: rgba(0, 0, 0, 0.5)
      display: flex
      justify-content: center
      align-items: center

    .modal-content
      background-color: white
      padding: 2rem
      border-radius: 0.5rem
      width: 100%
      max-width: 500px

    .btn-yellow
      background-color: #fef3c7
      border-color: #fde68a
      &:hover
        background-color: #fde68a
  `]
})
export class TaskFormComponent {
  @Input() showModal = false;
  @Input() task: any = {};
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveTask = new EventEmitter<any>();

  onClose() {
    this.closeModal.emit();
  }

  onSubmit() {
    this.saveTask.emit(this.task);
  }
}
