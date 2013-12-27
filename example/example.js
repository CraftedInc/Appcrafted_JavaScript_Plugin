$(document).ready(function() {
    var manager = new AppCrafted("rbw84XwK9nTMwWZecQxr");
    var assetIDs = ["0", "1", "2", "3"];
    var i = 0;
    manager.getAsset("C0zX5M3dvr0KOww3UtXf", assetIDs[i], onLoaded);
    $("#next").click(function() {
	i = ++i % assetIDs.length;
	manager.getAsset("C0zX5M3dvr0KOww3UtXf", assetIDs[i], onLoaded);
    });
    $("#prev").click(function() {
	i = (i + assetIDs.length - 1) % assetIDs.length;
	manager.getAsset("C0zX5M3dvr0KOww3UtXf", assetIDs[i], onLoaded);
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
