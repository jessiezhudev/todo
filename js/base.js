;(function(){
    $("#submit").click(function(){
        var input_content = $('#input-content').val();
        $('.todo-result').append("<div class='todo-item'><div class='todo-list'><input type='radio'/>input_content</div><button class='btn-list'>+</button><button class='btn-list'>x</button></div>");
    });
})();
