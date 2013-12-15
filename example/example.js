$(document).ready(function() {
    var manager = new AppCrafted("rbw84XwK9nTMwWZecQxr");
    var assetIDs = ["0", "1"];
    var i = 0;
    manager.getAsset("C0zX5M3dvr0KOww3UtXf", assetIDs[i], onLoaded);
    $("#cycle").click(function() {
	i = ++i % assetIDs.length;
	manager.getAsset("C0zX5M3dvr0KOww3UtXf", assetIDs[i], onLoaded);
    });
});
// This function is called when the AppCrafted manager has the requested Asset.
function onLoaded(err, data) {
    if (err) {
	console.log(err);
    } else {
	if (!!data["image"]) {
	    $("#image").attr("src", data["image"]);
	}
	if (!!data["text"]) {
	    $("#caption").text( data["text"] );
	}
    }
}
