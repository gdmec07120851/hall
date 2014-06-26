Model.message = function(exports){  
    exports.config = {      
        fields : [
            {name: 'content', type: 'text'},
            {name: 'time', type: 'datetime',defaultValue: 'now()'}
        ]
    };
};
