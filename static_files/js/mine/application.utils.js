(function (Application, $) {
  Application.showAlert = function (options) {
    var inpOptions = options || {};
    var msg = '<p><strong>' + inpOptions.msg || ' ' + '</strong></p>';
    $.prompt(msg, {
      buttons: inpOptions.buttons || {
        Yes: true,
        No: false
      },
      focus: inpOptions.focus || 1,
      submit: function (e, v, m, f) {
        if (inpOptions.callBack) {
          inpOptions.callBack(v);
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
  };
}(window.Application = window.Application || {}, jQuery));