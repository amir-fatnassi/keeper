import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERROR,
    GET_CONTACT,
    CLEAR_CONTACT
} from '../types'

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    } 

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // get contacts
    const getContacts = async () => {

        try {
            const res = await axios.get('/api/contacts');
            dispatch({ 
                type: GET_CONTACT, 
                payload: res.data 
            });
        } catch (err) {
            dispatch({
                type: CLEAR_CONTACT,
                payload: err.response.msg
            })
        }                       
    };

    // Add contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({ 
                type: ADD_CONTACT, 
                payload: res.data 
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }

        
    };

    // Delete contact
    const deleteContact = async id => {
        try {
            const res = await axios.delete(`/api/contacts/${id}`);
            dispatch({ 
                type: DELETE_CONTACT, 
                payload: id 
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
        
    };

    // Update contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(
                `/api/contacts/${contact._id}`, contact, config);
            dispatch({ 
                type: UPDATE_CONTACT, 
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            })
        }
        
    };

    // clear contact
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACT });
    };

    // Set current contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Filter contact
    const filterContact = text => {
        dispatch({ type: FILTER_CONTACT, payload: text });
    };

    // Clear filter
    const clearfilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearfilter,
            getContacts,
            clearContacts
        }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;