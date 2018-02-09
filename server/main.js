import { Meteor } from 'meteor/meteor';
import { Locations } from  '../imports/api/locations.js';
import { InitDB } from '../imports/api/initdb'

Meteor.startup(() => {

	// Dummy data
	let db_status = InitDB.find({id: "db_initialised"}).fetch();
	if(db_status.length > 0) {
		return;
	}
	Locations.remove({})
	InitDB.remove({})

	InitDB.insert({id: "db_initialised"});

	Locations.insert({name: "Happy fun shop!", accepts_own_containers: true, location: {latitude: 2.23524, longitude: 31.234542}, createdAt: new Date()});
	Locations.insert({name: "Sad fun shop!", accepts_own_containers: false, location: {latitude: 2.246537, longitude: 31.6543245}, createdAt: new Date()});
	Locations.insert({name: "Happy boring shop!", accepts_own_containers: true, location: {latitude: 2.12413, longitude: 31.232566}, createdAt: new Date()});
});
