import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule} from '@angular/forms';
import axios from 'axios';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private route:Router){}
  loginCondition=true
  
    userName!:string;
    userPass!:string;
    userEmail!:string;
    
    ngOnInit(): void {
          
    }
    loginFunction= async()=>{
      // console.log(this.userName)
      // console.log(this.userPass)
      // console.log(this.userEmail)
      try{
          const response=await axios.post('http://localhost:5000/api/shopping/login',{
            email:this.userEmail,
            user:this.userName,
            pass:this.userPass
          },{
            headers:{
                'Content-Type':'application/json'
            }
          })
          const res=await response.data;
          const data=await res.usersData;
          // console.log(data)
          
          if(data!=undefined&&!data.isAdmin){
            localStorage.setItem('isAdmin',JSON.stringify(data.isAdmin))
            sessionStorage.setItem('currentUser',data.user)
              this.route.navigate(['home'])
          }else{
            alert("Enter a valid username and password!")
          }
          
      }catch(e){
        console.log(e)
        alert("Enter a valid email")
      }finally{
        this.userEmail=''
        this.userName=''
        this.userPass=''
      }
     
    }


    AdminLoginFunction= async()=>{
      // console.log(this.userName)
      // console.log(this.userPass)
      // console.log(this.userEmail)
      try{
          const response=await axios.post('http://localhost:5000/api/shopping/login',{
            email:this.userEmail,
            user:this.userName,
            pass:this.userPass
          },{
            headers:{
                'Content-Type':'application/json'
            }
          })
          const res=await response.data;
          const data=await res.usersData;
          // console.log(data)
          
          if(data!=undefined&&data.isAdmin){
            localStorage.setItem('isAdmin',JSON.stringify(data.isAdmin))
            sessionStorage.setItem('currentUser',data.user)
              this.route.navigate(['home'])
          }else{
            alert("Enter a valid username and password!")
          }
          
      }catch(e){
        console.log(e)
        alert("Enter a valid email")
      }finally{
        this.userEmail=''
        this.userName=''
        this.userPass=''
      }
     
    }
    
}
