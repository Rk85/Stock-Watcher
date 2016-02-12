(function (stockWatcher, $) {
  stockWatcher.historyTransModals = function historyTransModals(data, parent) {
    var self = this;
    self.newTransDetail = function newTransDetail(details) {
      return {
        id: ko.observable(data.id || ''),
        profileId: ko.observable(data.profileId || ''),
        companyName: ko.observable(data.companyName || ''),
        quantity: ko.observable(data.quantity || ''),
        buyDate: ko.observable(data.buyDate || ''),
        sellDate: ko.observable(data.sellDate || ''),
        buyPrice: ko.observable(data.buyPrice || ''),
        sellPrice: ko.observable(data.sellPrice || ''),
        brokerAmount: ko.observable(data.brokerAmount || ''),
        totalGain: ko.observable(data.totalGain || ''),
        totalGainPercent: ko.observable(data.totalGainPercent || ''),
        tax: ko.observable(data.tax || '')
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
    $('#historyTransModal').on('show', function () {
      var i = 0;
        for(i=0; i<self.transDetails().length; i++){
          $('#datepicker_buy_' + i).datepicker(
            {
              showOn: 'button',
              buttonImage: 'static_files/css/images/calendar.gif',
              buttonImageOnly: true,
              dateFormat: Application.staticData.DATE_FORMAT
          });
          $('#datepicker_sell_' + i).datepicker(
            {
              showOn: 'button',
              buttonImage: 'static_files/css/images/calendar.gif',
              buttonImageOnly: true,
              dateFormat: Application.staticData.DATE_FORMAT
          });
        }
    })
  }  
}(Application.namespace("Application.stockWatcher"), jQuery));
