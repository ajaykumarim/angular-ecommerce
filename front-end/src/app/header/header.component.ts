import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  isAdmin:string | null;
  constructor(){
    this.isAdmin=localStorage.getItem('isAdmin');
    console.log(this.isAdmin)
  }
  ngOnInit(): void {
    
  }
  @Output() passdata=new EventEmitter<boolean>();
  MoveToCart(){
      const value=true;
      this.passdata.emit(value)
  }
  MoveToHome(){
    const value=false;
      this.passdata.emit(value)
  }

  

}
