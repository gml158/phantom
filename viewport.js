var page = require('webpage').create(),
		address, output, size;
var system = require('system');

var arg_count = system.args.length - 1;
if (arg_count < 4 || arg_count > 5) {
	    console.log('Usage: viewport.js URL filename sizeX sizeY');
	    phantom.exit();
	} else {
		    address = system.args[1];
		    output = system.args[2];
		    sizeX = system.args[3];
		    sizeY = system.args[4];
		    page.viewportSize = { width: sizeX, height: sizeY };
		    page.open(address, function (status) {
			            if (status !== 'success') {
					                console.log('Unable to load the address!');
					            } else {
							                window.setTimeout(function () {
										                page.render(output);
										                phantom.exit();
										            }, 200);
							            }
			        });
		}
