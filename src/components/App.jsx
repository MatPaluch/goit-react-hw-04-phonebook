import { Component } from "react";
import { nanoid } from "nanoid";

import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

import Styles from "./App.module.css";

export default class App extends Component {
  state = {
    contacts: [],
    name: "",
    number: "",
  };

  componentDidMount() {
    const contactsFromLocalStorage = localStorage.getItem("contacts");
    if (contactsFromLocalStorage) {
      this.setState({ contacts: JSON.parse(contactsFromLocalStorage) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  handleInputChange = (ev) => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  };
  // THIS IS THE SAME WHAT ABOVE ⬏
  // inputChangeName = (ev) => {
  //   this.setState({ name: ev.target.value });
  // };
  // inputChangeNumber = (ev) => {
  //   this.setState({ number: ev.target.value });
  // };

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

  render() {
    const options = {
      // nameHandler: this.inputChangeName,
      // numberHandler: this.inputChangeNumber,
      inputHandler: this.handleInputChange,
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
              deleteFunc={this.buttonDelete}
            />
          </div>
        </div>
      </section>
    );
  }
}
