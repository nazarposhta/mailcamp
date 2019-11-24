import { Meteor } from 'meteor/meteor';
import "../imports/api/collections/users";
import "../imports/api/email_templates/resetPasswordTemplate";
Meteor.startup(() => {
    // code to run on server at startup
});
