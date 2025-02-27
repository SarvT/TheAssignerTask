import sanitizeHtml from 'sanitize-html';

const sanitizeInput = (data) => {
    return {
        name: sanitizeHtml(data.name),
        email: sanitizeHtml(data.email),
        age: data.age // Numbers don't need sanitization
    };
};

export default sanitizeInput;
