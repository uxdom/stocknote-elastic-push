function generateJavaCode(c, b, g, a, f) {
    c = c.replace("<< ACCESS_KEY_ID >>", g);
    c = c.replace("<< SECRET_KEY >>", a);
    c = c.replace("<< ENDPOINT >>", f);
    var e = [];
    for (var d in b) {
        e.push('params.put("' + d + '", "' + b[d] + '");')
    }
    c = c.replace("/* << PARAMS >> */", e.join("\n        "));
    return c
}

var ItemPage=1;

function generatePhpCode(f, b, g, a, e) {
    f = f.replace("<< ACCESS_KEY_ID >>", g);
    f = f.replace("<< SECRET_KEY >>", a);
    f = f.replace("<< ENDPOINT >>", e);
    var d = [];
    for (var c in b) {
        d.push('"' + c + '" => "' + b[c] + '"')
    }
    f = f.replace("/* << PARAMS >> */", d.join(",\n    "));
    return f
}

function generateRubyCode(b, c, g, a, f) {
    b = b.replace("<< ACCESS_KEY_ID >>", g);
    b = b.replace("<< SECRET_KEY >>", a);
    b = b.replace("<< ENDPOINT >>", f);
    var e = [];
    for (var d in c) {
        e.push('"' + d + '" => "' + c[d] + '"')
    }
    b = b.replace("# << PARAMS >>", e.join(",\n  "));
    return b
}

function generateAddToCartHtmlCode(e, d, c, h, k) {
    var b = "";
    for (var f = 0; f < d.length; f++) {
        var j = new RegExp("amazon.([^/]*)");
        var g = j.exec(k);
        var a = "http://www.amazon." + g[1] + "/gp/aws/cart/add.html?AWSAccessKeyId=" + c;
        a += "&AssociateTag=" + h;
        a += "&ASIN.1=" + d[f];
        a += "&Quantity.1=1";
        b += "<!-- Add to Cart Button for ASIN : " + d[f] + " -->\n";
        b += '<span class="a-button a-button-primary a-button-icon">\n    <a target="_blank" href="' + a + '" style="text-decoration:none;">\n        <span class="a-button-inner">\n            <i class="a-icon a-icon-cart"></i>\n            <input class="a-button-input" type="submit">\n            <span class="a-button-text" aria-hidden="true">Add to Cart</span>\n        </span>\n    </a>\n</span><br>\n'
    }
    b += e;
    return b
}

function generateHtmlCode(g, b, a, h, f, e) {
    var d = "http://" + getEndpoint(getActiveMarketplace()).substr(0, getEndpoint(getActiveMarketplace()).indexOf("http://webservices.amazon.es/")) + "/scratchpad/assets/images/Amazon-Favicon-64x64.png";
    var c = "<!-- HTML code for ASIN : " + g + ' -->\n<div class="product-box">\n    <a target="_blank" href="' + b + '">\n        <img src="' + a + '" width="120" height="160">\n    </a>\n    <div class="product-title">\n        <h3>' + h + '</h3>\n    </div>\n    <p class="product-price">' + f + "<br>\n";
    if (e != "#") {
        c += '       <a target="_blank" style="color: #337ab7; text-decoration:none;" href="' + e + '"> More offers </a>\n'
    } else {
        c += '       <span style="color:#fff;">|</span>\n'
    }
    c += '   </p>\n    <div>\n        <span class="a-button a-button-primary">\n            <a target="_blank" href="' + b + '" style="text-decoration:none">\n                <span class="a-button-inner">\n                    <img src="' + d + '" class="a-icon a-icon-shop-now">\n                    <input class="a-button-input" type="submit" value="Add to cart">\n                    <span class="a-button-text">Select</span>\n                </span>\n            </a>\n        </span>\n    </div>\n</div>\n';
    return c
}

function merge(b, a) {
    var f = {};
    var e = config.Global.Operations[a].Parameters;
    for (var d in e) {
        f[d] = e[d]
    }
    if ("Operations" in config.Local.Marketplace[b]) {
        if (a in config.Local.Marketplace[b].Operations) {
            var c = config.Local.Marketplace[b].Operations[a].Parameters;
            for (var d in c) {
                f[d] = c[d]
            }
        }
    }
    return f
}

function getOperations(a) {
    return config.Local.Marketplace[a].ValidOperations
}

function getEndpoint(a) {
    return config.Local.Marketplace[a].Endpoint
}

function getEndpointKey(c) {
    var b = config.Local.Marketplace;
    for (var a in b) {
        if (b[a].Endpoint == c) {
            return a
        }
    }
}

function getSearchIndices(a) {
    var c = [];
    var d = config.Local.Marketplace[a].SearchCategories;
    for (var b in d) {
        c.push(d[b].Value)
    }
    return c
}

function getMarketplaces() {
    var a = config.Local.Marketplace;
    return Object.keys(a)
}

function getAllOperations() {
    var a = config.Global.Operations;
    return Object.keys(a)
}

function getOperationDescription(a) {
    return config.Global.Operations[a].Description
}

function getOperationName(a) {
    return config.Global.Operations[a].Value
}

function getOperationParameters(b, a) {
    var c = merge(b, a);
    return Object.keys(c)
}

function getOperationType(a) {
    return config.Global.Operations[a].Type
}

function getOperationDocumentationLink(a) {
    return config.Global.Operations[a].URL
}

function getParameterDefaultValue(b, a, c) {
    return merge(b, a)[c].Default
}

function getParameterDescription(b, a, c) {
    return merge(b, a)[c].Description
}

function isParameterMandatory(b, a, c) {
    return merge(b, a)[c].Mandatory
}

function getParameterDisplayType(b, a, c) {
    return merge(b, a)[c].Display
}

function getParameterValidValues(b, a, f) {
    var d = [];
    var e = merge(b, a)[f].ValidValues;
    for (var c in e) {
        d.push(e[c].Value)
    }
    return d
}

function getParameterValueDescriptions(b, a, f) {
    var d = [];
    var e = merge(b, a)[f].ValidValues;
    for (var c in e) {
        d.push(e[c].Description)
    }
    return d
}

function getItemValidValues(b, a) {
    var c = [];
    var d = merge(b, a).Item.ValidValues;
    return Object.keys(d).sort()
}

function getItemParameterDefaultValue(b, a, c) {
    return merge(b, a).Item.ValidValues[c].Default
}

function getItemParameterDescription(b, a, c) {
    return merge(b, a).Item.ValidValues[c].Description
}

function isItemParameterMandatory(b, a, c) {
    return merge(b, a).Item.ValidValues[c].Mandatory
}

function getItemParameterDisplayType(b, a, c) {
    return merge(b, a).Item.ValidValues[c].Display
}

function getItemParameterValidValues(b, a, f) {
    var d = [];
    var e = merge(b, a).Item.ValidValues[f].ValidValues;
    for (var c in e) {
        d.push(e[c].Value)
    }
    return d
}

function getItemParameterValueDescriptions(b, a, f) {
    var d = [];
    var e = merge(b, a).Item.ValidValues[f].ValidValues;
    for (var c in e) {
        d.push(e[c].Description)
    }
    return d
}

function updateCookieHistory(a) {
    if (historyOfRequests.indexOf(a) == -1) {
        historyOfRequests.push(a)
    } else {
        historyOfRequests.splice(historyOfRequests.indexOf(a), 1);
        historyOfRequests.push(a)
    }
    if (historyOfRequests.length == 11) {
        historyOfRequests.splice(0, 1)
    }
    setCookie("History", JSON.stringify(historyOfRequests), historyCookieValidity);
    $("#HistoryBadge").text(historyOfRequests.length)
}

function selectProduct(o){
	var src='';
	if(jQuery(o).hasClass("selectedProduct")){
		src="assets/images/normal.png";
		jQuery(o).removeClass("selectedProduct");
	}else{
		src="assets/images/tick.png";
		jQuery(o).addClass("selectedProduct");
	}

	jQuery(o).find(".a-icon-shop-now").attr("currentsrc",src);
	jQuery(o).find(".a-icon-shop-now").attr("src",src);

	

}

function buildHistoryList() {
    var g = "";
    if (checkCookie("History")) {
        historyOfRequests = JSON.parse(getCookie("History"))
    } else {
        historyOfRequests = []
    }
    $("#HistoryBadge").text(historyOfRequests.length);
    if (historyOfRequests.length == 0) {
        g = '<li><a href="#">No History</a></li>'
    } else {
        g += '<li class="dropdown-header" style="text-align:center;"><a value="ClearHistory" href="#"><span class="glyphicon glyphicon-remove"></span> Clear History</a></li>';
        g += '<li class="divider"></li>';
        for (var f = historyOfRequests.length - 1; f >= 0; f--) {
            var e = getPairsFromURL(historyOfRequests[f]);
            var m = e.keys;
            var l = e.values;
            var b = e.operation;
            var d = getEndpointKey(e.marketplace);
            var h = e.numberOfItems;
            var k = e.itemKeys;
            var a = e.itemValues;
            g += '<li class="dropdown-header">' + b + " | " + d + '</li><li><a value="' + historyOfRequests[f] + '" href="#"><div><table class="table"><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody>';
            if (m && l) {
                for (var c = 0; c < m.length; c++) {
                    if (m[c]) {
                        g += "<tr><td>" + m[c] + "</td><td>" + l[c] + "</td></tr>"
                    }
                }
            }
            if (h > 0) {
                for (var c = 0; c < k.length; c++) {
                    g += "<tr><td>" + k[c] + "</td><td>" + a[c] + "</td></tr>"
                }
            }
            g += "</tbody></table></div></a></li>";
            if (f > 0) {
                g += '<li class="divider"></li>'
            }
        }
    }
    $("#HistoryList").html(g)
}

function setCookie(b, f, c) {
    var e = new Date();
    e.setTime(e.getTime() + (c * 24 * 60 * 60 * 1000));
    var a = "expires=" + e.toUTCString();
    document.cookie = b + "=" + f + "; " + a
}

function getCookie(d) {
    var b = d + "=";
    var a = document.cookie.split(";");
    for (var e = 0; e < a.length; e++) {
        var f = a[e];
        while (f.charAt(0) == " ") {
            f = f.substring(1)
        }
        if (f.indexOf(b) == 0) {
            return f.substring(b.length, f.length)
        }
    }
    return ""
}

function checkCookie(b) {
    var a = getCookie(b);
    if (a != "") {
        return true
    } else {
        return false
    }
}

function amazonCallback() {
    $("#RequestButton").click()
}

function generateUnsignedURLForAmazon(e, c, a) {
    var d = getPairsFromAmazonURL(e);
    var b = "http://" + getEndpoint(d.Marketplace);
    b += "?Service=AWSECommerceService";
    b += "&Operation=" + d.Operation;
    b += "&SubscriptionId=" + c;
    b += "&AssociateTag=" + a;
    if (d.Operation == "ItemLookup") {
        b += "&ItemId=" + d.ASIN
    } else {
        b += "&Keywords=" + d.Keywords;
        if (d.SearchIndex) {
            b += "&SearchIndex=" + d.SearchIndex
        }
        if (d.Sort) {
            b += "&Sort=" + d.Sort
        }
    }
    b += "&ResponseGroup=Large";
    renderFromURL(b);
    amazonCallback()
}

function generateUnsignedURL(b, f, a) {
    var g = {};
    for (var e in params) {
        if ($("#" + params[e]).val()) {
            g[params[e]] = $("#" + params[e]).val()
        }
    }
   // updateCodeSnippets();
    var c = "http://" + getEndpoint(b);
    c += "?Service=AWSECommerceService";
    c += "&Operation=" + getActiveOperation();
    c += "&SubscriptionId=" + f;
    c += "&AssociateTag=" + a;
    for (var d in g) {
        c += "&" + d.replace(/Item-(\d+)-/g, "Item.$1.") + "=" + g[d]
    }
    //"/api/doRequest?data="+Base64.encode(c)
    return c;
}

function getPairsFromAmazonURL(b) {
    b = decodeURIComponent(b);
    var a = new RegExp("^http:\\/\\/www.([^/]*)\\/(.*)\\/dp\\/([A-Za-z0-9]{10})");
    var c = a.exec(b);
    if (c) {
        return {
            Operation: "ItemLookup",
            ASIN: c[3],
            Marketplace: getEndpointKey("webservices." + c[1] + "/onca/xml")
        }
    } else {
        var a = new RegExp("^http:\\/\\/www.([^/]*)\\/gp\\/product\\/([A-Za-z0-9]{10})");
        var c = a.exec(b);
        if (c) {
            return {
                Operation: "ItemLookup",
                ASIN: c[2],
                Marketplace: getEndpointKey("webservices." + c[1] + "/onca/xml")
            }
        } else {
            var a = new RegExp("^http:\\/\\/www.([^/]*)\\/(.*)keywords=([^&]*)");
            var c = a.exec(b);
            var f = {
                Operation: "ItemSearch",
                Keywords: c[3],
                Marketplace: getEndpointKey("webservices." + c[1] + "/onca/xml")
            };
            a = new RegExp("^http:\\/\\/www.([^/]*)\\/(.*)search-alias=([^&]*)");
            c = a.exec(b);
            try {
                f.SearchIndex = amazonUrlConfig.SearchMap[f.Marketplace][c[3]]
            } catch (d) {}
            a = new RegExp("^http:\\/\\/www.([^/]*)\\/(.*)sort=([^&]*)");
            c = a.exec(b);
            try {
                f.Sort = amazonUrlConfig.SortMap[c[3]]
            } catch (d) {}
            return f
        }
    }
}

function getPairsFromURL(d) {
    var l = new RegExp("^http:\\/\\/(.*)\\?(.*)$");
    var g = l.exec(d);
    var q = g[1].toLowerCase();
    var h = g[2].split("&");
    var r = [];
    var p = [];
    var j = [];
    var m = 0;
    var c = {};
    var o = [];
    var a = [];
    var n = ["Service", "Operation", "SubscriptionId", "AWSAccessKeyId", "AssociateTag", "Timestamp", "Signature"];
    var b = "";
    var l = new RegExp("Item.(\\d+).(.*)");
    for (var f in h) {
        var e = h[f].split("=");
        if (n.indexOf(e[0]) == -1) {
            var g = l.exec(e[0]);
            if (g) {
                var k = g[1];
                j.push(k)
            } else {
                r.push(e[0]);
                p.push(e[1])
            }
        }
        if (e[0] == "Operation") {
            b = e[1]
        }
        if (e[0] == "AssociateTag") {
            $("#AssociateTag").val(e[1])
        }
        if (e[0] == "AWSAccessKeyId" || e[0] == "SubscriptionId") {
            $("#AccessKeyID").val(e[1])
        }
    }
    j.sort();
    for (var f in j) {
        if (!(j[f] in c)) {
            m += 1;
            c[j[f]] = m
        }
    }
    for (var f in h) {
        var e = h[f].split("=");
        var g = l.exec(e[0]);
        if (g) {
            var k = c[g[1]];
            o.push("Item-" + k + "-" + g[2]);
            a.push(e[1])
        }
    }
    return {
        marketplace: q,
        operation: b,
        keys: r,
        values: p,
        numberOfItems: m,
        itemKeys: o,
        itemValues: a
    }
}

function handlers() {
    $("#PAAPILogo").click(function(p) {
        $("#LandingPage").show();
        $(".left-panel-list").removeClass("active");
        $("#OperationSpecificPage").hide()
    });
    $("#OperationSpecificPage").hide();
    $("#HTMLSnippet").hide();
    $("#HTMLResponse").hide();
    $("#HistoryNav").click(function(p) {
        p.preventDefault();
        buildHistoryList();
        $("#HistoryList li a").unbind().click(function(r) {
            r.preventDefault();
            if ($(this).attr("value") == "ClearHistory") {
                historyOfRequests = [];
                setCookie("History", [], historyCookieValidity);
                buildHistoryList();
                return
            }
            hashchange = false;
            var q = $(this).attr("value");
            if (window.location.href.indexOf("#") != -1) {
                window.location.href = window.location.href.substring(0, window.location.href.indexOf("#")) + "#" + q
            } else {
                window.location.href = window.location.href + "#" + q
            }
            updateRequest(q);
            $("#LandingPage").hide();
            $("#OperationSpecificPage").show()
        })
    });

    function c() {
        invokeRequest(generateUnsignedURL(getActiveMarketplace(), $("#AccessKeyID").val(), $("#AssociateTag").val()), $("#AccessKeyID").val(), $("#SecretAccessKey").val(), $("#AssociateTag").val(), $("#SelectMarketplace :selected").text())
    }
    $("#RequestButton").click(function() {
        var p = generateUnsignedURL(getActiveMarketplace(), $("#AccessKeyID").val(), $("#AssociateTag").val());
        updateCookieHistory(p);
        c();
        var q = 100;
        $("html, body").animate({
            scrollTop: $("#ResponseTabs").offset().top - q
        }, 1000)
    });
    $("#UpdateRequest").click(function(p) {
        p.preventDefault();
        updateRequest($("#UnsignedURLTextArea").val())
    });
    $("#ClearParameters").click(function(p) {
        p.preventDefault();
        onSelectOperation()
    });
    $(".left-panel-list").click(function(s) {
        s.preventDefault();
        if ($(this).hasClass("disabled")) {
            alert("This Operation is not supported in this marketplace")
        } else {
            autoHideCommonParamsPanel();
            hashkey = getActiveOperation();
            if (!$("#" + getActiveOperation()).hasClass("disabled")) {
                saved[hashkey] = generateUnsignedURL(getActiveMarketplace(), $("#AccessKeyID").val(), $("#AssociateTag").val())
            }
            $(".left-panel-list").removeClass("active");
            $(this).addClass("active");
            $("#LandingPage").hide();
            $("#OperationSpecificPage").show();
            var q = $(this).text();
            var t = getOperationDescription($(this).attr("id"));
            var p = getOperationDocumentationLink($(this).attr("id"));
            $("#OperationName").text(q);
            var r = t + '<a href="' + p + '" target="_blank"> Learn more</a>';
            $("#OperationDescription").html(r);
            if (getActiveOperation() == "ItemLookup" || getActiveOperation() == "SimilarityLookup" || getActiveOperation() == "ItemSearch") {
               // $("#HTMLSnippet").show();
              //  $("#HTMLResponse").show()
            } else {
              //  $("#HTMLSnippet").hide();
                ///$("#HTMLResponse").hide()
            }
            hashkey = getActiveOperation();
            if (hashkey in saved) {
                renderFromURL(saved[hashkey])
            } else {
                onSelectOperation()
            }
        }
    });
    $("#SelectMarketplace").multiselect({
        buttonWidth: "100%",
        enableHTML: true,
        templates: {
            ul: '<ul class="multiselect-container dropdown-menu" style="width:auto;"></ul>'
        },
        optionLabel: function(p) {
            return '<img width="32px" src="' + $(p).attr("data-img") + '"> ' + $(p).text()
        },
        onChange: function(q, r, p) {
            onChangeMarketplace()
        }
    });
    $("#UnsignedURLTextArea").val("http://" + getEndpoint($("#SelectMarketplace").val()) + "?");
    onChangeMarketplace();
    $(".multiselect-selected-text").parent().css("text-align", "right");
    $(".multiselect-selected-text").css("float", "left");
    $("#NewTabSignedURL").click(function() {
        window.open($("#SignedURLTextArea").val(), "_blank")
    });
    $("#ExtractFromAmazonURL").click(function() {
        $("#AmazonURLModal").modal({
            keyboard: true
        });
        $("#AmazonRequest").click(function(p) {
            p.preventDefault();
            generateUnsignedURLForAmazon($("#AmazonURLTextArea").val(), $("#AccessKeyID").val(), $("#AssociateTag").val());
            $("#AmazonURLModal").modal("hide")
        })
    });
      /*
    $("#FullScreenJAVA").click(function() {
        $("#JAVAModal").modal({
            keyboard: true
        })
    });
    $("#FullScreenPHP").click(function() {
        $("#PHPModal").modal({
            keyboard: true
        })
    });
    $("#FullScreenROR").click(function() {
        $("#RORModal").modal({
            keyboard: true
        })
    });
    $("#FullScreenHTML").click(function() {
        $("#HTMLModal").modal({
            keyboard: true
        })
    });
    $("#FullScreenXML").click(function() {
        $("#XMLModal").modal({
            keyboard: true
        })
    });
  $("#FullScreenHTMLResponse").click(function() {
        $("#HTMLResponseModal").modal({
            keyboard: true
        })
    });
    */
    $("#SelIconCP").on("click", function() {
        $(this).find(".glyphicon").toggleClass("glyphicon-chevron-up glyphicon-chevron-down")
    });
    $("#SelIconRP").on("click", function() {
        $("#ClearParameters").toggle();
        $(this).find(".glyphicon").toggleClass("glyphicon-chevron-up glyphicon-chevron-down")
    });
    $("#SelIconRURL").on("click", function() {
        $(this).find(".glyphicon").toggleClass("glyphicon-chevron-up glyphicon-chevron-down")
    });
    $("#SlideSubmenu").on("click", function() {
        $(this).closest(".panel").toggle("slide", function() {
            $(".mini-submenu").fadeIn()
        })
    });
    $(".mini-submenu").on("click", function() {
        $(this).next(".panel").toggle("slide");
        $(".mini-submenu").hide()
    });
    $(".LeftPanelExpander").click(function(p) {
        p.preventDefault()
    });
    var o = $("#LandingPage").css("height");
    $("#LeftSidePanel").height(o);
    var a = Math.max.apply(Math, $(".left-panel-list").map(function() {
        return $(this).outerWidth()
    }).get());
    a += 40;
    $("#LeftSidePanelMinWidth").css("min-width", a);
    $("#CodeSnippetTab a").click(function(p) {
        p.preventDefault();
        $(this).tab("show")
    });
    $(".ResponseTab").click(function(p) {
        p.preventDefault();
        $(this).siblings().removeClass("active");
        $(this).addClass("active")
    });
    $(".ResponseTab a").click(function(p) {
        p.preventDefault();
        $(this).tab("show")
    });
    var b = new ZeroClipboard($("#CopySignedURL"));
    var n = new ZeroClipboard($("#CopyJAVA"));
    var m = new ZeroClipboard($("#CopyPHP"));
    var l = new ZeroClipboard($("#CopyROR"));
    var k = new ZeroClipboard($("#CopyJAVAModal"));
    var j = new ZeroClipboard($("#CopyPHPModal"));
    var h = new ZeroClipboard($("#CopyRORModal"));
    var f = new ZeroClipboard($("#CopyUnsignedURL"));
    var e = new ZeroClipboard($("#CopyHTMLModal"));
    var d = new ZeroClipboard($("#CopyHTML"));
    var i = new ZeroClipboard($("#CopyHTMLResponse"));
    var g = new ZeroClipboard($("#CopyHTMLResponseModal"));
    $("#global-zeroclipboard-html-bridge").on("focusin", false);
    $("#AddNewParamGlyph").click(function(p) {
        p.preventDefault()
    });
    $('[data-toggle="tooltip"]').tooltip();
    $("#ResponseType").click(function(p) {
        p.preventDefault();
        $(this).removeClass("a-button-selected").addClass("a-button-selected").button("refresh");
        $("#ResponseType1").removeClass("a-button-selected").button("refresh")
    });
    $("#ResponseType1").click(function(p) {
        p.preventDefault();
        $(this).removeClass("a-button-selected").addClass("a-button-selected").button("refresh");
        $("#ResponseType").removeClass("a-button-selected").button("refresh")
    });
    $("#CommonParamsPanel").on("hidden.bs.collapse", function() {
        updateCommonParamsHeader()
    });
    $("#CommonParamsPanel").on("show.bs.collapse", function() {
        $("#CommonParamsHeaderCollapse").text("")
    });
    $("#SaveResponse").click(function(q) {
        q.preventDefault();
        var s = $("#ResponseTabs .active").text();
        var r = "";
        if (s == "HTML Response") {
            r += $("#HTMLResponseCode").text();
            var p = new Blob([r], {
                type: "text/plain;charset=utf-8"
            });
            saveAs(p, "Response.html")
        } else {
            r += "/* **********Unsigned URL********** */\n";
            r += $("#UnsignedURLTextArea").val();
            r += "\n\n/* **********Signed URL********** */\n";
            r += $("#SignedURLTextArea").val();
            r += "\n\n/* **********Response********** */\n";
            r += $("#XMLHighlighted").text();
            var p = new Blob([r], {
                type: "text/plain;charset=utf-8"
            });
            saveAs(p, "Response.txt")
        }
    });
    $("#SaveCode").click(function(q) {
        q.preventDefault();
        var s = $("#CodeSnippetTab .active").text();
        var r = $("#" + s + "Code").text();
        var p = new Blob([r], {
            type: "text/plain;charset=utf-8"
        });
        if (s == "JAVA") {
            saveAs(p, "CodeSnippet.java")
        } else {
            if (s == "PHP") {
                saveAs(p, "CodeSnippet.php")
            } else {
                if (s == "ROR") {
                    saveAs(p, "CodeSnippet.rb")
                } else {
                    if (s == "HTML") {
                        saveAs(p, "AddToCart.html")
                    }
                }
            }
        }
    });
    $(window).on("hashchange", function() {
        if (hashchange) {
            hashchange = false;
            return
        }
        var p = new RegExp("^http:\\/\\/([^/]*)(.*)#http:\\/\\/([^/]*)(.*)$");
        var q = p.exec(window.location.href);
        if (q && q[1] != q[3] && !isCorsEnabled) {
            var r = "http://" + q[3] + q[2] + "#http://" + q[3] + q[4];
            window.location.href = r
        } else {
            if (window.location.href.indexOf("#") == -1 || window.location.href.indexOf("#") == window.location.href.length - 1) {
                $(".leftPanelList").removeClass("active");
                $("#OperationSpecificPage").hide();
                $("#LandingPage").show()
            }
            updateRequest(decodeURIComponent(window.location.href.substring(window.location.href.indexOf("#") + 1)));
            $("#LandingPage").hide();
            $("#OperationSpecificPage").show();
            hashchange = false
        }
    })
}
var config = "";
var amazonUrlConfig = "";
var allOperations = [];
var allParams = [];
var params = [];
var itemNumber = 0;
var itemDivGroup = [];
var saved = {};
var hashkey = "";
var historyOfRequests = [];
var hashchange = false;
var javaTemplate = "";
var phpTemplate = "";
var rorTemplate = "";
var htmlTemplate = "";
var addToCartTemplate = "";
var historyCookieValidity = 30;
var isCorsEnabled = false;
var firstLoad = true;

function parseJSON(a) {
    config = jQuery.parseJSON(a);
    init()
}

function init() {
    allOperations = getAllOperations();
    setMarketplaces();
    setAllOperations();
    setMarketplaceOperations(getActiveMarketplace());
    buildHistoryList();
    handlers();
    if (window.location.href.indexOf("#") != -1 && window.location.href.indexOf("#") != window.location.href.length - 1) {
        updateRequest(window.location.href.substring(window.location.href.indexOf("#") + 1));
        $("#LandingPage").hide();
        $("#OperationSpecificPage").show();
        hashchange = false
    }
}
$(function() {
    $.get("assets/config/config.json", function(c) {
        var a = c;
        try {
            parseJSON(a)
        } catch (b) {
            console.log(b)
        }
    }, "text");
    $.get("assets/config/amazon-url-config.json", function(c) {
        var a = c;
        try {
            amazonUrlConfig = jQuery.parseJSON(a)
        } catch (b) {
            console.log(b)
        }
    }, "text");
   /* $.get("assets/templates/java/Template.java", function(a) {
        javaTemplate = a
    }, "text");
    $.get("assets/templates/php/Template.php", function(a) {
        phpTemplate = a
    }, "text");
    $.get("assets/templates/ruby/Template.rb", function(a) {
        rorTemplate = a
    }, "text");
    */
    $.get("assets/templates/html/AddToCartStyleTemplate.html", function(a) {
        addToCartTemplate = a
    }, "text");
    $.get("assets/templates/html/HTMLResponseStyleTemplate.html", function(a) {
        htmlTemplate = a
    }, "text")
});

function decodeSpecialCharacters(a) {
    return a.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&")
}

function reinitProductEvents(){


    var totalPages=10;
    var itempage='';
    for(var i=1;i<=totalPages;i++){
        itempage+='<option value="'+i+'">'+i+'</option>';
    }

    jQuery("#totalPages").html(itempage);




    var chk='';
    
    /*chk="<h6><span>Output Location(s): </span>";

    jQuery.getJSON('./assets/config/output_endpoints.json',function(endpoints){

        if(endpoints.length>0){

            chk+="<ul  class='endpointClass'>"
            endpoints.forEach(function(point){

                chk+="<li><input type='checkbox' name='endpoints_out' value='"+point.Index+"'/><span>"+point.Title+"</span></li>";

            });

            chk+="</ul>";


            jQuery("#OutputEndpoints").html(chk);
        }else{

            chk="Not Configured output endpoint";
            jQuery("#SendDataExternal").hide();
        }


        console.log("endpoints",endpoints);

    })

    */
    jQuery("#SendDataExternal").unbind("click");


    jQuery("#SendDataExternal").click(function(){

    	jQuery("#SendDataExternal").find("#postLoading").css("display","block");

        jQuery("#FormattedResponse").html("Sending products to ES...");
//jQuery("#OutputEndpoints input:checked").length>0 &&
       if( jQuery(".selectedProduct").length>0){

        

                        var products=[];


                        jQuery(".selectedProduct").each(function(){

                            products.push(jQuery(this).find(".product_data").html());

                        });


        console.log("Products:", products);


        jQuery.post('/api/doPost2External',{"products":JSON.stringify(products)},function(res){

             jQuery("#FormattedResponse").html("It is done!.");

             jQuery("#SendDataExternal").find("#postLoading").css("display","none");

            console.log(res);

        })



        }else{
        	
             jQuery("#SendDataExternal").find("#postLoading").css("display","none");

             jQuery("#FormattedResponse").html("");
           alert("Please select products");

       
        }

        return false;

    });

/*
    jQuery(".selectedProduct").each(function(){

    })
*/
}

function invokeRequest(h, g, f, a, i) {
    $("#SubmitButton").click();
    var e = "";
    $("#RenderedResponseDiv").html('<div class="alert alert-info" role="alert"><span id="InfoMessage">Loading...</span></div>');
    hashchange = true;
    h = h.replace(/\n/g, "");
    document.getElementById("UnsignedURLTextArea").value = h;
   /* if (isCorsEnabled) {
        if (window.location.href.indexOf("#") != -1) {
            window.location.href = window.location.href.substring(0, window.location.href.indexOf("#")) + "#" + h
        } else {
            window.location.href = window.location.href + "#" + h
        }
    } else {
        window.location.href = "http://" + getEndpoint(getActiveMarketplace()).substring(0, getEndpoint(getActiveMarketplace()).indexOf("http://webservices.amazon.es/")) + "/scratchpad/index.html#" + h
    }

    */
    var n = h;
    var p = new RegExp("^http:\\/\\/(.*)\\/onca\\/xml\\?(.*)$");
    var b = p.exec(n);
    var j = b[1].toLowerCase();
    var d = b[2];
    var r = d.split("&");
    r = cleanupRequest(r, g);
    r = encodeNameValuePairs(r);
    r.sort();
    var q = r.join("&");
    var l = "GET\n" + j + "\n/onca/xml\n" + q;
    var c = f;
    //var k = sign(c, l);
    var o = "http://" + j + "/onca/xml?" + q ;//+ "&Signature=" + k;
    document.getElementById("SignedURLTextArea").value = o;
    var totalPages=jQuery("#totalPages").val();

      jQuery("#RenderedResponse a").html("<strong>Fetching "+totalPages+" pages...</strong>");

    var m = $.getJSON("/api/doRequest?j="+Base64.encode(j)+"&q="+Base64.encode(q)+"&pages="+totalPages+"&data="+Base64.encode(o), function(J) {




        var E = "";
        var t = [];

        var u, L, K, F, s, C;
       
        var v = "";


        var totalProducts=0;
        //var w = extractXml(J);

        if(J.products.length){

             J.products.forEach(function(page){

            page.forEach(function(item){

                totalProducts+=1;
                try {
                C = item.ASIN[0];
                t.push(C)
                } catch (H) {
                    C = ""
                }

            try {
                L = item.MediumImage[0].URL[0];
            } catch (H) {


                try{
                     

                     L = item.ImageSets[0].ImageSet[0].MediumImage[0].URL[0];



                }catch(e){
                     L =  "/assets/images/no-image.png"
                }
               




            }

             try {
                u = item.DetailPageURL[0];
            } catch (H) {
                u = "#"
            }


            try {
                s = "#";
                var I =item.ItemLinks[0].ItemLink;

                I.forEach(function(k1){
                	if (k1.Description[0]== "All Offers") {
                        s = k1.URL[0];
                    }
                })

            } catch (H) {
                if (s == "#") {
                    try {
                        s = item.MoreOffersUrl[0];
                    } catch (H) {}
                }
            }



            try {
                K = item.ItemAttributes[0].Title[0]
            } catch (H) {
                try {
                    K = item.ASIN[0];
                } catch (H) {
                    K = "N/A"
                }
            }
            try {


                F = item.Offers[0].SalePrice[0].FormattedPrice[0];


            } catch (H) {
                try {
                    F = item.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0];
                } catch (H) {
                    F = "N/A"
                }
            }


            var B = "";
            B += '<div class="product-box">';
            B += '<a target="_blank" href="' + u + '"><img src="' + L + '" width="120" height="160"></a>';
            B += '<div class="product-title"><h3>' + K + "</h3></div>";
            B += '<p class="product-price">' + F + "<br>";
            if (s != "#") {
                B += '<a target="_blank" href="' + s + '"> More offers </a>'
            } else {
                B += '<span style="color:#fff;">|</span>'
            }
            B += "</p>";
            B += "<div>";
            B += '<span class="a-button a-button-primary">';
            B += '<a target="_blank" href="javascript:return false;" class="product_alink" onclick="selectProduct(this)" style="text-decoration:none">';
            B += '<span class="a-button-inner">';
            B+="<div style='display:none' class='product_data'>"+Base64.encode(JSON.stringify(item))+"</div>";
            B += '<img src="assets/images/normal.png" class="a-icon a-icon-shop-now">';
            B += '<input class="a-button-input" type="submit" value="Add to cart">';
            B += '<span class="a-button-text">Select</span>';
            B += "</span>";
            B += "</a>";
            B += "</span>";
            B += "</div>";
            B += "</div>";
            E += B;
            v += generateHtmlCode(C, u, L, K, F, s)



            });

        });


             jQuery("#RenderedResponse a").html("<strong>Total Products: "+totalProducts+"</strong>");


        }else{
             E = '<div class="alert a-alert-error" role="alert"><strong class="a-alert-header">Empty products <br></strong><span style="word-wrap: break-word">Emty products </span></div>';
               
        }

        /* End of the line -- phpremedy */


      
        
       //----------for
       
        $("#RenderedResponseDiv").html(E);
        if (getActiveOperation() == "ItemLookup" || getActiveOperation() == "ItemSearch" || getActiveOperation() == "SimilarityLookup") {
          //  $("#HTMLSnippet").show();
           // e = generateAddToCartHtmlCode(addToCartTemplate, t, g, a, i);
           // $("#HTMLCode").text(e);
           // $("#HTMLCodeModal").text($("#HTMLCode").text());
            //hljs.initHighlighting.called = false;
           /* $(".HTMLHJS").each(function(x, y) {
                hljs.highlightBlock(y)
            });

            hljs.initHighlighting.called = false;
            $("#HTMLResponse").show();
            $("#HTMLResponseCode").text(v + htmlTemplate);
            $("#HTMLResponseCodeModal").text($("#HTMLResponseCode").text());
            hljs.initHighlighting.called = false;
            $(".HTMLResponseHJS").each(function(x, y) {
                hljs.highlightBlock(y)
            });
            hljs.initHighlighting.called = false

            */
            $("#HTMLSnippet").hide();
            $("#HTMLResponse").hide();
            
        } else {
            $("#HTMLSnippet").hide();
            $("#HTMLResponse").hide()
        }



    }, "text");

    m.always(function(t) {
        var u;
        var A;
        var v;
        var C;

  try {
        if(typeof t[0].error.Error!=='undefined'){


          

            if(t.errors.length){

            errors.forEach(function(err){

            
            obj =err.Error;
            if (obj.length > 0) {
                var z = "";
                obj.forEach(function(err){

                z += '<div class="alert a-alert-error" role="alert"><strong class="a-alert-header">Error! ' + err.Code[0] + "<br>" + err.Message[0] + '<br></strong><span style="word-wrap: break-word">' +err.Message[0]+ "</span></div>"
               
                })
                $("#RenderedResponseDiv").html(z)
            }
        });

 }

        } 
        

        } catch (w) {}







        reinitProductEvents();


        
    })
}

function renderXml(a) {
    hljs.initHighlighting.called = false;
    $("#XMLHighlighted").text(vkbeautify.xml(decodeSpecialCharacters(a)));
    $("#XMLCodeModal").text($("#XMLHighlighted").text());
    $("#XMLCodeModal").each(function(b, c) {
        hljs.highlightBlock(c)
    });
    $("#XMLHighlighted").each(function(b, c) {
        hljs.highlightBlock(c)
    });
    hljs.initHighlighting.called = false
}

function extractXml(a) {
    if (window.DOMParser) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(a, "text/xml")
    } else {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(xmlDoc)
    }
    return xmlDoc
}

function encodeNameValuePairs(e) {
    for (var c = 0; c < e.length; c++) {
        var b = "";
        var d = "";
        var f = e[c];
        var a = f.indexOf("=");
        if (a == -1) {
            b = f
        } else {
            if (a == 0) {
                d = f
            } else {
                b = f.substring(0, a);
                if (a < f.length - 1) {
                    d = f.substring(a + 1)
                }
            }
        }
        b = encodeURIComponent(decodeURIComponent(b));
        d = d.replace(/\+/g, "%20");
        d = encodeURIComponent(decodeURIComponent(d));
        e[c] = b + "=" + d
    }
    return e
}

function cleanupRequest(e, c) {
    var d = false;
    var h = false;
    var g = c;
    var b = e.length;
    var a = 0;
    while (a < b) {
        var f = e[a];
        if (f.search(/^Timestamp=/) != -1) {
            d = true
        } else {
            if (f.search(/^(AWSAccessKeyId|SubscriptionId)=/) != -1) {
                e.splice(a, 1, "AWSAccessKeyId=" + g);
                h = true
            } else {
                if (f.search(/^Signature=/) != -1) {
                    e.splice(a, 1);
                    a--;
                    b--
                }
            }
        }
        a++
    }
    if (!d) {
        e.push("Timestamp=" + getNowTimeStamp())
    }
    if (!h) {
        e.push("AWSAccessKeyId=" + g)
    }
    return e
}

function sign(c, n) {
    var e = str2binb(n);
    var a = str2binb(c);
    if (a.length > 16) {
        a = core_sha256(a, c.length * chrsz)
    }
    var m = Array(16),
        f = Array(16);
    for (var h = 0; h < 16; h++) {
        m[h] = a[h] ^ 909522486;
        f[h] = a[h] ^ 1549556828
    }
    var l = m.concat(e);
    var d = core_sha256(l, 512 + n.length * chrsz);
    var b = f.concat(d);
    var k = core_sha256(b, 512 + 256);
    var j = binb2b64(k);
    var g = encodeURIComponent(j);
    return g
}
Date.prototype.toISODate = new Function("with (this)\n    return getFullYear()+'-'+addZero(getMonth()+1)+'-'+addZero(getDate())+'T'+addZero(getHours())+':'+addZero(getMinutes())+':'+addZero(getSeconds())+'.000Z'");

function addZero(a) {
    return (a < 0 || a > 9 ? "" : "0") + a
}

function getNowTimeStamp() {
    var b = new Date();
    var a = new Date(b.getTime() + (b.getTimezoneOffset() * 60000));
    return a.toISODate()
}

function autoHideCommonParamsPanel() {
    if ($("#SelectMarketplace").val() && $("#AssociateTag").val() && $("#AccessKeyID").val() && $("#SecretAccessKey").val()) {
        $("#CommonParamsPanel").collapse("hide");
        $("#SelIconCP").find(".glyphicon").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down")
    }
}

function setMarketplaces() {
    var c = getEndpointKey(window.location.host + "/onca/xml");
    if (c == null) {
        c = "US"
    }
    var d = bringToFront(getMarketplaces(), c);
    var e = "";
    for (var b = 0; b < d.length; b++) {
        var a = getEndpoint(d[b]);
       // a = a.substr(0, a.indexOf("webservices.amazon"));
        e += '<option data-img="assets/images/' + d[b].toLowerCase() + '-flag-small.jpg" value=' + d[b] + ">" + a + "</option>"
    }
    $("#SelectMarketplace").html(e);
    $("#UnsignedURLTextArea").val("http://" + getEndpoint($("#SelectMarketplace").val()) + "?")
}

function bringToFront(c, b) {
    var a = c.indexOf(b);
    if (a > -1) {
        c.splice(a, 1)
    }
    c.unshift(b);
    return c
}

function setAllOperations() {
    var e = [];
    for (var d = 0; d < allOperations.length; d++) {
        var a = allOperations[d];
        var f = getOperationType(a);
        if (e.indexOf(f) == -1) {
            e.push(f);
            var b = '<div class="content"><p class="type-of-operation"><a class="LeftPanelExpander" href="#" data-toggle="collapse" data-target="#' + f + 'list"><span id="SelectorIcon' + f + '" class="glyphicon glyphicon-minus"></span></a> ' + f + '</p></div><ul id="' + f + 'list" class="nav-a collapse in">';
            $("#LeftSidePanel").append(b);
            $("#SelectorIcon" + f).unbind().on("click", function() {
                $(this).toggleClass("glyphicon-plus glyphicon-minus")
            })
        }
        var c = '<li class="left-panel-list disabled" id="' + a + '"><a href="#">' + getOperationName(a) + "</a></li>";
        $("#" + f + "list").append(c)
    }
}

function setMarketplaceOperations(a) {
    var c = getOperations(a);
    $(".left-panel-list").addClass("disabled");
    for (var b = 0; b < c.length; b++) {
        $("#" + c[b]).removeClass("disabled")
    }
}

function getActiveOperation() {
    return $(".left-panel-list.active").attr("id")
}

function getActiveMarketplace() {
    return $("#SelectMarketplace").val()
}

function updateCommonParamsHeader() {
    var c = $("#SelectMarketplace").val();
    var b = $("#AssociateTag").val();
    var d = $("#AccessKeyID").val();
    var a = " | Marketplace : <span style='font-weight:lighter;'>" + c + "</span>";
    if (b != "") {
        a += " | AssociateTag : <span style='font-weight:lighter;'>" + b + "</span>"
    }
    if (d != "") {
        a += " | AccessKeyID : <span style='font-weight:lighter;' class='truncate'>" + d + "</span>"
    }
    $("#CommonParamsHeaderCollapse").html(a)
}

function updateOperationInfo() {
    if ($("#" + getActiveOperation()).hasClass("disabled")) {
        alert("This Operation is Not Supported in this marketplace")
    } else {
        autoHideCommonParamsPanel();
        var b = $("#" + getActiveOperation()).text();
        var d = getOperationDescription(getActiveOperation());
        var a = getOperationDocumentationLink(getActiveOperation());
        $("#OperationName").text(b);
        var c = d + '<a href="' + a + '" target="_blank"> Learn more</a>';
        $("#OperationDescription").html(c)
    }
}

function updateRequest(a) {
    a = decodeURIComponent(a);
    a = a.replace(/\n/g, "");
    renderFromURL(a);
    updateCookieHistory(a);
   // updateCodeSnippets();
    updateCommonParamsHeader();
    updateOperationInfo();
    invokeRequest(a, $("#AccessKeyID").val(), $("#SecretAccessKey").val(), $("#AssociateTag").val(), $("#SelectMarketplace :selected").text());
    var b = 100;
    $("html, body").animate({
        scrollTop: $("#ResponseTabs").offset().top - b
    }, 1000)
}

function checkValidityOfOperation() {
    if ($("#" + getActiveOperation()).hasClass("disabled")) {
        alert("Operation Not Supported In " + getActiveMarketplace());
        $("#main").find("*").attr("disabled", true)
    } else {
        $("#main").find("*").removeAttr("disabled")
    }
}

function onChangeMarketplace() {
    var a;
    if (firstLoad) {
        a = generateUnsignedURL(getActiveMarketplace(), $("#AccessKeyID").val(), $("#AssociateTag").val());
        firstLoad = false
    } else {
        updateRequest(generateUnsignedURL(getActiveMarketplace(), $("#AccessKeyID").val(), $("#AssociateTag").val()));
        a = $("#UnsignedURLTextArea").val()
    }
    a = changeMarketplaceinURL(a, getActiveMarketplace());
    $("#UnsignedURLTextArea").val(a);
    setMarketplaceOperations(getActiveMarketplace());
    checkValidityOfOperation();
    $("#BrowseNodeDescLink").attr("href", "http://docs.aws.amazon.com/AWSECommerceService/latest/DG/Locale" + getActiveMarketplace() + ".html")
}

function updateCodeSnippets() {
    var e = {};
    var a = "";
    var d = "";
    var c = "";
    e.Service = "AWSECommerceService";
    e.Operation = getActiveOperation();
    e.AWSAccessKeyId = $("#AccessKeyID").val();
    e.AssociateTag = $("#AssociateTag").val();
    for (var b in params) {
        if ($("#" + params[b]).val()) {
            e[params[b]] = $("#" + params[b]).val()
        }
    }
    a = generateJavaCode(javaTemplate, e, $("#AccessKeyID").val(), $("#SecretAccessKey").val(), $("#SelectMarketplace :selected").text());
    $("#JAVACode").text(a);
    $("#JAVACodeModal").text($("#JAVACode").text());
    hljs.initHighlighting.called = false;
    $(".JAVAHJS").each(function(f, g) {
        hljs.highlightBlock(g)
    });
    hljs.initHighlighting.called = false;
    d = generatePhpCode(phpTemplate, e, $("#AccessKeyID").val(), $("#SecretAccessKey").val(), $("#SelectMarketplace :selected").text());
    $("#PHPCode").text(d);
    $("#PHPCodeModal").text($("#PHPCode").text());
    hljs.initHighlighting.called = false;
    $(".PHPHJS").each(function(f, g) {
        hljs.highlightBlock(g)
    });
    hljs.initHighlighting.called = false;
    c = generateRubyCode(rorTemplate, e, $("#AccessKeyID").val(), $("#SecretAccessKey").val(), $("#SelectMarketplace :selected").text());
    $("#RORCode").text(c);
    $("#RORCodeModal").text($("#RORCode").text());
    hljs.initHighlighting.called = false;
    $(".RORHJS").each(function(f, g) {
        hljs.highlightBlock(g)
    });
    hljs.initHighlighting.called = false
}

function onSelectOperation() {
    for (var a = 0; a < params.length; a++) {
        $("#" + params[a]).parents(".form-group").remove()
    }
    params.splice(0, params.length);
    itemNumber = 0;
    allParams = getOperationParameters(getActiveMarketplace(), getActiveOperation());
    var b = "";
    for (var a = 0; a < allParams.length; a++) {
        if(allParams[a]=="ItemPage")
            continue;

        b += '<option value="' + allParams[a] + '">' + allParams[a] + "</option>"
    }
    $("#AddNew").html(b);
    addNewDropDownInit();
    refreshAddNewParamsList();
    addInitialParams(1);
    $("#BrowseNodeDescLink").attr("href", "http://docs.aws.amazon.com/AWSECommerceService/latest/DG/Locale" + getActiveMarketplace() + ".html")
}

function changeMarketplaceinURL(c, b) {
    c = c.replace(/\n/g, "");
    var a = new RegExp("^http:\\/\\/(.*)\\?(.*)$");
    var f = a.exec(c);
    var e = f[2];
    var d = getEndpoint(b);
    return "http://" + d + "?" + e
}

function overwriteParams(f, c, b, a) {
    switch (c) {
        case "Textbox":
            $("#" + f).attr("value", a);
            break;
        case "Checkbox":
            var d = a.split(",");
            $("#" + f).multiselect("deselect", b);
            $("#" + f).multiselect("select", d);
            refreshParamsList("#" + f);
            break;
        case "Dropdown":
            $("#" + f).multiselect("deselect", b);
            $("#" + f).multiselect("select", a);
            refreshParamsList("#" + f);
            break;
        case "Locale":
            var e = getSearchIndices(getActiveMarketplace());
            $("#" + f).multiselect("deselect", e);
            $("#" + f).multiselect("select", a);
            refreshParamsList("#" + f);
            break;
        default:
            $("#" + f).attr("value", a);
            break
    }
}

function renderFromURL(k) {
    var l = getPairsFromURL(k);
    var m = l.keys;
    var b = l.values;
    var h = l.operation;
    var s = getEndpointKey(l.marketplace);
    var r = l.numberOfItems;
    var f = l.itemKeys;
    var d = l.itemValues;
    if (s) {
        $("#SelectMarketplace").multiselect("deselect", getActiveMarketplace());
        $("#SelectMarketplace").multiselect("select", s);
        updateCommonParamsHeader();
        var p = $("#UnsignedURLTextArea").val();
        p = changeMarketplaceinURL(p, getActiveMarketplace());
        $("#UnsignedURLTextArea").val(p);
        setMarketplaceOperations(s)
    }
    autoHideCommonParamsPanel();
    $(".left-panel-list").removeClass("active");
    if (!h) {
        h = "ItemSearch"
    }
    if (allOperations.indexOf(h) != -1) {
        $("#" + h).addClass("active");
        checkValidityOfOperation()
    }
    itemNumber = 0;
    for (var q = 0; q < params.length; q++) {
        $("#" + params[q]).parents(".form-group").remove()
    }
    params.splice(0, params.length);
    if (s && allOperations.indexOf(h) != -1) {
        allParams = getOperationParameters(s, h);
        var a = "";
        for (var q = 0; q < allParams.length; q++) {
            a += '<option value="' + allParams[q] + '">' + allParams[q] + "</option>"
        }
        $("#AddNew").html(a);
        addNewDropDownInit();
        refreshAddNewParamsList();
        addInitialParams(0)
    }
    if (m && b) {
        $("#TemplateDiv").show();
        for (var q = 0; q < m.length; q++) {
            if (allParams.indexOf(m[q]) != -1 && getParameterDisplayType(getActiveMarketplace(), getActiveOperation(), m[q]) == "Container") {
                addItemParameterDiv(m[q])
            } else {
                if (m[q] && params.indexOf(m[q]) == -1) {
                    addParameterDiv(m[q]);
                    params.push(m[q])
                }
            }
        }
        $("#TemplateDiv").hide();
        var n;
        var j;
        for (var q = 0; q < m.length; q++) {
            if (allParams.indexOf(m[q]) == -1) {
                n = "custom"
            } else {
                n = getParameterDisplayType(getActiveMarketplace(), getActiveOperation(), m[q]);
                j = getParameterValidValues(getActiveMarketplace(), getActiveOperation(), m[q])
            }
            overwriteParams(m[q], n, j, b[q])
        }
    }
    if (r) {
        $("#TemplateDiv").show();
        if (getOperationParameters(getActiveMarketplace(), getActiveOperation()).indexOf("Item") != -1 && isParameterMandatory(getActiveMarketplace(), getActiveOperation(), "Item") == "REQUIRED") {
            r -= 1
        }
        for (var q = 0; q < r; q++) {
            addItemParameterDiv("Item")
        }
        $("#TemplateDiv").hide();
        for (var q = 0; q < f.length; q++) {
            var g = f[q].split("-");
            var e = g[g.length - 1];
            var c = getItemParameterDisplayType(getActiveMarketplace(), getActiveOperation(), e);
            var o = getItemParameterValidValues(getActiveMarketplace(), getActiveOperation(), e);
            overwriteParams(f[q], c, o, d[q])
        }
    }
    $("#BrowseNodeDescLink").attr("href", "http://docs.aws.amazon.com/AWSECommerceService/latest/DG/Locale" + getActiveMarketplace() + ".html")
}

function refreshParamsList(a) {
    $(a).multiselect("rebuild");
    $(a).multiselect("refresh")
}

function refreshAddNewParamsList() {
    refreshParamsList("#AddNew");
    $("#AddNewFormInput").val($("#AddNew").val())
}

function addNewDropDownInit() {
    $("#AddNew").multiselect({
        enableCaseInsensitiveFiltering: true,
        buttonContainer: '<div class="input-group" />',
        templates: {
            button: '<input id="AddNewFormInput" val="" type="text" class="multiselect dropdown-toggle form-control" data-toggle="dropdown"><div class="input-group-btn removeBtn"><button type="button" id="AddNewButton" class="btn btn-dark-a"><span class="glyphicon glyphicon-plus"></span></button></div>',
            ul: '<ul class="multiselect-container dropdown-menu" style="width:100%;"></ul>'
        },
        maxHeight: 300,
        onDropdownShown: function(a) {
            this.$filter.find(".multiselect-search").focus()
        },
        onChange: function(b, c, a) {
            $("#AddNewFormInput").val($(b).val())
        }
    });
    $("#AddNewFormInput").removeClass("btn").removeClass("btn-default");
    $(".removeBtn").removeClass("btn").removeClass("btn-default");
    if ($("#AddNewFormInput").val() === "") {
        $("#AddNewFormInput").val($("#AddNew").val())
    }
    $("#AddNewFormInput").change(function() {
        if ($("#AddNewFormInput").val() === "") {
            $("#AddNewFormInput").val($("#AddNew").val())
        }
    });
    $("#AddNewButton").unbind().click(function() {
        addNewParameterButton()
    })
}

function dropdownInit(h, e, f, a) {
    var d = "";
    var g = "";
    if (e == "container") {
        g = getItemParameterValueDescriptions(getActiveMarketplace(), getActiveOperation(), h)
    } else {
        g = getParameterValueDescriptions(getActiveMarketplace(), getActiveOperation(), h)
    }
    for (var c = 0; c < f.length; c++) {
        d += '<option value="' + f[c] + '" data-toggle="tooltip" title="' + g[c] + '">' + f[c] + "</option>"
    }
    var b;
    if (e == "container") {
        b = "#Item-" + itemNumber + "-" + h
    } else {
        b = "#" + h
    }
    $(b).html(d);
    $(b).multiselect({
        buttonWidth: "100%",
        enableCaseInsensitiveFiltering: true,
        dropRight: true,
        maxHeight: 300,
        onDropdownShown: function(i) {
            this.$filter.find(".multiselect-search").focus()
        },
        templates: {
            ul: '<ul class="multiselect-container dropdown-menu" style="width:100%;"></ul>'
        }
    });
    $(".multiselect-selected-text").parent().css("text-align", "right");
    $(".multiselect-selected-text").css("float", "left");
    if (a) {
        $(b).multiselect("deselect", f);
        $(b).multiselect("select", a);
        refreshParamsList(b)
    }
}

function renderParameterInputFields(f, h, b, a, e, d) {
    var c;
    switch (f) {
        case "Textbox":
            c = '<input type="text" class="form-control-a" id="' + h + '">';
            b.find(".v").empty().append(c);
            if (d == "container") {
                $("#" + h).attr("placeholder", h.split("-")[2])
            } else {
                if (a) {
                    $("#" + h).attr("placeholder", a)
                }
            }
            break;
        case "Dropdown":
            c = '<select id="' + h + '"></select>';
            b.find(".v").empty().append(c);
            dropdownInit(h, d, e, a);
            break;
        case "Checkbox":
            c = '<select id="' + h + '" multiple="multiple"></select>';
            b.find(".v").empty().append(c);
            dropdownInit(h, d, e, a);
            break;
        case "Locale":
            c = '<select id="' + h + '"></select>';
            b.find(".v").empty().append(c);
            var g = getSearchIndices(getActiveMarketplace());
            dropdownInit(h, d, g, g[0]);
            break;
        default:
            c = '<input type="text" class="form-control-a" id="' + h + '" placeholder="">';
            b.find(".v").empty().append(c);
            break
    }
}

function addItemParameterDiv(e) {
    itemNumber++;
    var c = $("#AddNewForm");
    var k = $("#AddNewButton").parents("#AddNewForm").prev();
    var a = [];
    var d = getItemValidValues(getActiveMarketplace(), getActiveOperation());
    a.length = d.length;
    for (var b = 0; b < d.length; b++) {
        a[b] = $(k.clone()).insertBefore(c);
        var j = getItemParameterDescription(getActiveMarketplace(), getActiveOperation(), d[b]);
        a[b].find(".d").find("p").html(j);
        if (b == 0) {
            a[b].find(".n").find("label").html('<a href="#" class="RemoveItemParam"><span class="glyphicon glyphicon-remove"></span></a> ' + e + '<span style="color:red;">*</span>');
            a[b].find("label").attr({
                "for": "Item-" + itemNumber + "-" + d[b]
            })
        } else {
            a[b].find(".n").find("label").html('<a href="#" class="RemoveItemParam" style="visibility:hidden;"><span class="glyphicon glyphicon-remove"></span></a>');
            a[b].find("label").attr({
                "for": "Item-" + itemNumber + "-" + d[b]
            })
        }
        var f = getItemParameterDefaultValue(getActiveMarketplace(), getActiveOperation(), d[b]);
        var h = getItemParameterDisplayType(getActiveMarketplace(), getActiveOperation(), d[b]);
        var g = getItemParameterValidValues(getActiveMarketplace(), getActiveOperation(), d[b]);
        renderParameterInputFields(h, "Item-" + itemNumber + "-" + d[b], a[b], f, g, "container");
        params.push("Item-" + itemNumber + "-" + d[b])
    }
    itemDivGroup.push(a);
    $(".RemoveItemParam").unbind().click(function(q) {
        q.preventDefault();
        var s = $(this).parent().attr("for");
        var l = new RegExp("Item-(\\d+)-");
        var p = l.exec(s);
        var r = p[1];
        var o = itemDivGroup[r - 1];
        for (var m = 0; m < o.length; m++) {
            var n = $(o[m]).find("label").attr("for");
            $(o[m]).remove();
            params.splice(params.indexOf(n), 1)
        }
    })
}

function addParameterDiv(f) {
    var d = $("#AddNewForm");
    var i = $("#AddNewButton").parents("#AddNewForm").prev();
    var b = $(i.clone()).insertBefore(d);
    var c;
    var h = "";
    var g;
    var e;
    var a;
    if (allParams.indexOf(f) == -1) {
        c = ""
    } else {
        c = getParameterDescription(getActiveMarketplace(), getActiveOperation(), f);
        h = getParameterDisplayType(getActiveMarketplace(), getActiveOperation(), f);
        g = getParameterDefaultValue(getActiveMarketplace(), getActiveOperation(), f);
        e = getParameterValidValues(getActiveMarketplace(), getActiveOperation(), f);
        a = isParameterMandatory(getActiveMarketplace(), getActiveOperation(), f)
    }
    b.find(".d").find("p").html(c);
    if (a == "REQUIRED") {
        b.find(".n").find("label").html('<a href="#" class="RemoveParam" style="visibility:hidden;"><span class="glyphicon glyphicon-remove"></span></a> ' + f + '<span style="color:red;">*</span>')
    } else {
        b.find(".n").find("label").html('<a href="#" class="RemoveParam"><span class="glyphicon glyphicon-remove"></span></a> ' + f)
    }
    b.find("label").attr({
        "for": f
    });
    renderParameterInputFields(h, f, b, g, e, "normal");
    $('option[value="' + f + '"]', $("#AddNew")).remove();
    refreshAddNewParamsList();
    $(".RemoveParam").unbind().click(function(k) {
        k.preventDefault();
        var j = $(this).parent().attr("for");
        if (allParams.indexOf(j) != -1) {
            $("#AddNew").append('<option value="' + j + '">' + j + "</option>");
            refreshAddNewParamsList()
        }
        $(this).parents(".form-group").remove();
        params.splice(params.indexOf(j), 1)
    })
}

function addNewParameterButton() {
    var a;
    if ($("#AddNewFormInput").val() === "") {
        a = $("#AddNew").val()
    } else {
        a = $("#AddNewFormInput").val()
    }
    if (a) {
        $("#TemplateDiv").show();
        if (allParams.indexOf(a) != -1 && getParameterDisplayType(getActiveMarketplace(), getActiveOperation(), a) == "Container") {
            addItemParameterDiv(a)
        } else {
            addParameterDiv(a);
            params.push(a)
        }
        $("#TemplateDiv").hide()
    }
}

function addInitialParams(a) {
    $("#TemplateDiv").show();
    for (var b = 0; b < allParams.length; b++) {
        if (isParameterMandatory(getActiveMarketplace(), getActiveOperation(), allParams[b]) == "REQUIRED") {
            var c = getParameterDisplayType(getActiveMarketplace(), getActiveOperation(), allParams[b]);
            if (c == "Container") {
                addItemParameterDiv(allParams[b])
            } else {
                addParameterDiv(allParams[b]);
                params.push(allParams[b])
            }
        }
    }
    if (a == 1) {
        for (var b = 0; b < allParams.length; b++) {
            if (isParameterMandatory(getActiveMarketplace(), getActiveOperation(), allParams[b]) == "POPULAR") {
                var c = getParameterDisplayType(getActiveMarketplace(), getActiveOperation(), allParams[b]);
                if (c == "Container") {
                    addItemParameterDiv(allParams[b])
                } else {
                    addParameterDiv(allParams[b]);
                    params.push(allParams[b])
                }
            }
        }
    }
    $("#TemplateDiv").hide()
};

jQuery(document).ready(function(){
     reinitProductEvents();
})
