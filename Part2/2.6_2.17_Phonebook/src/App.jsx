import { useEffect, useState } from "react";
import { ShowPerson } from "./components/person/ShowPerson";
import { NewContactForm } from "./components/person/NewContactForm";
import { FilterPerson } from "./components/person/FilterPerson";
import PhoneService from "./services/phonebook/PhoneService";
import { Notification } from "./components/notify/Notification";

export const App = () => {
  //States
  const [person, setPerson] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [namefilter, setNameFilter] = useState("");
  const [filters, setFilters] = useState([]);

  //Messages
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  //Get all Contacts
  const getAll = () => {
    PhoneService.getAll()
      .then((data) => {
        setPerson(data);
      })
      .catch((error) => {
        setErrorMessage(`Error getting the data: ${error.message}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  //Delete Contact
  const deleteContact = (id) => {
    const contact = person.find((perso) => perso.id === id);
    const confirm = window.confirm(
      `Do you want to delete the contact "${contact.name}" ?`
    );

    if (confirm) {
      PhoneService.deleteContact(id)
        .then((status) => {
          setPerson(person.filter((perso) => perso.id !== id));
          setSuccessMessage(`Contact deleted successfully!!`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(`Error deleting the contact: ${error.message}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });

      //Update filter
      if (filters.find((pers) => pers.id === id)) {
        setFilters(filters.filter((fil) => fil.id !== id));
      }
    }
  };

  //Create Contact
  const createContact = (newContact) => {
    PhoneService.createContact(newContact)
      .then((contact) => {
        setPerson([...person, contact]);
        setSuccessMessage(`${contact.name} added successfully!!`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(`Error creating the contact: ${error.message}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  //Update Contact
  const updateContact = (id, contact) => {
    const confirm = window.confirm(
      `"${contact.name.trim()}" is already added to phonebook, replace the old number with a new one?`
    );

    if (confirm) {
      const topush = { ...contact, number: number.trim() };
      PhoneService.updateContact(id, topush)
        .then((upcontact) => {
          setPerson(person.map((per) => (per.id !== id ? per : upcontact)));
          setSuccessMessage(`${upcontact.name} updated successfully!!`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(`Error updating the contact: ${error.message}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });

      //Update filter
      if (filters.find((pers) => pers.id === id)) {
        setFilters(filters.map((fil) => (fil.id === id ? topush : fil)));
      }
    }
  };

  useEffect(getAll, []);

  //Functions
  const onchangeName = (event) => {
    setName(event.target.value);
  };

  const onchangeNumber = (event) => {
    setNumber(event.target.value);
  };

  const onchangeNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  const onsubmitForm = (event) => {
    event.preventDefault();

    //Validation 1
    if (!name.trim() || !number.trim()) {
      alert("Empty Data !!");
      return;
    }

    //Validation 2
    const personAlreadybyNumber = person.find(
      (perso) =>
        perso.number.trim().toLowerCase() === number.trim().toLowerCase()
    );

    if (personAlreadybyNumber) {
      alert(
        `The number "${number.trim()}" already belongs to ${
          personAlreadybyNumber.name
        }`
      );
      return;
    }

    //Validation 3
    const regex = /^[0-9-]+$/;
    if (!regex.test(number.trim())) {
      alert(`The number can contain only digits and the "-" character`);
      return;
    }

    //Update or Create

    const personAlreadybyName = person.find(
      (perso) => perso.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (personAlreadybyName) {
      updateContact(personAlreadybyName.id, personAlreadybyName);
    } else {
      //Create Contact
      const newPerson = {
        name: name.trim(),
        number: number.trim(),
      };
      createContact(newPerson);
    }

    setName("");
    setNumber("");
  };

  const onsubmitFormFilter = (event) => {
    event.preventDefault();
    setFilters([]);

    if (!namefilter.trim()) {
      alert("Enter a name...");
      return;
    }

    if (namefilter.trim()) {
      let personFilter = [];

      if (namefilter.trim().length === 1) {
        personFilter = person.filter((perso) =>
          perso.name
            .toLowerCase()
            .startsWith(namefilter.trim().toLowerCase(), 0)
        );
      } else {
        personFilter = person.filter((perso) =>
          perso.name.toLowerCase().includes(namefilter.trim().toLowerCase())
        );
      }

      if (personFilter.length > 0) {
        setFilters(personFilter);
      } else {
        alert(`"${namefilter}" not found`);
      }
    }

    setNameFilter("");
  };

  return (
    <>
      <Notification className={"notify-error"} message={errorMessage} />
      <Notification className={"notify-success"} message={successMessage} />

      <FilterPerson
        onsubmitFormFilter={onsubmitFormFilter}
        namefilter={namefilter}
        onchangeNameFilter={onchangeNameFilter}
        filters={filters}
        deleteContact={deleteContact}
      />

      <NewContactForm
        onsubmitForm={onsubmitForm}
        name={name}
        onchangeName={onchangeName}
        number={number}
        onchangeNumber={onchangeNumber}
      />

      <ShowPerson person={person} deleteContact={deleteContact} />
    </>
  );
};
