import { Component, OnInit } from '@angular/core';
import { ApiUserService } from '../../../user/services/user.service';
import { User } from "../../../shared/table/table-users.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  title: string = 'Profile';

  users: User[] = [];
  selectedUser: User | null = null;
  isEditing: boolean = false;
  itemsPerPage: number = 8;
  currentPage: number = 1;

  defaultUsers: User[] = [
    { email: 'user1@example.com', name: 'User One'},
    { email: 'user2@example.com', name: 'User Two',},
    { email: 'user3@example.com', name: 'User Three'},
    { email: 'user4@example.com', name: 'User Four',},
    { email: 'user5@example.com', name: 'User Five',},
  ];

  constructor(private apiUserService: ApiUserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiUserService.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
        this.users = this.defaultUsers;
      }
    );
  }

  createUser(userData: User): void {
    this.apiUserService.createUser(userData).subscribe(
      (newUser) => {
        this.users.push(newUser);
      },
      (error) => {
        console.error('Error al crear usuario:', error);
      }
    );
  }

  getUserById(userId: string): void {
    this.apiUserService.getUserById(userId).subscribe(
      (user) => {
        this.selectedUser = user;
        this.isEditing = true;
      },
      (error) => {
        console.error('Error al obtener usuario:', error);
      }
    );
  }

  updateUser(userId: string, userData: User): void {
    this.apiUserService.updateUser(userId, userData).subscribe(
      (updatedUser) => {
        const index = this.users.findIndex(user => user.email === userId);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.selectedUser = null;
        this.isEditing = false;
      },
      (error) => {
        console.error('Error al actualizar usuario:', error);
      }
    );
  }

  deleteUser(userId: string): void {
    this.apiUserService.deleteUser(userId).subscribe(
      () => {
        this.users = this.users.filter(user => user.email !== userId);
      },
      (error) => {
        console.error('Error al eliminar usuario:', error);
      }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onUserCreated(newUser: User): void {
    this.users.push(newUser);
  }
}
