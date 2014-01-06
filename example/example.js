$(document).ready(function() {
    var manager = new AppCrafted("rbw84XwK9nTMwWZecQxr");
    var assetIDs = ["Vesper", "Sunrise", "Sunset", "Darrington"];
    var i = 0;
    manager.getAsset("XIQBQpssdnDOic8QEiI1", assetIDs[i], onLoaded);
    $("#next").click(function() {
	i = ++i % assetIDs.length;
	manager.getAsset("XIQBQpssdnDOic8QEiI1", assetIDs[i], onLoaded);
    });
    $("#prev").click(function() {
	i = (i + assetIDs.length - 1) % assetIDs.length;
	manager.getAsset("XIQBQpssdnDOic8QEiI1", assetIDs[i], onLoaded);
    });
});
// This function is called when the AppCrafted manager has the requested Asset.
function onLoaded(err, data) {
    if (err) {
	console.log(err);
    } else {
	$("#image").attr("src", !!data["image"] ? data["image"]["Value"] : null);
	$("#caption").text(!!data["caption"] ? data["caption"]["Value"] : "");
    }
}
