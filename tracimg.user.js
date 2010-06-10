// ==UserScript==
// @name           Render links to images inline in Trac (no duplicated images)
// @description    Display images (including attachments) as images directly in a Trac page. Based on work of Britt Selvitelle, fixed duplicated images [http://userscripts.org/scripts/show/20411]
// @namespace      trac
// @author		   Damien Hou
// @include        http*://trac*/ticket*
// @include        http*://trac*/wiki*
// ==/UserScript==
addEventListener("load", renderImages, false);
function renderImages() {
	if (window.location.href.indexOf('trac') < 0) {
		return;
	}
    collections = [];
    if (content_links = document.getElementById('content')) {
        content_links = content_links.getElementsByTagName("a");
    }
    if (content_links.length) {
        for (var j = 0; j < content_links.length; j++) {
            link = content_links[j];
            src = link.href;
            if (src.lastIndexOf('.png') > 0 || src.lastIndexOf('.gif') > 0 || src.lastIndexOf('.jpg') > 0) {
                var image = document.createElement("div");
                image.innerHTML = '<img style="max-width:620px;" src="' + src + '?format=raw" /><br />';
                link.parentNode.insertBefore(image, link);
            } else if (src.lastIndexOf('.swf') > 0) {
				var swf = document.createElement('div');
				swf.innerHTML = '<object type="application/x-shockwave-flash" width="400" height="300" data="' + src + '"><param name="wmode" value="opaque"></object>';
				link.parentNode.insertBefore(swf, link);
			}
        }
    }
}
