import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { PoFieldModule, PoInfoModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PoInfoModule, PoFieldModule, ReactiveFormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public title = 'Comparador CDB-LCI';
  public form = new FormGroup({
    cdbValue: new FormControl(0),
    lciValue: new FormControl(0),
    daysValue: new FormControl(0),
    cdbResult: new FormControl(0),
    lciResult: new FormControl(0),
    irValue: new FormControl(0),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

  }

}
