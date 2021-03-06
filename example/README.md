# Appcrafted JavaScript Plugin Example

### Step 1: Extract the files.

Extract the plugin and example to your machine.

### Step 2: Verify index.html

Edit `index.html` to make sure that `appcrafted.js`, `example.js` are correctly referenced. Also ensure that the jQuery version is > 1.5.

     <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
     <script type="text/javascript" src="./../appcrafted.js"></script>
     <script type="text/javascript" src="./example.js"></script>

### Step 3 (optional): Use your own Access Key, Container ID, and Asset IDs.

Edit `example.js` and edit the following lines. Supply Asset IDs in an array.

      var accessKey = YOUR_ACCESS_KEY;
      var containerID = YOUR_CONTAINER_ID;
      var assetIDs = [FIRST_ASSET_ID, SECOND_ASSET_ID];

**NOTE:** To use this example correctly, your assets should include these two attributes. Edit assets through the [developer console](https://developer.appcrafted.com).

	  Attribute Name: "image", Type: "Image"

	  Attribute Name: "caption", Type: "String"

### Step 4: Run.

Open `index.html` and try it out! If you're using your own Access Key and assets, try editing them in the [developer console](https://developer.appcrafted.com).

**NOTE:** Assets are cached by the plugin, so you will need to refresh the page to see your changes.
