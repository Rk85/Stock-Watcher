(function(Application, $, undefined){
    Application.showAlert = function(options){
        var options = options || {};
        var msg = '<p><strong>'+ options.msg || '' + '</strong></p>'
        $.prompt(msg,{
                        buttons: options.buttons || { Yes: true, No: false },
						focus: options.focus || 1,
						submit:function(e,v,m,f){ 
				            if ( options.callBack){
				                options.callBack(v);
                            }		
						},
                        classes: {
						  box: '',
                          fade: '',
                          prompt: '',
                          close: '',
                          title: '',
                          message: '',
                          buttons: '',
                          button: 'btn',
                          defaultButton: 'btn-primary'
                        }
				});
    }
}(window.Application = window.Application || {}, jQuery));
