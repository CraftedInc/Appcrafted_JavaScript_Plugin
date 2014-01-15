# Appcrafted JavaScript Plugin

## Step 1 - Install jQuery and the Appcrafted plugin.

Requires jQuery version > 1.5.

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <script type="text/javascript" src="path/to/appcrafted.js"></script>

## Step 2 - Write a script to use the plugin.

    var manager = new Appcrafted(<ACCESS_KEY>);
    var i = 0;
    manager.getAsset(<CONTAINER_ID>, <ASSET_ID>, assetLoaded);

Be sure to define a callback, in this case `assetLoaded`, to be called with the asset data.

    function assetLoaded(err, data) {
        if (err) {
	    console.log(err);
        } else {
	    // Do something with the data.
	    console.log(data);
        }
    }

## Step 3 - Install your script and run.

    <script type="text/javascript" src="path/to/your/script.js"></script>

## Methods

Retrieve the specified asset.
    getAsset(<CONTAINER_ID>, <ASSET_ID>, callback)

Clear the asset cache. Assets are cached by the plugin, and clearing the cache forces the plugin to grab fresh assets.
    clearCache()