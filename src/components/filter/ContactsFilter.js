import React from 'react'
import PropTypes from 'prop-types';


const ContactsFilter = ({ filter, setFilter }) => {
    return (
        <>
        <label >Filter:
            <input type="text"
                value={filter}
                onChange={setFilter}
            />
            </label>
        </>
    );
}

ContactsFilter.propTypes = {
    filter: PropTypes.string,
    setFilter: PropTypes.func,
}.isRequired;
export default ContactsFilter;