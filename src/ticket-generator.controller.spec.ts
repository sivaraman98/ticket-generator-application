import axios from 'axios';

describe('Ticket generator controller', () => {
  const ticketGeneratorUrl = 'http://localhost:3000';

  it('Test cases for creating number of Tambola tickets', async () => {
    const response = await axios
      .post(`${ticketGeneratorUrl}/createTambolaTicket`, { numberOfTickets: 2 })
      .then((response) => {
        if (!response) throw `Errored while Tambola ticket creation.`;
        if (response.data.status === 'ERROR') throw `${response.data.message}`;
        return response.data;
      });
    expect(response.status).toBe('SUCCESS');
  });

  it('Test cases for getting all the saved Tambola tickets', async () => {
    const response = await axios
      .get(`${ticketGeneratorUrl}/getAllTambolaTickets`)
      .then((response) => {
        if (!response)
          throw `Errored while getting all the saved tambola tickets.`;
        if (response.data.status === 'ERROR') throw `${response.data.message}`;
        return response.data;
      });
    expect(response.status).toBe('SUCCESS');
  });
});
