module.exports = function(fw){
    fw.publish('message', 'pub-message', function(callback){
        var collection = this;
        collection.find({}, {}, function(err, items){
            callback(items);
        });
    });   
}
