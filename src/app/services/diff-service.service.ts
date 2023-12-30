import { Injectable } from '@angular/core';
import { Connection } from '../models/connection';

@Injectable({
  providedIn: 'root'
})
export class DiffServiceService {

  constructor() { }

  getConnections(): Connection[] {
    const connectionsJSON = localStorage.getItem('connections');
    return connectionsJSON ? JSON.parse(connectionsJSON) as Connection[] : [];
  }

  deleteConnection(connectionId: number): void {
    const connectionsJSON = localStorage.getItem('connections');
    const connections: Connection[] = connectionsJSON ? JSON.parse(connectionsJSON) as Connection[] : [];
    // Filter out the connection with the given ID
    const updatedConnections = connections.filter(connection => connection.id !== connectionId);
    // Save the updated connections array back to local storage
    localStorage.setItem('connections', JSON.stringify(updatedConnections));
  }
  
}
