import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const createContact = (newPerson) => {
  const request = axios.post(baseURL, newPerson);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response=>response.statusText)
}

const updateContact = (id,contact) => {
    const request = axios.put(`${baseURL}/${id}`,contact)
    return request.then(response=>response.data)
}

export default { getAll,createContact,deleteContact,updateContact };
