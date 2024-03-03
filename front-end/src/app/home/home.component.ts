
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Output, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import axios from 'axios';
import { HeaderComponent } from '../header/header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { error } from 'console';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit, AfterViewInit {
  products: any;
  favourite = false;
  filteredProducts: any;
  requiredQuantity:any;
  arry:any[]=[]
  constructor(private http: HttpClient) {
    this.getData();
  
  }
  ngAfterViewInit(): void {
    
  }
  ngOnInit(): void {
    setTimeout(()=>{
      this.NewFav();
      },1000)
  }


  cuUser = sessionStorage.getItem('currentUser')
  isAdmin=localStorage.getItem('isAdmin')
  getData = async () => {

    const response = await axios.get('http://localhost:5000/api/shopping', {
      withCredentials: true
    });
    const data = await response.data
    this.products = data.products.sort((a:any, b:any) => a.name.localeCompare(b.name));
    
  }

  NewFav = async () => {
    const response2 = await axios('http://localhost:5000/api/shopping/username/favourites', {
      withCredentials: true,
    })

    const getFavourites = await response2.data.favourieArry 
    let ar = await getFavourites.filter((a: any) => a.user == this.cuUser)
    let sortedQuantity=await ar.sort((a:any, b:any) => a.productName.localeCompare(b.productName));
    this.requiredQuantity=await sortedQuantity
    let an = await ar.map((a: any) => a.productName)
    this.filteredProducts=await this.products?.filter((product: any) => an.includes(product.name));
    // this.filteredProducts =sortedFav.sort((a:any, b:any) => a.name.localeCompare(b.name)); 
  }

  fav1(val: boolean) {
    this.favourite = val
  }
  home(val:boolean){
    this.favourite=val
  }

  addToCartFunction(e:string){
    this.http.post("http://localhost:5000/api/shopping/username/favourites", {
          "user": this.cuUser,
          "productName": e,
        }).subscribe((response) => {
          console.log(response)
          this.getData();
          
          setTimeout(()=>{
            this.NewFav();
            },1000)
        })
  }

  removeFavourite(e:string){
    this.http.delete(`http://localhost:5000/api/shopping/username/favourites?param1=${this.cuUser}&param2=${e}`).subscribe((response) => {
          console.log(response)
          this.getData();
          setTimeout(()=>{
            this.NewFav();
            },1000)
        })
  }
  plusFunction(productName:string){
    
    this.http.put(`http://localhost:5000/api/shopping/username/favourites`,{
      "user":this.cuUser,
      "productName":productName,
      "calc":"plus"
    }).subscribe((response:any)=>{
    this.getData();
          setTimeout(()=>{
            this.NewFav();
            },1000)      
  },(error)=>{
    console.log(error.error.message)
    if(error.error.message=="Invalid calc value"){
      alert("stack not available!")
    }
  })
  }
  minusFunction(productName:string){
      this.http.put(`http://localhost:5000/api/shopping/username/favourites`,{
        "user":this.cuUser,
        "productName":productName,
        "calc":"minus"
      }).subscribe((response)=>{
        console.log(response)
        this.getData();
          setTimeout(()=>{
            this.NewFav();
            },1000)
      },(error)=>{
        console.log(error.error.message)
        if(error.error.message=="Invalid calc value"){
          alert("Minimum quantity reached!")
        }
      })

  }
}
