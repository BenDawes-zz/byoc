import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Coords } from 'google-map-react';
import { ILocation, IPoint, ILocationProperties, IMeteorEntity, ILocationBase } from './model';
import { getNewUserCreatedObject } from './usercreated';
import { getNewEditableObject } from './editable';

export const Locations = new Mongo.Collection<ILocation>('locations');

if (Meteor.isServer) {
  Meteor.publish('locations', function locationsPublication() {
    return Locations.find();
  });
}

Meteor.methods({
  'locations.insert'(locationBase: ILocationBase) {

    const { name, location, properties, description } = locationBase;

    check(name, String);
    check(description, String);
    check(location, {
      lat: Number,
      lng: Number,
    });
    check(properties, Object);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    unsafeInsertLocation(locationBase);
  },
  'locations.delete'(_id) {
    check(_id,String);
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Locations.remove({_id});
  },
  'locations.update'(_id: string, newLocation: ILocationBase) {

    const { name, location, properties, description } = newLocation;

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const { lastEditedAt, lastEditedBy, lastEditedByUsername } = getNewEditableObject<ILocation>(this.userId);
    const existingLocation = Locations.findOne(_id);
    const edits = [existingLocation,...existingLocation.edits];

    Locations.update(_id, {
      $set: {name,location,properties,description,lastEditedAt,lastEditedBy,lastEditedByUsername,edits}
    });
  }
})

export function updateLocation(_id: string, newLocation: ILocationBase) {
  Meteor.call('locations.update', _id, newLocation);
}

export function insertLocation(location: ILocationBase) {
  Meteor.call('locations.insert', location);
}

export function unsafeInsertLocation(locationBase: ILocationBase) {
  const { name, location, properties, description } = locationBase;
  const { owner, username, createdAt } = getNewUserCreatedObject(this.userId);
  const { lastEditedAt, lastEditedBy, lastEditedByUsername, edits } = getNewEditableObject<ILocation>(this.userId);

  Locations.insert({
    name,
    location,
    properties,
    description,
    owner,
    username,
    createdAt,
    reviews: [],
    lastEditedAt,
    lastEditedBy,
    lastEditedByUsername,
    edits,
  })
}