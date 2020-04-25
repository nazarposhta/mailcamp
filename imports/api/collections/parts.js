import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Parts = new Mongo.Collection('parts', {idGeneration: 'STRING'});

if (Meteor.isServer) {
    Meteor.publish('parts', function(cutterId) {
        check(cutterId, String);
        if(Meteor.userId()){
            return Parts.find({owner: Meteor.userId(), cutterId: cutterId});
        }
        return [];
    });
}
Meteor.methods({
    'addPart': function (width, height, cutterId) {
        check(width, Number);
        check(height, Number);
        check(cutterId, String);
        if(!Meteor.userId()){
            throw new Meteor.Error('only_for_autorized_users', "Only for autorized users");
        }
        return Parts.insert({width: width, height: height, date: new Date(), owner: Meteor.userId(), cutterId: cutterId});
    },
    'updatePart': function (id, width, height) {
        check(id, String);
        check(width, Number);
        check(height, Number);
        if(!Meteor.userId()){
            throw new Meteor.Error('only_for_autorized_users', "Only for autorized users");
        }
        Parts.update({_id: id, owner: Meteor.userId()}, { $set: { width, height } });
    },
    'removePart': function (id) {
        check(id, String);
        if(!Meteor.userId()){
            throw new Meteor.Error('only_for_autorized_users', "Only for autorized users");
        }
        Parts.remove({_id: id, owner: Meteor.userId()});
    }
})
