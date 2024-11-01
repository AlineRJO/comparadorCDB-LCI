import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { PoButtonModule, PoFieldModule, PoInfoModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PoInfoModule, PoFieldModule, ReactiveFormsModule, PoButtonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public title = 'Comparador CDB-LCI';
  public formValid = false;
  public form = new FormGroup({
    cdbValue: new FormControl(0),
    lciValue: new FormControl(0),
    daysValue: new FormControl(0),
    cdbResult: new FormControl(''),
    lciResult: new FormControl(''),
    irValue: new FormControl(22.5),
  });
 
  constructor() {}

  ngOnInit(): void {
    this.form.get('daysValue')?.valueChanges.subscribe(day => {
      if(day && +day > 0) {this.verifyIrValue(+day);}
    });

    this.form.valueChanges.subscribe(formValue => {
      this.formValid = (formValue.cdbValue! > 0 || formValue.lciValue! > 0 );        
    });
  }

  public verifyIrValue(day: number): void {
    let irValue = 15;
    if(day <= 180) {
      irValue = 22.50;
    } else if(181 <= day && day <= 360) {
      irValue = 20.00;
    } else if(361 <= day && day <= 720) {
      irValue = 17.50;
    }
    this.form.get('irValue')?.setValue(irValue);
  }

  public calculate(): void {
     this.calculateCdbLci();
     this.calculateLciCdb();
  }

  private calculateCdbLci(): void {
    const cdbValue = (this.form.get('cdbValue')?.value ?? 0) * 0.01;
    const irValue = (this.form.get('irValue')?.value ?? 0) * 0.01;
    const result = ((cdbValue * (1-(irValue)))*100).toFixed(2);

    this.form.get('cdbResult')?.setValue(result);
  }

  private calculateLciCdb(): void {
    const lciValue = (this.form.get('lciValue')?.value ?? 0) * 0.01;
    const irValue = (this.form.get('irValue')?.value ?? 0) * 0.01;
    const result = ((lciValue/(1 - irValue))*100).toFixed(2);

    this.form.get('lciResult')?.setValue(result);
  }
}
