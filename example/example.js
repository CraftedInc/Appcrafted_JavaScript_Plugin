$(document).ready(function() {
    // *************************************************************************
    // Try changing these values to your own:
    var accessKey = "rbw84XwK9nTMwWZecQxr";
    var containerID = "XIQBQpssdnDOic8QEiI1";
    var assetIDs = ["Vesper", "Sunrise", "Sunset", "Darrington"];
    // *************************************************************************
    var manager = new Appcrafted(accessKey);
    var i = 0;
    manager.getAsset(containerID, assetIDs[i], assetLoaded);
    $("#next").click(function() {
	i = ++i % assetIDs.length;
	manager.getAsset(containerID, assetIDs[i], assetLoaded);
    });
    $("#prev").click(function() {
	i = (i + assetIDs.length - 1) % assetIDs.length;
	manager.getAsset(containerID, assetIDs[i], assetLoaded);
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
