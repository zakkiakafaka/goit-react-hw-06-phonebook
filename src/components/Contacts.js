import React, { Component } from "react";
import ContactsForm from "./contactsForm/ContactsForm";
import ContactsList from "./contactsList/ContactsList";
import Section from "./section/Section";
import { connect } from "react-redux";
import ContactsFilter from "./filter/ContactsFilter";
import axios from "axios";
import { addContact, deleteContact, filterContacts, getAllContacts } from "../redux/contacts/contactsAction";

class Contacts extends Component {
  state = {
    contacts: {
      items: [],
      filter: ""
    }
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get(`https://shop-7319e-default-rtdb.firebaseio.com/contacts.json`);

      if (data) {
        const contacts = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        this.props.getAllContacts(contacts);
      }

      console.log(data);
    } catch (error) {}
  }

  addContact = async contact => {
    try {
      const { data } = await axios.post(`https://shop-7319e-default-rtdb.firebaseio.com/contacts.json`, contact);
      this.props.addContact({ ...contact, id: data.name });
      console.log(data);
    } catch (error) {}
  };

  onDeleteContact = async e => {
    try {
      const { id } = e.target;
      await axios.delete(`https://shop-7319e-default-rtdb.firebaseio.com/contacts/${id}.json`);
      this.props.deleteContact(id);
    } catch (error) {}
  };

  checkDublicateName = name => {
    return this.props.contacts.some(contact => contact.name === name);
  };

  setFilter = e => {
    const { value } = e.target;
    this.props.filterContacts(value);
  };

  getFilteredClients = () => {
    console.log(this.props);
    return this.props.contacts.filter(contact => contact.name.toLowerCase().includes(this.props.filter.toLowerCase()));
  };
  render() {
    return (
      <>
        <Section title="Phonebook">
          <ContactsForm addContact={this.addContact} checkDublicateName={this.checkDublicateName} />
        </Section>

        <Section title="Find contact by name">
          <ContactsFilter filter={this.props.filter} setFilter={this.setFilter} />
        </Section>

        <Section title="Contacts">
          <ContactsList
            contacts={this.props.contacts}
            onDeleteContact={this.onDeleteContact}
            contacts={this.getFilteredClients()}
          />
        </Section>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    filter: state.filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addContact: contacts => {
      dispatch(addContact(contacts));
    },
    deleteContact: contacts => {
      dispatch(deleteContact(contacts));
    },
    getAllContacts: contacts => {
      dispatch(getAllContacts(contacts));
    },
    filterContacts: contacts => {
      dispatch(filterContacts(contacts));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts);
