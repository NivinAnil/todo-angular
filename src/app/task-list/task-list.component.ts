import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
  externalId: number;
  assignedTo: string;
  status: string;
  dueDate: string;
  priority: string;
  description: string;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule, // Add this line
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
            <td class="p-2">{{ task.description }}</td>
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
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  itemsPerPage = 20;
  showNewTaskModal = false;
  showEditTaskModal = false;
  newTask: Partial<Task> = {};
  editingTask: Partial<Task> = {};
  searchText = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.http.get<Task[] | null>('http://localhost:8080/api/tasks').subscribe(
      (tasks) => {
        this.tasks = tasks || [];
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  openNewTaskModal() {
    this.showNewTaskModal = true;
    this.newTask = {
      assignedTo: 'User 1',
      status: 'Not Started',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'Normal',
      description: '',
    };
  }

  closeNewTaskModal() {
    this.showNewTaskModal = false;
  }

  addNewTask(task: Partial<Task>) {
    this.http.post<Task>('http://localhost:8080/api/task', task).subscribe(
      (newTask) => {
        this.tasks.push(newTask);
        this.closeNewTaskModal();
      },
      (error) => {
        console.error('Error adding new task:', error);
      }
    );
  }

  openEditTaskModal(task: Task) {
    this.showEditTaskModal = true;
    this.editingTask = { ...task };
  }

  closeEditTaskModal() {
    this.showEditTaskModal = false;
  }

  updateTask(updatedTask: Partial<Task>) {
    this.http
      .put<Task>(`/api/task/${updatedTask.externalId}`, updatedTask)
      .subscribe(
        (task) => {
          const index = this.tasks.findIndex(
            (t) => t.externalId === task.externalId
          );
          if (index !== -1) {
            this.tasks[index] = task;
          }
          this.closeEditTaskModal();
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
  }

  deleteTask(task: Task) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.http.delete(`/api/task/${task.externalId}`).subscribe(
        () => {
          this.tasks = this.tasks.filter(
            (t) => t.externalId !== task.externalId
          );
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }
}
