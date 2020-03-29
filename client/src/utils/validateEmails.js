import isEmail from 'validator/lib/isEmail';

export default emails => {
    const invalidEmails = emails
        .split(',')
        .map(email => email.trim())
        .filter(email => isEmail(email) === false);

    if (invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    }
    return
};
