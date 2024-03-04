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
    emailVerify:string ="";
    userNameVerify:string="";
    passwordVerify:string="";
    verifyFunction() {
      if(this.userEmail==""){
        this.emailVerify="*Email field should not be empty"
      }else{
        this.emailVerify=""
      }
      if(this.userName==""){
        this.userNameVerify="*name field should not be empty"
      }else{
        this.userNameVerify=""
      }
      if(this.userPass==""){
        this.passwordVerify="*password field should not be empty"
      }else{
        this.passwordVerify=""
      }
    }
    loginFunction= async()=>{
      try{
          const response=await axios.post('http://localhost:5000/api/shopping/login',{
            email:this.userEmail,
            user:this.userName,
            pass:this.userPass
          },{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials: true
          })
          const res=await response.data;
          const data=await res.usersData;
          
          if(data!=undefined&&!data.isAdmin){
            localStorage.setItem('isAdmin',JSON.stringify(data.isAdmin))
            sessionStorage.setItem('currentUser',data.user)
              this.route.navigate(['home'])
          }else{
            alert("Enter a valid username and password!")
          }
          
      }catch(e){
        console.log(e)
        alert("Enter valid details!")
      }finally{
        this.userEmail=''
        this.userName=''
        this.userPass=''
      }
     
    }


    AdminLoginFunction= async()=>{
      try{
          const response=await axios.post('http://localhost:5000/api/shopping/login',{
            email:this.userEmail,
            user:this.userName,
            pass:this.userPass
          },{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials: true
          })
          const res=await response.data;
          const data=await res.usersData;
          
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
