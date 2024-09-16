import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-form-parking',
  templateUrl: './form-parking.component.html',
  styleUrls: ['./form-parking.component.sass']
})
export class FormParkingComponent implements OnInit {
  public form: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      car: ['', Validators.required],
      //dateTime: ['', Validators.required]
    });
  }

  send(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log('El formulario no es válido');
    }
  }
}
