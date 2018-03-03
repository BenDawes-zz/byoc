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

	Locations.insert({
		name: "Happy fun shop!",
		properties: {
			accepts_own_containers: {
				value: true,
			}
		},
		location: {lat: 2.23524, lng: 31.234542},
		createdAt: new Date(),
		owner: "Admin",
		username: "Admin",
	});
	Locations.insert({
		name: "Sad fun shop!",
		properties: {
			accepts_own_containers: {
				value: false 
			}
		},
		location: {lat: 2.246537, lng: 31.6543245},
		createdAt: new Date(),
		owner: "Admin",
		username: "Admin",
	});
	Locations.insert({
		name: "Happy boring shop!",
		properties: {
			accepts_own_containers: {
				value: true
			}
		},
		location: {lat: 2.12413, lng: 31.232566},
		createdAt: new Date(),
		owner: "Admin",
		username: "Admin",
	});
});
