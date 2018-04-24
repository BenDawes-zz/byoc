import { Meteor } from 'meteor/meteor';
import { Locations, unsafeInsertLocation } from  '../imports/api/locations.js';
import { Comments } from  '../imports/api/comments.js';
import { InitDB } from '../imports/api/initdb'
import { ILocationBase, QuantityGradient } from 'imports/api/model.js';

Meteor.startup(() => {

	// Dummy data
	let db_status = InitDB.find({id: "db_initialised"}).fetch();
	if(db_status.length > 0) {
		return;
	}
	Locations.remove({});
	Comments.remove({});
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
			description: "Artisan Roast is a small coffee shop on Broughton Street in Edinburgh. They source, roast and import their own coffee from \
										independent farmers. They also offer a small discount if you bring your own reusable coffee cup instead of using one of their single use \
										cups. Their single use cups are Vegware, and therefore compostable wherever Vegware is accepted. They also are happy for you to bring \
										your own container to fill with their coffee grounds or beans from their bulk house coffee bin - though they encourage it to be a proper \
										container for keeping coffee fresh."
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
			description: "Tattie Shaws is a green grocers on Leith Walk near the end of Elm Row. They stock a variety of unpackaged fruit and vegetables, including from \
										local farms where possible. Some produce is wrapped in plastic. They sell most produce by weight, and are happy for you to use any sort of bag \
										to fill with produce. They also stock a good variety of grocery items such as bread, cheese, pasta, etc."
		}
	]

	dummyData.forEach((d) => unsafeInsertLocation(d));
});
