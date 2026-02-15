var categories = new Array();

categories['Personal Watercraft'] = new Array('1 Passenger', '2 Passenger', '3 Passenger', 'Aft Cabin','Air Boat','Angler','Bass Boat','Bay Boat','Blue Water Fishing','Bowrider','Catamaran (Power)','Center Console','Classic (Power)','Commercial','Convertible','Cruiser (Power)','Cuddy Cabin','Deck Boat','Dive Boat','Downeast','Dual Console','Duck Boat','Express Cruiser','Fish and Ski','Flats Boat','Flybridge','Freshwater Fishing','High Performance','House Boat','Jet Boat','Jon Boat','Mega Yacht','Motor Yacht','Other','Pilothouse','Pontoon','Runabout','Saltwater Fishing','Ski and Wakeboard Boat','Skiff','Sport Fisherman','Submersible','Trawler','Walkaround','Weekender');
categories['Power & Motor Boats'] = categories['Personal Watercraft']
categories['Sail Boats'] = new Array('Catamaran (Sail)','Classic (Sail)','Cruiser (Sail)','Cruiser/Racer','Cutter','Daysailor/Weekender','Ketch','Motorsailer','Multi-Hull','Other','Racer','Sloop','Yawl');
categories['Other Boats'] = new Array('Other');

function set_type_dropdown(type)
{
	if (type == "")
	{
		$('#listing_info_klass').parent().html('<select name="listing_info[klass]" id="listing_info_klass"><option value="">Select Type First</option></select>');
		return;
	}
	else if (type == 'Other Boats')
	{
		$('#listing_info_klass').parent().html('<input name="listing_info[klass]" id="listing_info_klass" type="text" />');
		return;
	}
	
	var html = '<option value="">Select Type</option>';
	
	for (i = 0; i < categories[type].length; i++)
	{
		html += '<option value="' + categories[type][i] + '">' + categories[type][i] + "</option>\n";
	}
	
	$('#listing_info_klass').parent().html('<select name="listing_info[klass]" id="listing_info_klass">' + html + '</select>');
}

function set_type_dropdown2(type)
{
	if (type == "")
	{
		$('#find_boat_klass').parent().html('Type <select name="find[boat_klass]" id="find_boat_klass"><option value="">Select Type First</option></select>');
		return;
	}
	else if (type == 'Other Boats')
	{
		$('#find_boat_klass').parent().html('Type <input name="find[boat_klass]" id="find_boat_klass" type="text" />');
		return;
	}
	
	var html = '<option value="">Any</option>';
	
	for (i = 0; i < categories[type].length; i++)
	{
		html += '<option value="' + categories[type][i] + '">' + categories[type][i] + "</option>\n";
	}
	
	$('#find_boat_klass').parent().html('Type <select name="find[boat_klass]" id="find_boat_klass">' + html + '</select>');
}

// --------------------------------------------------------------------

var manufacturers = new Array();

manufacturers['Power & Motor Boats'] = new Array('AB Inflatables','Alglas','Alumacraft','Aquasport','Astro','Astroglass','Avon','Baja','Bass Cat','Bass Tracker','Bassmaster Boats','Bayliner','Boston Whaler','Cajun','Caravelle','Carolina','Carver Boats','Celebrity','Centurion','Century','Challenger','Champion Boats','Chaparral','Charger Boat','Chris Craft','Cigarette','Cobalt','Cobia','Crestliner','Crownline','Crusader','Cummins','Donzi','Dusky','Ebbtide','Fisher','Formula','Four Winns','Gibson','Glastron','Grady White','Grand Banks','Gulfstream','Hatteras','Hewes','Hydra-Sports','Imperial','Inland Seas','Invader','Javelin','JC Craft','Jeffries','Johnson','Kenner','Key Largo','Larson','Lowe','Lund','Magnum','Mako','Mariah','Mariner','Marquis','Mastercraft','Maxum','MB Sport','McKee Craft','Meridian','Monterey','Myacht','Nitro','Ocean Yachts','Other','Owen','Pelican','Polar','Polar Kraft','Princecraft','Pro Craft','Pro Sports','Profile','Ranger','Regal','Rinker','Sanger','Sea Boss','Sea Doo','Sea Fox','Sea Pro','Sea Ray','Seacraft','Sears','Seaswirl','Silverline','Silverton','Simmons','Skeeter','Sleek Craft','Smoker-Craft','Sprint','Star','Starcraft','Stingray','Stratos','Sugar Sand','Sun Tracker','Tahiti','Tahoe','Tracker','Triton','Triumph','Trophy','Viking','Voyager','Weeres','Wellcraft','Wells','Windsor Craft','Winner','Xpress','Yamaha');
manufacturers['Personal Watercraft'] = new Array('Honda','Kawasaki','Other','Polaris','Sea-Doo','Tigershark','Yamaha');
manufacturers['Sail Boats'] = new Array('Beneteau','Bristol','C&C','Catalina','Challenger','Columbia','Endeavour','Hobie Cat','Hunter','Irwin','J Boats','Jeanneau','Laser','MacGregor','Melges','Morgan','Nickels','North Star',"O'Day",'Other','Pearson','Roberts','Rodgers','Sabre Yachts','Sunfish','Tartan');
manufacturers['Other Boats'] = new Array('Other');

function set_manufacturer_dropdown(type)
{
	if (type == "")
	{
		$('#listing_info_manufacturer').parent().html('<select name="listing_info[manufacturer]" id="listing_info_manufacturer"><option value="">Select Sub Category First</option></select>');
		return;
	}
	else if (type == 'Other Boats')
	{
		$('#listing_info_manufacturer').parent().html('<input name="listing_info[manufacturer]" id="listing_info_manufacturer" type="text" />');
		return;
	}
	
	var html = '<option value="">Select Manufacturer</option>';
	
	for (i = 0; i < manufacturers[type].length; i++)
	{
		html += '<option value="' + manufacturers[type][i] + '">' + manufacturers[type][i] + "</option>\n";
	}
	
	$('#listing_info_manufacturer').parent().html('<select name="listing_info[manufacturer]" id="listing_info_manufacturer">' + html + '</select>');
}

function set_manufacturer_dropdown2(type)
{
	if (type == "")
	{
		$('#find_boat_manufacturer').parent().html('Manufacturer <select name="find[boat_manufacturer]" id="find_boat_manufacturer"><option value="">Select Type First</option></select>');
		return;
	}
	else if (type == 'Other Boats')
	{
		$('#find_boat_manufacturer').parent().html('Manufacturer <input name="find[boat_manufacturer]" id="find_boat_manufacturer" type="text" />');
		return;
	}
	
	var html = '<option value="">Any</option>';
	
	for (i = 0; i < manufacturers[type].length; i++)
	{
		html += '<option value="' + manufacturers[type][i] + '">' + manufacturers[type][i] + "</option>\n";
	}
	
	$('#find_boat_manufacturer').parent().html('Manufacturer <select name="find[boat_manufacturer]" id="find_boat_manufacturer">' + html + '</select>');
}

// --------------------------------------------------------------------
