import { useState } from "react";
import PropTypes from "prop-types";
import Styles from "./App.module.css";

const ContactList = ({ allContact, deleteFunc }) => {
  const [filterText, setFilterText] = useState("");

  const inputFilterName = (ev) => {
    setFilterText(ev.target.value);
  };

  return (
    <>
      <label htmlFor="idFilter">Find contacts by name</label>
      <br />
      <input
        id="idFilter"
        type="text"
        name="filter"
        onChange={inputFilterName}
        autoComplete="true"
      />
      <ul className={Styles.list}>
        {allContact.map(
          (obj) =>
            obj.name.toLowerCase().includes(filterText.toLowerCase()) && (
              <li key={obj.id} className={Styles.itemList}>
                <span>
                  {obj.name}: {obj.number}
                </span>
                <button type="button" onClick={deleteFunc} value={obj.id}>
                  Delete
                </button>
              </li>
            ),
        )}
      </ul>
    </>
  );
};
ContactList.propTypes = {
  allContact: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
  deleteFunc: PropTypes.func,
};
export default ContactList;
