(function (stockWatcher, $) {
  stockWatcher.historyTransModals = function historyTransModals(data, parent) {
    var self = this;
    self.newTransDetail = function newTransDetail(details) {
      return {
        id: data.id || '',
        profileId: data.profileId,
        companyName: data.companyName,
        quantity: data.quantity,
        buyDate: data.buyDate,
        sellDate: data.sellDate,
        buyPrice: data.buyPrice,
        sellPrice: data.sellPrice,
        brokerAmount: data.brokerAmount,
        totalGain: data.totalGain,
        totalGainPercent: data.totalGainPercent,
        tax: data.tax
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
              buttonImageOnly: true
          });
          $('#datepicker_sell_' + i).datepicker(
            {
              showOn: 'button',
              buttonImage: 'static_files/css/images/calendar.gif',
              buttonImageOnly: true
          });
        }
    })
  }  
}(Application.namespace("Application.stockWatcher"), jQuery));
