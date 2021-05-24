import React from 'react'
import PropTypes from 'prop-types';


const ContactsList = ({contacts, onDeleteContact}) => {

    return (
        <>
        <div className="card">
            
            <ul className="contactItem">
                
                {contacts.map(contact => (
                    
                    <li key= {contact.id } >
                        <p>{contact.name}</p>
                        <p>{contact.number}</p>
                        <button type="button" onClick={onDeleteContact} id={contact.id}>
                            Delete</button>
                    </li>
                ))}
            
                
            </ul>
            </div>
        </>
    );
}

ContactsList.propTypes = {
    onDeleteContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })),
}
export default ContactsList;
