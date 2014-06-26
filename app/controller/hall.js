//配置URL(其路径部分hall)与Controller(App.hall)的映射关系
sumeru.router.add(
    {
        pattern: '/hall',
        action : 'App.hall'
    }
);

//控制器的定义
App.hall = sumeru.controller.create(function(env, session){
    var getMsgs = function(){       
        session.messages = env.subscribe('pub-message', function(msgCollection){
            //操作同步采集，并将其绑定到serveral的视图块。
            session.bind('message-hall', {
                data    :   msgCollection.find()
            });
        });
    };      
    //onload响应所有的数据订阅的处理，Controller中需要使用的数据都在这步中加载
    env.onload = function(){            
        return [getMsgs];            
    };

    //sceneRender 响应视同渲染或者过渡的处理，负责对View的渲染。
    env.onrender = function(doRender){
        doRender('hall', ['push', 'left']);
    };

    //onready是响应事件绑定和数据处理，在View渲染完成后，事件绑定、DOM操作等业务逻辑都在该时态中完成。
    env.onready = function(){           
        Library.touch.on('.messageSubmit', 'touchstart', submitMessage);
        Library.touch.on('.clearHistory', 'touchstart', clearHistory);
    };    

    var submitMessage = function(){
        var input = document.getElementById('messageInput'),
            inputVal = input.value.trim();      
        if (inputVal == '') {
           return false; 
        };
        session.messages.add({
           content : inputVal
        });
        session.messages.save();
        input.value = '';          
    };

    var clearHistory = function(){
        session.messages.destroy();
        session.messages.save();
    }       
});
