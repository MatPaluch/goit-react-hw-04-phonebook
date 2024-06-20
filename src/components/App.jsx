import { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";

import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

import Styles from "./App.module.css";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const prevContacts = usePrevious(contacts);

  useEffect(() => {
    const contactsFromLocalStorage = localStorage.getItem("contacts");
    if (contactsFromLocalStorage) {
      setContacts(JSON.parse(contactsFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    if (prevContacts && prevContacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [contacts, prevContacts]);

  // We have to create object with:
  // - keys named like inputs attribute <input name = 'smth'/>
  // - values using setter function from hook useState (const [example,setExample] = useState(value);
  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    const setter = {
      name: setName,
      number: setNumber,
    };
    if (setter[name]) {
      setter[name](value);
    }
  };

  // THIS IS THE SAME WHAT ABOVE but easier declaring 2 functions⬏
  // const inputChangeName = (ev) => {
  //   setName(ev.target.value);
  // };
  // const inputChangeNumber = (ev) => {
  //   setNumber(ev.target.value);
  // };

  const buttonAddContact = (ev) => {
    ev.preventDefault();
    if (contacts.find((obj) => obj.name === name)) {
      alert(name + " is already in contacts");
    } else {
      setContacts([...contacts, { id: nanoid(), name: name, number: number }]);
      setName("");
      setNumber("");
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  };

  const buttonDelete = (ev) => {
    setContacts(contacts.filter((obj) => obj.id !== ev.target.value));
  };

  const options = {
    // nameHandler: inputChangeName,
    // numberHandler: inputChangeNumber,
    inputHandler: handleInputChange,
    submitHandler: buttonAddContact,
  };

  return (
    <section className={Styles.section}>
      <div className={Styles.book}>
        <div className={Styles.leftPage}>
          <h1>Phonebook</h1>
          <ContactForm options={options} name={name} number={number} />
        </div>
        <div className={Styles.rightPage}>
          <h2>Contacts</h2>
          <ContactList allContact={contacts} deleteFunc={buttonDelete} />
        </div>
      </div>
    </section>
  );
};
export default App;
