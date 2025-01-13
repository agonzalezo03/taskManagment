import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent implements OnInit {

  public users :User[] = []

  constructor(private userService :UsersService){}

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(){
    this.userService.getUsers().subscribe( res => {
      this.users = res
    })
  }



}
