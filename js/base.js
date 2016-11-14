;(function(){
  'use strict';
  var $addtask = $('.add-task'),
   task_list = [],
   $delete_task;
  // 首先获取localStorage中的数据；
  init();
  $addtask.on('submit', function(e){
    // 不能一直在一个对象上操作，不然会报错
     var new_task = {};
    // 禁用默认行为
    e.preventDefault();
    var $input = $(this).find('input[type="text"]');
    // 获取新task的值
    new_task.content = $input.val();
    // 如果新task值为空，则直接返回
    if (!new_task.content) return;
    // 如果不为空，则添加至task_list,并且将页面更新
    if (add_task(new_task)) {
      render_task_list();
      $input.val('');
    }
  });

  function listen_task_delete() {
    $delete_task.on('click',function(){
      var item = $(this).parent().parent();
      var index = item.data('index');
      var r = confirm("Are you sure to delete");
      if (r) {
        delete_task(index);
      }
    });
  }

    function add_task(new_task){
      // 将新task推入task_list
      task_list.push(new_task);
      refresh_task_list();
      // 更新storage;
      return true;
    }
    function refresh_task_list(){
      store.set('task_list',task_list);
      render_task_list();
    }
    function delete_task(index){

      // 不能用!index因为要考虑到index=0的情况
      if(index === undefined || !task_list[index]) return;
      delete task_list[index];
      refresh_task_list();
    }

  function init() {
    // 没有数据的时候使它等于空数组，否则报错！！！important
    task_list = store.get('task_list') || [];
    if (task_list.length){
      render_task_list();
    }
  }

  function render_task_list(){
    var $task_list = $('.task_list');
    // 先清空输入框，再添加
    $task_list.html('');
    // 循环添加task_item
    for (var i = 0; i < task_list.length; i++) {
      var $task = render_task_item(task_list[i], i);
      $task_list.append($task);
    }
    // 因为HTML是动态添加，所以delete_task要放在添加完后
    $delete_task = $('.action.delete');
    // jQuery动态添加的事件需要随时监听
    listen_task_delete();

  }
  // 只render当前每一条数据
  function render_task_item(data, index){
    // index用做识别每一条item
    if (!data || !index) return;
    var list_item_tpl = '<div class="task-item" data-index = "'+index+'">' +
      '<span><input type="checkbox"></span>' +
      '<span class="task-content">' + data.content+
      '</span>' +
      '<span class="fr">' +
      '<span class="action delete"> 删除</span>' +
      '<span class="action"> 详情</span>' +
      '</span>' +
    '</div>';
    return $(list_item_tpl);
    }
})();
