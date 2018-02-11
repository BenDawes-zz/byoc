import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Locations = new Mongo.Collection('locations');

if (Meteor.isServer) {
  Meteor.publish('locations', function locationsPublication() {
    return Locations.find();
  });
}

Meteor.methods({
  'locations.insert'(name, location, accepts_own_containers) {

    check(name, String);
    check(location, {
      latitude: Number,
      longitude: Number,
    });
    check(accepts_own_containers, Boolean);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Locations.insert({
      name,
      location,
      accepts_own_containers,
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username
    })
  },
  'locations.delete'(_id) {
    check(_id,String);
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Locations.remove({_id});
  },
  'locations.update'(_id, name, location, accepts_own_containers) {

    check(_id,String);
    check(name, String);
    check(location, {
      latitude: Number,
      longitude: Number,
    });
    check(accepts_own_containers, Boolean);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Locations.update(_id, {
      $set: {name,location,accepts_own_containers}
    });
  },
  'locations.get'(_id) {

    check(_id, String);

    return Locations.find({
      _id
    })
  },
})