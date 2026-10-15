import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {}
