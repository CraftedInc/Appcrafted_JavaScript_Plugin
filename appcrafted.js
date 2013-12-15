/**
 * AppCrafted JavaScript plugin. Requires jQuery > 1.5.
 */
function AppCrafted(accessKey) {
    this.endpoint = "http://api.appcrafted.com/exp/cspace/"
    this.authHeader = "Basic " + window.btoa(accessKey + ":");
    this.cSpaces = {};
}
/**
 * Retrieves the specified Asset.
 */
AppCrafted.prototype.getAsset = function(cSpaceID, assetID, onLoaded) {
    var cSpace = this.cSpaces[cSpaceID];
    var asset = null;
    if (cSpace) {
	for (var i = 0; i < cSpace.length; i++) {
	    if (cSpace[i].AssetID == assetID) {
		asset = cSpace[i];
	    }
	}
	onLoaded.call(this, asset ? null : "Asset Not Found", asset);
    } else {
	var _this = this;
	$.ajax({
	    url: _this.endpoint + cSpaceID + "/asset",
	    type: "GET",
	    dataType: "json",
	    headers: {"Authorization": _this.authHeader},
	    error: function(xhr, status, error) {
		onLoaded.call(_this, error || "Server Error", null);
	    },
	    success: function(data) {
		_this.cSpaces[cSpaceID] = data.Assets;
		for (var i = 0; i < data.Assets.length; i++) {
		    if (data.Assets[i].AssetID == assetID) {
			asset = data.Assets[i];
		    }
		}
		onLoaded.call(_this, asset ? null : "Asset Not Found", asset);
	    }
	});
    }
};
