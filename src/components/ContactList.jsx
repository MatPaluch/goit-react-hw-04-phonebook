import { Component } from "react";
import PropTypes from "prop-types";
import Styles from "./App.module.css";

export default class ContactList extends Component {
  static propTypes = {
    allContact: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        number: PropTypes.string,
      }),
    ),
    filterFunc: PropTypes.func,
    deleteFunc: PropTypes.func,
    filter: PropTypes.string,
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
          onChange={this.props.filterFunc}
          autoComplete="true"
        />
        <ul className={Styles.list}>
          {this.props.filter === ""
            ? this.props.allContact.map((obj) => (
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
              ))
            : this.props.allContact.map((obj) =>
                obj.name
                  .toLowerCase()
                  .includes(this.props.filter.toLowerCase()) ? (
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
                ) : (
                  false
                ),
              )}
        </ul>
      </>
    );
  }
}
