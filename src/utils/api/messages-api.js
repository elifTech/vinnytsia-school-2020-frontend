import axios from './axios';

export default {
  getAllMessages: () => axios.get('/messages'),
  createMessage: newMessage => axios.post('/message', newMessage),
  deleteMessageById: id => axios.delete(`/message/${id}`),
};
