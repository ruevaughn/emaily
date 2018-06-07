export default (emails) => {
  // from emailregex.com

  // TODO: Fix this up so trailing commas don't provide a bad value.
  const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const invalidEmails = emails
   .split(',')
   .map(email => email.trim())
   .filter(email => re.test(email) === false )

   if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
   }

   return;
};

