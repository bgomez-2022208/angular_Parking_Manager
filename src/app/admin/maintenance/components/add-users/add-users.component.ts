import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiUserService } from "../../../../user/services/user.service";
import { User } from "../../../../shared/table/table-users.component";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  @Output() userCreated = new EventEmitter<User>();
  userForm: FormGroup;
  users: User[] = [];

  constructor(private fb: FormBuilder, private apiUserService: ApiUserService) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      profile: ['', Validators.required],
      age: ['', Validators.required],
      dpi: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.apiUserService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error("Error loading users", error);
      }
    );
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.apiUserService.createUser(this.userForm.value).subscribe(
        (newUser) => {
          this.userCreated.emit(newUser);
          this.loadUsers();
          this.userForm.reset();
        },
        (error) => {
          console.error("Error creating user", error);
        }
      );
    }
  }
}
