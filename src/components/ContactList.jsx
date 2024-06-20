import { Component } from "react";
import PropTypes from "prop-types";
import Styles from "./App.module.css";

export default class ContactList extends Component {
  state = {
    filterText: "",
  };

  static propTypes = {
    allContact: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
      }),
    ),
    deleteFunc: PropTypes.func,
  };

  inputFilterName = (ev) => {
    this.setState({ filterText: ev.target.value });
  };

  render() {
    return (
      <>
        <label htmlFor="idFilter">Find contacts by name</label>
        <br />
        <input
          id="idFilter"
          type="text"
          name="filter"
          onChange={this.inputFilterName}
          autoComplete="true"
        />
        <ul className={Styles.list}>
          {this.props.allContact.map(
            (obj) =>
              obj.name
                .toLowerCase()
                .includes(this.state.filterText.toLowerCase()) && (
                <li key={obj.id} className={Styles.itemList}>
                  <span>
                    {obj.name}: {obj.number}
                  </span>
                  <button
                    type="button"
                    onClick={this.props.deleteFunc}
                    value={obj.id}>
                    Delete
                  </button>
                </li>
              ),
          )}
        </ul>
      </>
    );
  }
}
