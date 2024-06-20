import { Component } from "react";
import { nanoid } from "nanoid";

import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

import Styles from "./App.module.css";

export default class App extends Component {
  constructor() {
    super();

    const local = localStorage.getItem("contacts");
    if (local) {
    } else {
      localStorage.setItem("contacts", JSON.stringify([]));
    }
  }

  state = {
    contacts: [],
    name: "",
    number: "",
    filter: "",
  };

  inputChangeName = (ev) => {
    this.setState({ name: ev.target.value });
  };
  inputChangeNumber = (ev) => {
    this.setState({ number: ev.target.value });
  };

  inputFilterName = (ev) => {
    this.setState({ filter: ev.target.value });
  };

  buttonAddContact = (ev) => {
    ev.preventDefault();
    if (this.state.contacts.find((obj) => obj.name === this.state.name)) {
      alert(this.state.name + " is already in contacts");
    } else {
      this.setState((prevState) => ({
        contacts: [
          ...prevState.contacts,
          {
            id: nanoid(),
            name: prevState.name,
            number: prevState.number,
          },
        ],
        name: "",
        number: "",
      }));
    }
  };

  buttonDelete = (ev) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((obj) => obj.id !== ev.target.value),
    }));
  };

  componentDidMount() {
    const contactsFromLocalStorage = localStorage.getItem("contacts");
    this.setState({ contacts: JSON.parse(contactsFromLocalStorage) });
  }
  componentDidUpdate() {
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  }

  render() {
    const options = {
      nameHandler: this.inputChangeName,
      numberHandler: this.inputChangeNumber,
      submitHandler: this.buttonAddContact,
    };

    return (
      <section className={Styles.section}>
        <div className={Styles.book}>
          <div className={Styles.leftPage}>
            <h1>Phonebook</h1>
            <ContactForm
              options={options}
              name={this.state.name}
              number={this.state.number}
            />
          </div>
          <div className={Styles.rightPage}>
            <h2>Contacts</h2>
            <ContactList
              allContact={this.state.contacts}
              filter={this.state.filter}
              filterFunc={this.inputFilterName}
              deleteFunc={this.buttonDelete}
            />
          </div>
        </div>
      </section>
    );
  }
}
