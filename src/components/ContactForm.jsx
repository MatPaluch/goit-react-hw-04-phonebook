import { Component } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";

export default class ContactForm extends Component {
  static propTypes = {
    options: PropTypes.shape({
      // nameHandler: PropTypes.func,
      // numberHandler: PropTypes.func,
      inputHandler: PropTypes.func,
      submitHandler: PropTypes.func,
    }),
    name: PropTypes.string,
    number: PropTypes.string,
  };

  nameId = nanoid();
  phoneId = nanoid();

  render() {
    return (
      <>
        <form onSubmit={this.props.options.submitHandler}>
          <label htmlFor={this.nameId}>Name</label>
          <br />
          <input
            id={this.nameId}
            type="text"
            name="name"
            pattern="^[a-zA-Z '\-]+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.props.name}
            onChange={this.props.options.inputHandler}
            autoComplete="true"
          />
          <br />
          <label htmlFor={this.phoneId}>Phone</label>
          <br />
          <input
            id={this.phoneId}
            type="tel"
            name="number"
            pattern="^\+?[0-9\(\) \-]+$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.props.number}
            onChange={this.props.options.inputHandler}
            autoComplete="true"
          />
          <br />
          <button type="submit">Add Contact</button>
        </form>
      </>
    );
  }
}
