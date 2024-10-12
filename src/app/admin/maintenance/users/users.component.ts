import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../model/user.model";
import {ApiUserService} from "../../services/user.service";
import { TranslateService } from '@ngx-translate/core';
import {LanguageService} from "../../../user/services/languaje.service";
import { animate, state, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('scaleFadeAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.95)' })),
      state('*', style({ opacity: 1, transform: 'scale(1)' })),

      transition('void => *', [
        animate('400ms ease-out')
      ])
    ])
  ]
})
export class UsersComponent implements OnInit {
  title: string = 'Profile';

  users: User[] = [];
  selectedUser: User | null = null;
  isEditing: boolean = false;
  itemsPerPage: number = 10;
  currentPage: number = 1;

  totalUsers: number = 0;
  totalPages: number = 0;
  private pageChange: any;
  email: string = "";
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
    console.log("user.component")
    this.apiUserService.getUsers(this.itemsPerPage , page-1, this.email).subscribe(
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

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.users.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.loadUsers(page);
  }

  changeSearch(searchQuery: string): void {
    this.email = searchQuery;
    this.loadUsers(1);
  }

  onUserCreated(newUser: User): void {
    this.users.push(newUser);

  }



}
