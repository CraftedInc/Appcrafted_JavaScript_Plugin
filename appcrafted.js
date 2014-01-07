/**
 * AppCrafted JavaScript plugin. Requires jQuery > 1.5.
 */
function AppCrafted(accessKey) {
    this.endpoint = "http://api.appcrafted.com/v0/assets/";
    this.authHeader = "Basic " + window.btoa(accessKey + ":");
    this.containers = {};
}
/**
 * Retrieves the specified Asset.
 */
AppCrafted.prototype.getAsset = function(containerID, assetID, onLoaded) {
    var container = this.containers[containerID];
    var asset = null;
    if (container) {
	for (var i = 0; i < container.length; i++) {
	    if (container[i].AssetID == assetID) {
		asset = container[i];
	    }
	}
	onLoaded.call(this, asset ? null : "Asset Not Found", asset);
    } else {
	var _this = this;
	$.ajax({
	    url: _this.endpoint + containerID + "/all",
	    type: "GET",
	    dataType: "json",
	    headers: {"Authorization": _this.authHeader},
	    error: function(xhr, status, error) {
		onLoaded.call(_this, error || "Server Error", null);
	    },
	    success: function(data) {
		_this.containers[containerID] = data.Assets;
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
