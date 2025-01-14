import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "http://localhost:3001/api";
  httpClient=inject(HttpClient);
  constructor() { }


  getUsers() {
    return this.httpClient.get<User[]>(`${this.apiUrl}/user/getUser`);
  }

  getUser(id:string){
    return this.httpClient.get<User>(this.apiUrl+'/user/getUserId/' +id);
  }

  addUser(model:Partial<User>){
    return this.httpClient.post(this.apiUrl+'/user/addUser',model);  
  }


  updateUser(id:string,model:User){
    return this.httpClient.put(this.apiUrl+'/user/updateUser/'+id,model);
  }


  deleteUser(id:string){
    return this.httpClient.delete(this.apiUrl+'/user/deleteUser/'+id);
  }
}
