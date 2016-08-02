(function($){

	jQuery.checkForm = {
		check : function(){
			$('input[required]').each(function(index, el) {
				if(!$(el).val()){
					var str = '<div id="checkFormMsg"><p>' + $(el).attr("data-check-name") + '不能为空</p><a href="javascript:void(0)">确定</a></div>';
					$('body').append(str);
					showMask();
					throw $(el).attr("data-check-name")+"不能为空";

					return false;
				}
			});
		},

		

	}

	var showMask = function(){
		var str = '<div id="checkMask" style="width:100%;height:100%; position: absolute;left:0;top:0;opacity:0.6;background:#000;z-index:9999"></div>';
		$('body').append(str);
	}

	$(document).on('touchend', '#checkFormMsg a', function(event) {
		event.preventDefault();
		/* Act on the event */
		$('#checkFormMsg').fadeOut('200', function() {
			$('#checkFormMsg').remove();
		});
		$('#checkMask').fadeOut('200', function() {
			$('#checkMask').remove();
		});
	});


})(jQuery);