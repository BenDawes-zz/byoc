import { Meteor } from 'meteor/meteor';
import { Locations, unsafeInsertLocation } from  '../imports/api/locations.js';
import { InitDB } from '../imports/api/initdb'
import { ILocationBase, QuantityGradient } from 'imports/api/model.js';

Meteor.startup(() => {

	// Dummy data
	let db_status = InitDB.find({id: "db_initialised"}).fetch();
	if(db_status.length > 0) {
		return;
	}
	Locations.remove({})
	InitDB.remove({})

	InitDB.insert({id: "db_initialised"});

	const dummyData: ILocationBase[] = [
		{
			name: "Artisan Roast",
			properties: {
				accepts_own_containers: {
					value: true,
				}
			},
			location: {lat:55.957929,lng: -3.188862},
		},{
			name: "Tattie Shaws",
			properties: {
				accepts_own_containers: {
					value: false 
				},
				own_packaging_recyclable: {
					value: QuantityGradient.Some,
				},
				own_packaging_compostable: {
					value: QuantityGradient.Some,
				},
				unpackaged_items: {
					value: QuantityGradient.Most,
				}
			},
			location: {lat: 55.959660, lng: -3.182572},
		}
	]

	dummyData.forEach((d) => unsafeInsertLocation(d));
});
