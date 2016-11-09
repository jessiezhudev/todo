;(function(){
  'use strict';
    $("#submit").click(function(){
        var input_content = $('#input-content').val();
        var html = '';
        html = '<div class="todo-item">'+'<div class="todo-list">'+'<input type="radio"/>' + input_content +  '</div>' + '<button class="btn-list">'+"+"+'</button>'+'<button class="btn-list">'+"x"+'</button>'+'</div>';
        $('.todo-result').append(html);
    });
})();
