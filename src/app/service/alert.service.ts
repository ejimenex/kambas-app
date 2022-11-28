import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

//declare var swal: any;
@Injectable({providedIn:'root'})


export class AlertService {
  constructor() { }
  error(message: string, title?: string) {

    Swal.fire(
    title || 'Error',
       message,
      'error'
    );
  }
  
  success(message: string, title?: string) {
    Swal.fire(
     title || 'Success',message,'info' );
  }

   questionSWA(ok: () => void,title:string,msg:string){
    Swal.fire({
      title: title,
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
       ok()
      }
    })
  }

}
