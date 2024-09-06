import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from '../task-form/task-form.component';
import { FilterPipe } from '../filter.pipe';
import {
  LucideAngularModule,
  List,
  Search,
  Edit,
  Trash2,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-angular';

interface Task {
  id: number;
  assignedTo: string;
  status: string;
  dueDate: string;
  priority: string;
  comments: string;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TaskFormComponent,
    FilterPipe,
    LucideAngularModule,
  ],
  template: `
    <div class="w-full max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <i-lucide name="list" class="w-8 h-8 text-red-600 mr-2"></i-lucide>
          <h1 class="text-2xl font-semibold">Tasks</h1>
        </div>
        <div class="text-sm text-gray-500">All Tasks</div>
      </div>
      <div class="text-sm text-gray-500 mb-2">{{ tasks.length }} records</div>
      <div class="flex justify-between mb-4">
        <div class="space-x-2">
          <button
            class="px-4 py-2 btn-yellow rounded"
            (click)="openNewTaskModal()"
          >
            New Task
          </button>
          <button class="px-4 py-2 btn-yellow rounded">Refresh</button>
        </div>
        <div class="relative">
          <input
            type="search"
            placeholder="Search"
            class="pl-8 pr-2 py-1 border rounded"
            [(ngModel)]="searchText"
          />
          <i-lucide
            name="search"
            class="absolute left-2 top-1 h-4 w-4 text-gray-500"
          ></i-lucide>
        </div>
      </div>
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50">
            <th class="w-[40px] p-2"><input type="checkbox" /></th>
            <th class="p-2 text-left">Assigned To</th>
            <th class="p-2 text-left">Status</th>
            <th class="p-2 text-left">Due Date</th>
            <th class="p-2 text-left">Priority</th>
            <th class="p-2 text-left">Comments</th>
            <th class="w-[100px] p-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let task of tasks | filter : searchText">
            <td class="p-2"><input type="checkbox" /></td>
            <td class="p-2 text-blue-500">{{ task.assignedTo }}</td>
            <td class="p-2">{{ task.status }}</td>
            <td class="p-2">{{ task.dueDate }}</td>
            <td class="p-2">{{ task.priority }}</td>
            <td class="p-2">{{ task.comments }}</td>
            <td class="p-2">
              <button
                class="p-1 mr-2"
                (click)="openEditTaskModal(task)"
                aria-label="Edit task"
              >
                <i-lucide name="edit" class="h-4 w-4"></i-lucide>
              </button>
              <button
                class="p-1"
                (click)="deleteTask(task)"
                aria-label="Delete task"
              >
                <i-lucide name="trash-2" class="h-4 w-4"></i-lucide>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-between items-center mt-4">
        <div class="flex items-center space-x-2">
          <input
            type="number"
            class="w-16 p-1 border rounded"
            [(ngModel)]="itemsPerPage"
          />
        </div>
        <div class="flex items-center space-x-2">
          <button class="p-1 border rounded">
            <lucide-icon name="chevron-first" class="h-4 w-4"></lucide-icon>
          </button>
          <button class="p-1 border rounded">
            <i-lucide name="chevron-left" class="h-4 w-4"></i-lucide>
          </button>
          <span class="mx-2">1</span>
          <button class="p-1 border rounded">
            <i-lucide name="chevron-right" class="h-4 w-4"></i-lucide>
          </button>
          <button class="p-1 border rounded">
            <i-lucide name="chevron-last" class="h-4 w-4"></i-lucide>
          </button>
        </div>
      </div>
    </div>
    <app-task-form
      [showModal]="showNewTaskModal"
      [task]="newTask"
      (closeModal)="closeNewTaskModal()"
      (saveTask)="addNewTask($event)"
    ></app-task-form>
    <app-task-form
      [showModal]="showEditTaskModal"
      [task]="editingTask"
      (closeModal)="closeEditTaskModal()"
      (saveTask)="updateTask($event)"
    ></app-task-form>
  `,
  styles: [
    `
    .btn-yellow
      background-color: #fef3c7
      border-color: #fde68a
    .btn-yellow:hover
      background-color: #fde68a
  `,
  ],
})
export class TaskListComponent {
  tasks: Task[] = [
    {
      id: 1,
      assignedTo: 'User 1',
      status: 'Completed',
      dueDate: '2024-10-12',
      priority: 'Low',
      comments: 'This task is good',
    },
    {
      id: 2,
      assignedTo: 'User 2',
      status: 'In Progress',
      dueDate: '2024-09-14',
      priority: 'High',
      comments: 'This',
    },
    {
      id: 3,
      assignedTo: 'User 3',
      status: 'Not Started',
      dueDate: '2024-08-18',
      priority: 'Low',
      comments: 'This',
    },
    {
      id: 4,
      assignedTo: 'User 4',
      status: 'In Progress',
      dueDate: '2024-06-12',
      priority: 'Normal',
      comments: 'This task is good',
    },
  ];
  itemsPerPage = 20;
  showNewTaskModal = false;
  showEditTaskModal = false;
  newTask: Partial<Task> = {};
  editingTask: Partial<Task> = {};
  searchText = '';

  openNewTaskModal() {
    this.showNewTaskModal = true;
    this.newTask = {
      assignedTo: 'User 1',
      status: 'Not Started',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'Normal',
      comments: '',
    };
  }

  closeNewTaskModal() {
    this.showNewTaskModal = false;
  }

  addNewTask(task: Partial<Task>) {
    this.tasks.push({
      id: this.tasks.length + 1,
      ...task,
      dueDate: new Date(task.dueDate!).toISOString().split('T')[0],
    } as Task);
    this.closeNewTaskModal();
  }

  openEditTaskModal(task: Task) {
    this.showEditTaskModal = true;
    this.editingTask = { ...task };
  }

  closeEditTaskModal() {
    this.showEditTaskModal = false;
  }

  updateTask(updatedTask: Partial<Task>) {
    const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = {
        ...this.tasks[index],
        ...updatedTask,
        dueDate: new Date(updatedTask.dueDate!).toISOString().split('T')[0],
      };
    }
    this.closeEditTaskModal();
  }

  deleteTask(task: Task) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    }
  }
}
