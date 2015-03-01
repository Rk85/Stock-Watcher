(function (Application, $) {
  var tab_content_selecter = "#tab_content";
  Application.Tab = {
    GetContent: function (url) {
      // Send the Ajax Request for the newly created tab
      $.ajax({
        url: url,
        success: function (data) {
          // Append the Ajax response as html data for the newly created Tab
          $(tab_content_selecter).html(data.form);
          // Append the Ajax response as html data for the newly created Tab 
          applyFormBindings(data.response_data, tab_content_selecter);
        }
      });
    }
  };
}(window.Application = window.Application || {}, jQuery));