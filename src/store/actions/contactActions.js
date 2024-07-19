import axios from "axios";
import generateUniqueId from "generate-unique-id";
import { storage } from "../../Firebaseconfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Get Contact
export const fetchContacts = (data) => {
    return {
        type: "FETCH_CONTACTS",
        payload: data
    }
};

// Get Contact
export const contactGetAsync = () => {
    return (dispatch) => {
        axios.get('http://localhost:3000/contacts')
            .then(res => {
                console.log("SUCCESS", res.data);
                dispatch(fetchContacts(res.data));
            })
            .catch(error => {
                console.log("ERROR", error);
            });
    };
};

// Add New Contact
export const addContact = (data) => {
    return {
        type: "ADD_CONTACT",
        payload: data
    }
}

// Add New Contact
export const contactPostAsync = (data) => {
    return (dispatch) => {
        data.id = generateUniqueId({
            length: 4,
            useLetters: false,
        });

        axios.post('http://localhost:3000/contacts', data)
            .then(res => {
                console.log("SUCCESS", res.data);
                dispatch(contactGetAsync());
            })
            .catch(error => {
                console.error("ERROR", error);
            });
    };
};

// Update Contact
export const updateContact = (id) => {
    return {
        type: "UPDATE_CONTACT",
        payload: id
    }
}

export const selectContact = (id) => {
    return {
        type: "SELECT_CONTACT",
        payload: id
    }
}

// Update Contact
export const contactSelectAsync = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:3000/contacts/${id}`)
            .then(res => {
                console.log(res.data);
                dispatch(selectContact(res.data));
            })
            .catch(error => {
                console.log("ERROR", error);
            });
    }
}

export const contactUpdateAsync = (data) => {
    return (dispatch) => {
        axios.put(`http://localhost:3000/contacts/${data.id}`, data)
            .then(res => {
                console.log(res.data);
                dispatch(contactGetAsync());
            })
            .catch(error => {
                console.log("ERROR", error);
            });
    }
}

// Delete Contact
export const deleteContact = (id) => {
    return {
        type: "DELETE_CONTACT",
        payload: id
    }
}

// Delete Contact
export const contactDeleteAsync = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3000/contacts/${id}`)
            .then(res => {
                console.log("DELETE", res.data);
                dispatch(deleteContact(res.data));
                dispatch(contactGetAsync());
            })
            .catch(error => {
                console.log("ERROR", error);
            });
    }
}

// Upload Files
const RecordUpdated = (record) => {
    return {
        type: "RECORD_UPDATED",
        payload: record
    }
}

const RecordError = (error) => {
    return {
        type: "RECORD_ERROR",
        payload: error
    }
}

// Upload Files
export const uploadFile = (file, record) => {
    return (dispatch) => {
        if (!file.name) {
            const error = new Error("File name is invalid");
            dispatch(RecordError(error.message));
            console.error("Error uploading file:", error.message);
            throw error;
        }

        const storageRef = ref(storage, file.name);

        return uploadBytes(storageRef, file)
            .then(() => getDownloadURL(storageRef))
            .then(url => {
                dispatch(RecordUpdated({ ...record, imageURL: url }));
                return { url };
            })
            .catch(error => {
                dispatch(RecordError(error.message));
                console.error("Error uploading file:", error.message);
                throw error;
            });
    };
};