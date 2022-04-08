import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket
  ) 
  { 
    this.socket.on('connect',() => { });
  }

  getMessage() {
    // const getMsg = new Promise((resolve, reject) => {
    //   this.socket.on('message',(data: string)=> {
    //     resolve(data);
    //     console.log("inside services: ",data)
    //   });
    // })
    // return getMsg;
    return this.socket.fromEvent('message');
  }
}
