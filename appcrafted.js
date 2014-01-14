/**
 * Appcrafted JavaScript plugin. Requires jQuery > 1.5.
 */
function Appcrafted(accessKey) {
    this.endpoint = "http://api.appcrafted.com/v0/assets/";
    this.authHeader = "Basic " + window.btoa(accessKey + ":");
    this.containers = {};
}
/**
 * Clear the asset cache.
 */
Appcrafted.prototype.clearCache = function() {
    this.containers = {};
};
/**
 * Retrieve the specified asset.
 */
Appcrafted.prototype.getAsset = function(containerID, assetID, callback) {
    var container = this.containers[containerID];
    var asset = null;
    if (container) {
	for (var i = 0; i < container.length; i++) {
	    if (container[i].AssetID == assetID) {
		asset = container[i];
		break;
	    }
	}
	callback.call(this, asset ? null : "Asset Not Found", asset);
    } else {
	var _this = this;
	$.ajax({
	    url: _this.endpoint + containerID + "/all",
	    type: "GET",
	    dataType: "json",
	    headers: {"Authorization": _this.authHeader},
	    error: function(xhr, status, error) {
		callback.call(_this, error || "Failed to Retrieve Asset", null);
	    },
	    success: function(data) {
		_this.containers[containerID] = data.Assets;
		for (var i = 0; i < data.Assets.length; i++) {
		    if (data.Assets[i].AssetID == assetID) {
			asset = data.Assets[i];
		    }
		}
		callback.call(_this, asset ? null : "Asset Not Found", asset);
	    }
	});
    }
};
