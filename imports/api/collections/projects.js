import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Projects = new Mongo.Collection('projects', {idGeneration: 'STRING'});

if (Meteor.isServer) {
    Meteor.publish('projects', function() {
        if(Meteor.userId()){
            return Projects.find({owner: Meteor.userId()});
        }
        return [];
    });
}
Meteor.methods({
    'addProject': function (name) {
        check(task_name, String);
        if(!Meteor.userId()){
            throw new Meteor.Error('only_for_autorized_users', "Only for autorized users");
        }
        Projects.insert({text: name, date: new Date(), owner: Meteor.userId()});
    },
    'removeProject': function (id) {
        check(id, String);
        if(!Meteor.userId()){
            throw new Meteor.Error('only_for_autorized_users', "Only for autorized users");
        }
        Projects.remove({_id: id, owner: Meteor.userId()});
    }
})
