export interface ICreateTambolaTicket {
  numberOfTickets: number;
}

export interface ITicket {
  [id: number]: number[][];
}

export interface ITicketsResponse {
  tickets: ITicket;
}
