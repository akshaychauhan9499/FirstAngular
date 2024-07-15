import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { UserModel } from '../../Model/user';
import { FormsModule, NgForm} from '@angular/forms';
import { UserService } from '../../Service/user.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user.component.html',
  template: 'hello',
  styleUrls: ['./user.component.css'] // Corrected the property name
})


export class UserComponent implements OnInit{
  userList : UserModel[]=[];
  editMode : Boolean=false;
  user: UserModel = {
    
    department: "",
    name: "",
    mobile: "",
    email: "",
    gender: "",
    doj: "",
    city: "",
    salary: 0,
    address: "",
    status: false,
  }


  

  constructor(private _userService : UserService){}

  ngOnInit(): void {
    this.getUserList();
  }


  cityList: string[] = ["Delhi", "Haridwar", "Mumbai", "Gurgaon", "Faridabad"];
  departmentList: string[] = ["IT", "HR", "Accounts", "Sales", "Management"];


  getUserList()
    {
      this._userService.getUsers(this.user).subscribe((res) => {
        this.userList = res;
      });
    }

  onSubmit(form: NgForm):void
  {
    debugger;
    if (this.editMode){
      console.log(form);
      this._userService.updateUser(this.user).subscribe((res) => {
        this.getUserList();
        form.reset();
        this.editMode = false;
        //this._toastrService.success('User Updated Sucessfully','Sucess');
      });
    }
    else{
      console.log(form);
      this._userService.addUser(this.user).subscribe((res) => {
      this.getUserList();
      form.reset();
      
    });
    }


    
  }




  onEdit(userdata : UserModel)
    {
      this.user = userdata;
      this.editMode = true;


    }




  onDelete(id : any)
    {
      const isConfirm = confirm('Are you sure you want to delete this User?');
      if (isConfirm){
        this._userService.deleteUser(id).subscribe((res) => {
          this.getUserList();
          //this._toastrService.error('User Deleted Sucessfully','Deleted')
          })
      } 
    } 




  onResetForm(form:NgForm)
    {
      form.reset();
      this.editMode = false;
      this.getUserList();

    }
}