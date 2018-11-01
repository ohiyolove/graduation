$(function(){
	$("#form-order").submit(function(){
		var _this = $(this);
		$.ajax({
			url:'/admin/order/add',
			type:'POST',
			data: _this.serialize(),
			dataType: 'json',
			success: function(data){
				var index = parent.layer.getFrameIndex(window.name); //获取当前窗体索引
				parent.location.reload();
				parent.layer.close(index);
			},
		})
		return false;
	})
})
