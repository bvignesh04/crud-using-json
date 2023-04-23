import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'crud-using-json';
  items:any;
  item:any= { id: null, name: '', description: '', price: null };
  formTitle:any;
  showForm: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/items').subscribe(items => {
      this.items = items;
    });
  }

  showAddForm() {
    this.formTitle = 'Add Item';
    this.showForm = true;
    this.item = { id: null, name: '', description: '', price: null };
  }

  editItem(item: any) {
    this.formTitle = 'Edit Item';
    this.showForm = true;
    this.item = { ...item };
  }

  deleteItem(item: any) {
    this.http.delete(`http://localhost:3000/items/${item.id}`).subscribe(() => {
      const index = this.items.indexOf(item);
      this.items.splice(index, 1);
    });
  }

  submitForm() {
    if (this.formTitle === 'Add Item') {
      this.http.post<any>('http://localhost:3000/items', this.item).subscribe(newItem => {
        this.items.push(newItem);
      });
    } else {
      this.http.put<any>(`http://localhost:3000/items/${this.item.id}`, this.item).subscribe(() => {
        const index = this.items.findIndex((i: { id: any; }) => i.id === this.item.id);
        this.items[index] = this.item;
      });
    }
    this.showForm = false;
  }

  cancelForm() {
    this.showForm = false;
    this.item = { id: null, name: '', description: '', price: null };
  }
}
