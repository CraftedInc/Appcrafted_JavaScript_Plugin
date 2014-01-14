/**
 * Appcrafted JavaScript plugin. 
 *
 * Plugin to manage data on the Appcrafted service (http://www.appcrafted.com/).
 * Version 0.1 — January 14, 2014,
 * Copyright © 2014 Crafted, Inc.
 *
 * Requires jQuery > 1.5.
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 * 1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 * 2. Altered source versions must be plainly marked as such, and must not be
 *    misrepresented as being the original software.
 *
 * 3. This notice may not be removed or altered from any source distribution.
 * 
 * Appcrafted / Crafted, Inc.
 * contact@appcrafted.com
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
