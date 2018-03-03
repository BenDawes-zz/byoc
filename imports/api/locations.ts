import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Coords } from 'google-map-react';

export type IPoint = Coords;

export enum QuantityGradient {
  None = 1,
  Some,
  Most,
  All
}

export interface ILocationProperty<T> {
  value: T;
}

export interface ILocationProperties {
  accepts_own_containers?: ILocationProperty<Boolean>;
  own_packaging_recyclable?: ILocationProperty<QuantityGradient>;
  own_packaging_compostable?: ILocationProperty<QuantityGradient>;
  unpackaged_items?: ILocationProperty<QuantityGradient>;
  return_own_packaging?: ILocationProperty<QuantityGradient>;
}

export interface ILocation extends ILocationBase {
  _id: string,
}

export interface ILocationBase {
  name: string,
  location: IPoint,
  properties: ILocationProperties,
  owner: string,
  username: string | undefined,
  createdAt: Date;
}

export const Locations = new Mongo.Collection<ILocationBase>('locations');

if (Meteor.isServer) {
  Meteor.publish('locations', function locationsPublication() {
    return Locations.find();
  });
}

Meteor.methods({
  'locations.insert'(name: string, location: IPoint, properties: ILocationProperties) {

    check(name, String);
    check(location, {
      lat: Number,
      lng: Number,
    });
    check(properties, Object);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Locations.insert({
      name,
      location,
      properties,
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
      createdAt: new Date(),
    })
  },
  'locations.delete'(_id) {
    check(_id,String);
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Locations.remove({_id});
  },
  'locations.update'(_id: string, name: string, location: IPoint, properties: ILocationProperties) {

    check(_id,String);
    check(name, String);
    check(location, {
      lat: Number,
      lng: Number,
    });
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Locations.update(_id, {
      $set: {name,location,properties}
    });
  }
})

export function updateLocation(_id: string, name: string, location: IPoint, properties: ILocationProperties) {
  Meteor.call('locations.update',_id, name, location, properties);
}

export function insertLocation(name: string, location: IPoint, properties: ILocationProperties) {
  Meteor.call('locations.insert', name, location, properties);
}