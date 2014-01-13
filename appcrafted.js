/**
 * Appcrafted JavaScript plugin. Requires jQuery > 1.5.
 */
function Appcrafted(accessKey) {
    this.endpoint = "http://api.appcrafted.com/v0/assets/";
    this.authHeader = "Basic " + window.btoa(accessKey + ":");
    this.containers = {};
}
/**
 * Clears the asset cache, forcing the plugin to get fresh data from the server.
 */
Appcrafted.prototype.clearCache = function() {
    this.containers = {};
};
/**
 * Retrieves the specified Asset.
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
		callback.call(_this, error || "Server Error", null);
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
/**
 * Updates the specified Asset.
 */
Appcrafted.prototype.updateAsset = function(params, containerID, assetID, callback) {
    var _this = this;
    $.ajax({
	url: _this.endpoint + containerID + "/" + assetID,
	type: "PUT",
	dataType: "json",
	data: params,
	headers: {"Authorization": _this.authHeader},
	error: function(xhr, status, error) {
	    callback.call(_this, error || "Server Error", null);
	},
	success: function(data) {
	    callback.call(_this, null, data.message || "Asset Updated");
	}
    });
};
