import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public searchDataSubject =new BehaviorSubject<string>("");
  public carthomeCountSubject =new BehaviorSubject<any>(0);
  public loginUserSubject =new BehaviorSubject<string>('');

  navUrlres: any;
  ishideNavbar:boolean|any;



  constructor(private router:Router) { }

  // search and filter
      sendSearchData(data:any){
        this.searchDataSubject.next(data);
      }
      //cart counts
     homecartCounts(data:any){
        this.carthomeCountSubject.next(data);
      }

      //
      getLogInUsername(data:any){
        this.loginUserSubject.next(data);
      }

// For hiding the navbar when navigate to login page

      hideNavbar(){
        if(this.router.url.includes("login")){
          this.ishideNavbar=false;
        }else{
          this.ishideNavbar=true;
        }

      }
 
}
