var categories = new Array();

categories['Motorcycles'] = new Array('Classic/Vintage', 'Cruiser', 'Custom', 'Dirt Bikes & Motocross', 'Dual Purpose', 'Other', 'Sport Bike', 'Sport Touring', 'Standard', 'Touring');
categories['All Terrain Vehicles'] = new Array('Four Wheel Sport', 'Four Wheel Utility', 'Four Wheel Youth', 'Other');
categories['Scooters & Mopeds'] = new Array('Not Applicable');
categories['Snowmobiles'] = new Array('Mountain', 'Other', 'Sport', 'Touring', 'Trail', 'Vintage');
categories['Other'] = new Array('Other');

function set_type_dropdown(type)
{
	
	if (type == "")
	{
		$('#listing_info_klass').parent().html('<select name="listing_info[klass]" id="listing_info_klass"><option value="">Select Sub-Category First</option></select>');
		return;
	}
	else if (type == 'Other')
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
		$('#find_motorcycle_klass').parent().html('Type: <select name="listing_info[motorcycle_klass]" id="find_motorcycle_klass"><option value="">Select Sub-Category First</option></select>');
		return;
	}
	else if (type == 'Other')
	{
		$('#find_motorcycle_klass').parent().html('Type: <input name="find[motorcycle_klass]" id="find_motorcycle_klass" type="text" />');
		return;
	}
	
	var html = '<option value="">Any</option>';
	
	for (i = 0; i < categories[type].length; i++)
	{
		html += '<option value="' + categories[type][i] + '">' + categories[type][i] + "</option>\n";
	}
	$('#find_motorcycle_klass').parent().html('Type: <select name="find[motorcycle_klass]" id="find_motorcycle_klass">' + html + '</select>');
}

// --------------------------------------------------------------------

var manufacturers = new Array();

manufacturers['Motorcycles'] = new Array('American Ironhorse', 'Aprilia', 'ATK', 'Benelli', 'Big Dog', 'Bimota', 'BMW', 'Boss Hoss', 'Bourget', 'BSA', 'Buell', 'Bultaco', 'Can-Am', 'Cushman', 'Custom Built Motorcycles', 'Ducati', 'Gas Gas', 'Harley-Davidson', 'Hodaka', 'Honda', 'Husaberg', 'Husqvarna', 'Hyosung', 'Indian', 'Kawasaki', 'KTM', 'Kymco', 'Lifan', 'Moto Guzzi', 'MV Agusta', 'Norton', 'Other Make', 'Royal Enfield', 'Suzuki', 'Titan', 'Triumph', 'Ural', 'Vento', 'Victory', 'Vincent', 'Von Dutch', 'Yamaha');
manufacturers['All Terrain Vehicles'] = new Array('Arctic Cat', 'Bombardier', 'Can-Am', 'Cannondale', 'Honda', 'Hunter', 'Kawasaki', 'Kazuma', 'Komoto', 'Kymco', 'Other Make', 'Polaris', 'QLink', 'Suzuki', 'Warrior', 'Wildfire', 'Yamaha');
manufacturers['Scooters & Mopeds'] = new Array('Aprilia', 'BMS', 'Honda', 'Hyosung', 'Kymco', 'Lambretta', 'Other Make', 'Phantom', 'Piaggio', 'QingQi', 'Suzuki', 'Vespa', 'Wildfire', 'Yamaha');
manufacturers['Snowmobiles'] = new Array('Arctic Cat', 'Blade', 'Bombardier', 'John Deere', 'Kawasaki', 'Mercury', 'Other Make', 'Polaris', 'Scorpion', 'Ski-Doo', 'Yamaha');
manufacturers['Other'] = new Array('Other');

function set_manufacturer_dropdown(type)
{
	if (type == "")
	{
		$('#listing_info_manufacturer').parent().html('<select name="listing_info[manufacturer]" id="listing_info_manufacturer"><option value="">Select Type First</option></select>');
		return;
	}
	else if (type == 'Other')
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
		$('#find_motorcycle_manufacturer').parent().html('Manufacturer: <select name="find[motorcycle_manufacturer]" id="find_motorcycle_manufacturer"><option value="">Select Type First</option></select>');
		return;
	}
	else if (type == 'Other')
	{
		$('#find_motorcycle_manufacturer').parent().html('Manufacturer: <input name="find[motorcycle_manufacturer]" id="find_motorcycle_manufacturer" type="text" />');
		return;
	}
	
	var html = '<option value="">Any</option>';
	
	for (i = 0; i < manufacturers[type].length; i++)
	{
		html += '<option value="' + manufacturers[type][i] + '">' + manufacturers[type][i] + "</option>\n";
	}
	
	$('#find_motorcycle_manufacturer').parent().html('Manufacturer: <select name="find[motorcycle_manufacturer]" id="find_motorcycle_manufacturer">' + html + '</select>');
}

// --------------------------------------------------------------------