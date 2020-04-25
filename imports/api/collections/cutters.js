import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Cutters = new Mongo.Collection('cutters', {idGeneration: 'STRING'});

if (Meteor.isServer) {
    Meteor.publish('cutters', function() {
        if(Meteor.userId()){
            return Cutters.find({owner: Meteor.userId()});
        }
        return [];
    });
    Meteor.publish('cutter', function(id) {
        check(id, String);
        console.log(Cutters.find({_id: id, owner: Meteor.userId()}).fetch())
        if(Meteor.userId()){
            return Cutters.find({_id: id, owner: Meteor.userId()});
        }
        return [];
    });
}
Meteor.methods({
    'addCutter': function (width, height, withoutStructure=false) {
        check(width, String);
        check(height, String);
        check(withoutStructure, Boolean);
        if(!Meteor.userId()){
            throw new Meteor.Error('only_for_autorized_users', "Only for autorized users");
        }
        return Cutters.insert({width: width, height: height, withoutStructure: withoutStructure, date: new Date(), owner: Meteor.userId()});
    },
    'removeCutter': function (id) {
        check(id, String);
        if(!Meteor.userId()){
            throw new Meteor.Error('only_for_autorized_users', "Only for autorized users");
        }
        Cutters.remove({_id: id, owner: Meteor.userId()});
    }
})
