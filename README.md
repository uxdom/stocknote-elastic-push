# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* StockNote is a dashboard tool to help Amazon Associates send product XML data to Elastic Search for search indexing. Tool retrieves items from Amazon Product Advertising API, sends XML product data to remote URLs such as ElasticSearch, Firebase, and other web hooks.

### How do I get set up? ###

* Amazon Credentials to Make Api Calls
Access Key
```AKIAJ***************```

Secret Key
```Ccf5N9zeGt*****************************```

And use associate tag
```******-20```

### Contribution guidelines ###

* None specified

### How do I run the app? ###
```sudo docker build -t my-nodejs-app .```
```sudo docker run -p 5001:5000 -d my-nodejs-app```