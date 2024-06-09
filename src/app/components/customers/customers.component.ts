import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {CustomerStatusManagerComponent} from "./inner/customer-status-manager/customer-status-manager.component";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatTooltip,
    CustomerStatusManagerComponent
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {

}
