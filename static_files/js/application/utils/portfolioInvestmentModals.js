(function (stockWatcher, $) {
  stockWatcher.portfolioTransModals = function portfolioTransModals(data, parent) {
    var self = this;
    self.newTransDetail = function newTransDetail(details) {
      return {
        id: data.id || '',
        companyName: ko.observable(data.companyName || ''),
        invPrice: ko.observable(details.invPrice || ''),
        invDate: ko.observable(details.invDate || ''),
        quantity: ko.observable(details.quantity || ''),
        comments: ko.observable(details.comments || '')
      };
    };
    self.headerName = ko.observable(data.headerName || 'Add New Transaction');
    self.isEdit = ko.observable(data.isEdit || false);
    self.transDetails = ko.observableArray([
      self.newTransDetail(data)
    ]);
    self.saveAction = function saveAction() {
      if (data.onSave) {
        data.onSave(self.transDetails());
      }
    };
    $('#portfolioTransModal').on('show', function () {
      var i = 0;
        for(i=0; i<self.transDetails().length; i++){
          $('#datepicker' + i).datepicker(
            {
              showOn: 'button',
              buttonImage: 'static_files/css/images/calendar.gif',
              buttonImageOnly: true
          });
        }
    })
  }  
}(Application.namespace("Application.stockWatcher"), jQuery));
