$(function(){

	//append "Clear" button to the back of the Input
	//添加清除按钮到文本域后
	$('input').parent().append('<i class="clear"></i>');

	//listen text box is entered
	//监听文本域输入
	$(document).on('keyup', 'input', function(event) {
		event.preventDefault();
		/* Act on the event */
		//若文本域内有内容则显示清楚按钮，反之则隐藏
		if($.trim(this.value)){
			$(this).next('i').fadeIn(200);
		}else{
			$(this).next('i').fadeOut(200);
		}
	});

	//when the "Clear" button is pressed
	//监听清除按钮点击事件
	$(document).on('touchend', 'i[class="clear"]', function(event) {
		event.preventDefault();
		/* Act on the event */
		$(this).prev('input').val("");
		$(this).fadeOut(200);
	});

	//when the "Return" button is pressed
	//监听返回按钮点击事件
	$(document).on('touchend', 'a[data="return"]', function(event) {
		event.preventDefault();
		/* Act on the event */
		closeMask();
	});

	//when the "Save" button is pressed
	//监听保存按钮点击事件
	$(document).on('touchend', 'a[data="save"]', function(event) {
		event.preventDefault();
		/* Act on the event */
		$.checkForm.check();
		return false;
		// 验证和判断开始
		

		// 验证和判断结束
		saveGoods(current);
	});

	$(document).on('tap', '.remove', function(event) {
		event.preventDefault();
		/* Act on the event */
		removeGoods();
	});

	$(document).on('tap', '.itemBox ul', function(event) {
		event.preventDefault();
		/* Act on the event */
		openMask($(this).index());
	});

	$(document).on('tap', '[data="addGoods"]', function(event) {
		event.preventDefault();
		/* Act on the event */
		openMask();
	});
});

var current = 0;

function openMask(index){
	if(index){
		current = index;
		var e = $('.itemBox ul').eq(current-1);

		$('#gname').val(e.attr('data-name'));
		$('#gamt').val(e.attr('data-amt'));
		$('#gcost').val(e.attr('data-cost'));
		$('#address').val(e.attr('data-address'));
		$('.remove').css('display','block');
	}

	showClear();
	$('#newItem').fadeIn(100);
	$('#mask').fadeIn(200);
}


/**
 * 保存产品信息
 * @param  {int} index [产品行索引]
 * @author Tyrant 774275154@qq.com
 */
function saveGoods(index){
	if($.trim(index)){
		var e = $('.itemBox ul').eq(current-1);

		e.attr('data-name', $('#gname').val());
		e.attr('data-amt', $('#gamt').val());
		e.attr('data-cost', $('#gcost').val());
		e.attr('data-address', $('#address').val());

		e.children('li:eq(0)').children('span').html($('#gname').val());
		e.children('li:eq(1)').children('span').html($('#gamt').val());
		e.children('li:eq(2)').children('span').html($('#gcost').val());
	}else{
		var gname = $('#gname').val();
		var gamt = $('#gamt').val();
		var gcost = $('#gcost').val();
		var address = $('#address').val();
		var str = '<ul data-name="'+gname+'" data-amt="'+gamt+'" data-cost="'+gcost+'" data-address="'+address+'">';
			str += '<li>产品<span>'+gname+'</span></li>';
			str += '<li>数量<span>'+gamt+'</span></li>';
			str += '<li>单价<span>'+gcost+'</span></li>';
			str += '<a href="#newItem" class="more"></a></ul>';
		$('.itemBox').append(str);
	}
	closeMask();
	goodsListIsNull();
}

// 删除产品
function removeGoods(){
	$('.itemBox ul').eq(current-1).slideUp(200,function(e){
		$(e).remove();
	});
	closeMask();
	goodsListIsNull();
}

// 关闭遮罩和弹出
function closeMask(){
	$('#newItem').fadeOut(300);
	$('#mask').fadeOut(300);
	$('#newItem form')[0].reset();
}

// 判断列表是否为空
function goodsListIsNull(){
	console.log($('.itemBox ul').length);
	if($('.itemBox ul').length > 0){
		$('#nogoods').slideUp(400);
	}else{
		$('#nogoods').slideDown(400);
	}
}

// 判断清空按钮是否显示
function showClear(){
	$('i[class="clear"]').each(function(index, el) {
		if($.trim($(this).prev().val())){
			$(this).show();
		}else{
			$(this).hide();
		}
	});
}