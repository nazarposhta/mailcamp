import { check, Match } from 'meteor/check';
import { _ } from 'underscore';

if (Meteor.isServer) {
    Meteor.publish('current_user', function () {
        if(Meteor.userId()){
            return Meteor.users.find({_id: Meteor.userId()});
        }
        return [];
    });
}
Meteor.methods({
    'updateUser': function (first_name, last_name, birthday, gender, country, about_me) {
        check(first_name, String);
        check(last_name, String);
        check(birthday, Match.Optional(Match.OneOf(String, Date)));
        check(gender, String);
        check(country, String);
        check(about_me, String);
        if(!Meteor.userId()){
            throw new Meteor.Error('you_have_to_be_loggedin', 'You have to be loggedin');
        }
        let updater = {};
        if(first_name){
            updater['profile.first_name'] = first_name;
        }
        if(last_name){
            updater['profile.last_name'] = last_name;
        }
        if(birthday){
            updater['profile.birthday'] = birthday;
        }
        if(gender){
            updater['profile.gender'] = gender;
        }
        if(country){
            updater['profile.country'] = country;
        }
        if(about_me){
            updater['profile.about_me'] = about_me;
        }
        if(_.isEmpty(updater)){
            throw new Meteor.Error('nothing_to_update', 'Nothing to update');
        }
        Meteor.users.update({_id: Meteor.userId()}, {$set: updater});
    }
})
