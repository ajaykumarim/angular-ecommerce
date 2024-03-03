import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  products: product[] = []
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.getProducts().subscribe((response) => {
      const res: any = response
      this.products = res.products
    })
  }

  getProducts() {
    return this.http.get('http://localhost:5000/api/shopping')
  }
  selectedProduct!: product;

  selectedName: string = '';
  selectedPrice: number = 0;
  selectedQuantity: number = 0;
  selectedPath: string = '';

  editBar = false;
  editedId!: number;
  editedName!: string;
  editedPrice!: number;
  editedQuantity!: number;
  editedPath!: string;
  editFunction(product: product) {
    this.editBar = true;
    this.selectedProduct = product;
    this.editedId = product.id;
    this.selectedName = product.name;
    this.selectedPrice = product.price;
    this.selectedQuantity = product.quantity;
    this.selectedPath = product.imagePath;
  }
  editProducts() {

    if (this.editedId && ((this.editedName && this.selectedName) != "") && ((this.editedPath && this.selectedPath) != "")) {
      this.http.put<any>(`http://localhost:5000/api/shopping/${this.editedId}`, {
        name: this.editedName != undefined ? this.editedName : this.selectedName,
        price: this.editedPrice != undefined ? this.editedPrice : this.selectedPrice,
        quantity: this.editedQuantity != undefined ? this.editedQuantity : this.selectedQuantity,
        imagePath: this.editedPath != undefined ? this.editedPath : this.selectedPath,
      }).subscribe((response) => {
        console.log(response)
        alert(response.message)
        this.editBar = false;
        location.reload()
      })
    } else {
      alert("The fields should not be empty!")
    }
  }

  editcancel() {
    this.selectedName = '';
    this.selectedPrice = 0;
    this.selectedQuantity = 0;
    this.selectedPath = '';
    this.editBar = false;
  }
  deleteFunction(id: number) {
    this.http.delete(`http://localhost:5000/api/shopping/${id}`).subscribe((response) => {
      console.log(response)
      location.reload()
    })
  }
  addBar = false;
  addName?: string;
  addPrice?: number;
  addPath?: string;
  addQuantity?: number;

  addcancel() {
    this.addBar = false;
  }
  addProducts() {
    console.log(this.addName)
    console.log(this.addPrice)
    console.log(this.addPath)
    console.log(this.addQuantity)
    try {
      if (this.addName != "" && this.addPath != "" && this.addQuantity! > 0 && this.addPrice! > 0) {
        this.http.post("http://localhost:5000/api/shopping", {
          "name": this.addName,
          "price": this.addPrice,
          "quantity": this.addQuantity,
          "imagePath": this.addPath,
        }).subscribe((response) => {
          console.log(response)
          location.reload()
        })
      } else {
        alert("The fields should not be empty!")
      }
    } catch (e) {
      console.log(e)
    }
  }
}
class product {
  id!: number;
  name!: string;
  price!: number;
  quantity!: number;
  imagePath!: string;
}
