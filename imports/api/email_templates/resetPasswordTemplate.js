import { Accounts } from 'meteor/accounts-base';

Accounts.emailTemplates.from = 'Krakow city chat Admin <admin@krakow-city-chat.com>';
Accounts.emailTemplates.siteName = 'krakow-city-chat.com';
Accounts.emailTemplates.resetPassword.text = (user, url) => {
    return `Hey ${user.profile.first_name}! Reset your passwor by following this link: ${url}`;
};
Accounts.urls.resetPassword = function(token) {
    return Meteor.absoluteUrl('reset-password/' + token);
}
