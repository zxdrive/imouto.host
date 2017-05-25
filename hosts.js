var fs = require("fs");

var cheerio = require("cheerio"),
	request = require("request");

var url = "https://github.com/zxdrive/imouto.host/blob/master/imouto.host.txt";
var txtPath = "host.txt";

var getWebContent = function (callback){

	console.log("try to link github...");

	var fileTxt = "####NODE START####\r\n";

	request(url,function (err,res){

		if(err){
			console.error("network error!");
			return;
		}

		var $ = cheerio.load(res.body.toString());

		var table = $(".js-file-line-container tr");

		table.each(function (i,el){

			var els = $(el).find(".js-file-line").html();

			if(els[0] != "#"){
				fileTxt += els + "\r\n";
			}
		});

		fileTxt += "####NODE END####\r\n"

		callback(new Buffer(fileTxt));
	});
};

var fnWriteFile = function (txt){

	fs.open(txtPath, 'w+',function(err, data) {
	if (err) {
	    console.log("ERROR !! " +err);
	} else {
	    fs.write(data, txt, 0, txt.length, null, function(err) {
	        if (err) console.log("ERROR !! " +err);
	        fs.close(data, function() {
	            console.log('written success');
	        })
	    });
	}
	});
}

getWebContent(fnWriteFile);
