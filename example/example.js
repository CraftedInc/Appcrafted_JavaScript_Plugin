$(document).ready(function() {
    var manager = new Appcrafted("rbw84XwK9nTMwWZecQxr");
    var assetIDs = ["Vesper", "Sunrise", "Sunset", "Darrington"];
    var i = 0;
    manager.getAsset("XIQBQpssdnDOic8QEiI1", assetIDs[i], assetLoaded);
    $("#next").click(function() {
	i = ++i % assetIDs.length;
	manager.getAsset("XIQBQpssdnDOic8QEiI1", assetIDs[i], assetLoaded);
    });
    $("#prev").click(function() {
	i = (i + assetIDs.length - 1) % assetIDs.length;
	manager.getAsset("XIQBQpssdnDOic8QEiI1", assetIDs[i], assetLoaded);
    });
    $("#change-caption").click(function() {
	manager.clearCache();
	var params = {
	    "caption": {
		"Type": "STRING",
		"Value": $("#new-caption").val() || "",
		"Action": "UPDATE"
	    }
	};
	$("#new-caption").val("");
	manager.updateAsset(params, "XIQBQpssdnDOic8QEiI1", assetIDs[i],
			    function(err, data) {
	    if (!err) {
		manager.getAsset("XIQBQpssdnDOic8QEiI1", assetIDs[i], assetLoaded);
	    }
	});
    });
});
// This function is called when the Appcrafted manager has the requested Asset.
function assetLoaded(err, data) {
    if (err) {
	console.log(err);
    } else {
	$("#image").attr("src", !!data["image"] ? data["image"]["Value"] : null);
	$("#caption").text(!!data["caption"] ? data["caption"]["Value"] : "");
    }
}
