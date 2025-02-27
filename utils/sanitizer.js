import sanitizeHtml from 'sanitize-html';

const sanitizeInput = (data) => {
    return {
        name: sanitizeHtml(data.name),
        email: sanitizeHtml(data.email),
        age: data.age
    };
};

export default sanitizeInput;