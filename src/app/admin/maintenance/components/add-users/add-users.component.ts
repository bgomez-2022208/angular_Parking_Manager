import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiUserService } from "../../../../user/services/user.service";
import { User } from "../../../model/user.model";
import { ProfileserviceService } from "../../../services/profileservice.service";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  @Output() userCreated = new EventEmitter<User>();
  userForm: FormGroup;
  users: User[] = [];
  profiles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiUserService: ApiUserService,
    private profileService: ProfileserviceService
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      profile: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      dpi: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadProfiles();
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

  loadProfiles() {
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData = {
        name: this.userForm.value.name,
        surname: this.userForm.value.surname,
        age: this.userForm.value.age,
        dpi: this.userForm.value.dpi,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        status: true,
        profileId: this.userForm.value.profile
      };
      console.log(userData);
      this.apiUserService.createUser(userData).subscribe(
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
