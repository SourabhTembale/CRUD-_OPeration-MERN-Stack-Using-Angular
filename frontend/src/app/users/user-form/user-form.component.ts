import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { UserService } from '../../services/user.service';
import User from '../../types/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-form',
  imports: [MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  users:User[]=[];
  formBuiler  =inject(FormBuilder);
  userForm:FormGroup = this.formBuiler.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:[''],
    age:[''],
    address:[''],
  })

  userService= inject(UserService);
  router=inject(Router);

  route = inject(ActivatedRoute);
  editUserid!:string;

  ngOnInit(){
    this.editUserid = this.route.snapshot.params['id'];
    if(this.editUserid){
      this.userService.getUser(this.editUserid).subscribe((result)=>{
        this.userForm.patchValue(result);
      })
  }
}
  addUser(){
    if(this.userForm.invalid){
      alert('Provide All Fields with valid data!!');
      return ;
    }
    const model:User = this.userForm.value;
    this.userService.addUser(model).subscribe((result)=>{
      alert("User Added Successfully")
      console.log(result);
      this.router.navigateByUrl('/');
    });
  }

  updateUser(){
    if(this.userForm.invalid){
      alert('Provide All Fields with valid data!!');
      return ;
    }
    const model:User = this.userForm.value;
    this.userService.updateUser(this.editUserid,model).subscribe((result)=>{
      alert("User Updated Successfully")
      console.log(result);
      this.router.navigateByUrl('/');
    });
    }

    delete(id:string){
      const ok = confirm("You want to delete user!!");
      if(ok){
        this.userService.deleteUser(id).subscribe((result)=>{
          alert("User Deleted Successfully");
          this.users = this.users.filter((u)=>u._id!=id);
        })
      }
    }
}
