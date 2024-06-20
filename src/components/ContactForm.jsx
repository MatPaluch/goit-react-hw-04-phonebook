import PropTypes from "prop-types";
import { nanoid } from "nanoid";

const ContactForm = ({ options, name, number }) => {
  const nameId = nanoid();
  const phoneId = nanoid();

  return (
    <>
      <form onSubmit={options.submitHandler}>
        <label htmlFor={nameId}>Name</label>
        <br />
        <input
          id={nameId}
          type="text"
          name="name"
          pattern="^[a-zA-Z '\-]+$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={options.inputHandler}
          autoComplete="true"
        />
        <br />
        <label htmlFor={phoneId}>Phone</label>
        <br />
        <input
          id={phoneId}
          type="tel"
          name="number"
          pattern="^\+?[0-9\(\) \-]+$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={options.inputHandler}
          autoComplete="true"
        />
        <br />
        <button type="submit">Add Contact</button>
      </form>
    </>
  );
};

ContactForm.propTypes = {
  options: PropTypes.shape({
    // nameHandler: PropTypes.func,
    // numberHandler: PropTypes.func,
    inputHandler: PropTypes.func,
    submitHandler: PropTypes.func,
  }),
  name: PropTypes.string,
  number: PropTypes.string,
};

export default ContactForm;
