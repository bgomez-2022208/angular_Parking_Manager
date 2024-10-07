import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../model/user.model";
import {ApiUserService} from "../../services/user.service";
import { TranslateService } from '@ngx-translate/core';
import {LanguageService} from "../../../user/services/languaje.service";



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

  totalUsers: number = 0;
  totalPages: number = 0;
  private pageChange: any;
  searchQuery: string = "";
  languages: string[] = []
  currentLanguage: string = ''
  @Output() searchChange = new EventEmitter<string>();



  constructor(private apiUserService: ApiUserService, private translate: TranslateService) {
    this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
    this.translate.use(this.currentLanguage);
  }

  ngOnInit(): void {
    this.loadUsers(1);


  }

  loadUsers(page:number): void {
    this.apiUserService.getUsers(this.itemsPerPage , page-1, this.searchQuery).subscribe(
      (data: any) => {
        this.users = data.users;
        this.totalUsers = data.totalElements;
        this.totalPages = data.totalPages;

        console.log(this.users);
      },
      (error: any) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  createUser(userData: User): void {
    this.apiUserService.createUser(userData).subscribe(
      (newUser: any) => {
        this.users.push(newUser);
        this.totalUsers = this.users.length;
        this.totalPages = Math.ceil(this.totalUsers / this.itemsPerPage);
      },
      (error: any) => {
        console.error('Error al crear usuario:', error);
      }
    );
  }

  getUserById(userId: number): void {
    this.apiUserService.getUserById(userId).subscribe(
      (user: any) => {
        this.selectedUser = user;
        this.isEditing = true;
      },
      (error: any) => {
        console.error('Error al obtener usuario:', error);
      }
    );
  }

  updateUser(userId: string, userData: User): void {
    this.apiUserService.updateUser(userId, userData).subscribe(
      (updatedUser: any) => {
        const index = this.users.findIndex(user => user.email === userId);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.selectedUser = null;
        this.isEditing = false;
      },
      (error: any) => {
        console.error('Error al actualizar usuario:', error);
      }
    );
  }



  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.loadUsers(page);
  }

  changeSearch(searchQuery: string): void {
    this.searchQuery = searchQuery;
    this.loadUsers(1);
  }

  onUserCreated(newUser: User): void {
    this.users.push(newUser);

  }



}
