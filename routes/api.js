var express = require('express');
var router = express.Router();
var path = require('path');
const querystring = require('querystring');
var jsonxml = require('jsontoxml');
var amazon = require('amazon-product-api');
var config = require("../config/config.json");
var client = amazon.createClient(config.amazon_product_api);
var elasticsearch = require('elasticsearch');
var es_client = new elasticsearch.Client(config.es_endpoints[0]);
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

function decodeB64(b64string) {
    var buf = Buffer.from(b64string, 'base64').toString('ascii'); // Ta-da
    return buf;
}
router.post('/doPost2External', function(req, res, next) {
    // console.log(req);
    var results = {
        status: "",
        error: []
    };
    try {
        var products_encoded = req.body.products;
        var decoded_products = JSON.parse(products_encoded);
        if (decoded_products.length) {
            // decoded_products.forEach(function(encoded_product) {
            function post() {
                if (decoded_products.length) {
                     try {
                    var encoded_product = decoded_products.pop();
                    var product = JSON.parse(decodeB64(encoded_product));
                    console.log(product.ASIN, " -> created");
                    product.created = Date.now();
                    es_client.update({
                        index: 'products',
                        type: 'amazon_products',
                        id: product.ASIN[0],
                        body: {
                            doc: product,
                            doc_as_upsert: true
                        }
                    }, function(error, response) {
                        console.log(error, response);
                        if (error) {
                            results.error.push({
                                Error: [{
                                    Error: [{
                                        Code: ["Not uploaded to ES"],
                                        Message: ["Product: "+product.ASIN[0]+"- Not uploaded to ES"]
                                    }]
                                }]
                            });
                        }
                        post();
                    });
                    } catch (e) {
                        console.log("Parse Error);");
                        results.error.push({
                            Error: [{
                                Error: [{
                                    Code: ["JSON Parse Error"],
                                    Message: ["Some Products have too much data!."]
                                }]
                            }]
                        });
                        post();
                    }
                } else {

                    results.status="Completed";
                    
                    res.set('Content-Type', 'application/json');
                    res.send(results);
                }
            }
            post();
            // })
        }
    } catch (e) {
        console.log(e);
        results = {
            error: [{
                Error: [{
                    Error: [{
                        Code: ["Invalid swicth case"],
                        Message: ["Invalid Switch case"]
                    }]
                }]
            }]
        };
        res.set('Content-Type', 'application/json');
        res.send(results);
    }
});

function process(operation, qObject, cb) {
    console.log("Operation ", operation, "- Page ", qObject['ItemPage']);
    switch (operation) {
        case 'ItemSearch':
            client.itemSearch(qObject).then(function(results) {
                cb(results, false);
            }).catch(function(err) {
                // console.log(err);
                cb([], err);
                // var errorCodeString=err[0].Error[0].Code[0];
            });
            break;
        case 'BrowseNodeLookup':
            client.browseNodeLookup(qObject).then(function(results) {
                cb(results, false);
            }).catch(function(err) {
                //console.log(err);
                cb([], err);
                // var errorCodeString=err[0].Error[0].Code[0];
            });
            break;
        case 'ItemLookup':
            client.itemLookup(qObject).then(function(results) {
                cb(results, false);
            }).catch(function(err) {
                //console.log(err);
                cb([], err);
                // var errorCodeString=err[0].Error[0].Code[0];
            });
            break;
        default:
            cb([], [{
                Error: [{
                    Error: [{
                        Code: ["Invalid swicth case"],
                        Message: ["Invalid Switch case"]
                    }]
                }]
            }]);
            break;
    }
}
router.get('/doRequest', function(req, res, next) {
    var q = req.query.q;
    var pages = req.query.pages;
    var decodedQ = decodeB64(q);
    var qObject = querystring.parse(decodedQ);
    var operation = qObject['Operation'];
    delete qObject['AWSAccessKeyId'];
    delete qObject['AssociateTag'];
    delete qObject['Operation'];
    delete qObject['Service'];
    delete qObject['Timestamp'];
    console.log("Parsed:", qObject);
    var products = [];
    var err = [];
    var done = 0;

    function cp() {
        if (done != pages) {
            qObject['ItemPage'] = (done + 1);
            process(operation, qObject, function(products_resp, errors) {
                products.push(products_resp);
                err.concat(errors);
                done += 1;
                cp();
            });
        } else {
            //  console.log("process is done: ",done,"-->",pages,products)
            res.set('Content-Type', 'application/json');
            var kk = {
                products: products,
                errors: err
            };
            res.send(kk);
        }
    }
    try {
        cp();
    } catch (e) {
        // console.log(e);
        res.set('Content-Type', 'application/json');
        res.send([{
            errors: [{
                Error: [{
                    Error: [{
                        Code: ["Invalid Response try"],
                        Message: ["Invalid Response try"]
                    }]
                }]
            }]
        }])
    }
});
module.exports = router;