import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private route:Router){}
  userName:string='';
  userEmail:string='';
  userPass:string='';
  registerFunction=async()=>{
    console.log(this.userEmail)
    console.log(this.userName)
    console.log(this.userPass)
    
    if ((this.userEmail!=='') &&(this.userName !== '') && (this.userPass !== '')) {
      try {
        const response = await fetch('http://localhost:5000/api/shopping/username', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email:this.userEmail,user: this.userName, pass: this.userPass }),
        })

        const newUserResponse = await response.json()
        
        console.log(newUserResponse)

        if (response.ok) {  
          alert('Registered Successfully')
          this.route.navigate([''])
        } else {
          alert('User already exists')
          
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }else{
      alert("Fields should not be empty!")
    }
  }
}
