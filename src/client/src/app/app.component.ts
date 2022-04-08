import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  message: any = "";
  constructor(
    private socket: Socket, 
    private socketService: SocketService) 
  {
    this.message = this.socketService.getMessage();
  }


}
