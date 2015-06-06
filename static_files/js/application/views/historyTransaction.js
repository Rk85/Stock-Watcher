(function (transaction, $) {
  var historyRows = function historyRows(data, parent) {
    var self = this;
    self.profileId =  ko.observable(data.profileId || 1);
    self.companyName = ko.observable(data.companyName || 'companyName');
    self.quantity = ko.observable(data.quantity || 0);
    self.buyDate = ko.observable(data.buyDate || 'buy_date');
    self.sellDate = ko.observable(data.sellDate || 'sell_date');
    self.buyPrice = ko.observable(data.buyPrice || 'buyPrice');
    self.sellPrice = ko.observable(data.sellPrice || 'sellPrice');
    self.brokerAmount = ko.observable(data.brokerAmount || 'brokerAmount');
    self.totalGain = ko.observable(data.totalGain || 'totalGain');
    self.totalGainPercent = ko.observable(data.totalGainPercent || 'totalGainPercent');
    self.tax = ko.observable(data.tax || 'tax');
  }

  transaction.history = function history(data) {
    var self = this;
    self.data = data;
    self.availableProfiles = ko.observableArray([
      {
        id: 1,
        name: 'test'
      },
      {
        id: 2,
        name: 'test2'
      }
    ]);
    self.data.total_history_rows = [{
      profileId: 1,
      companyName: "Test",
      quantity: 100,
      buyDate: "25/25/25",
      sellDate: "25/25/25",
      buyPrice: 100,
      sellPrice: 150,
      brokerAmount: 10,
      totalGain: 50,
      totalGainPercent: "50%",
      tax: 300
    },
    {
      profileId: 1,
      companyName: "Test",
      quantity: 101,
      buyDate: "25/25/25",
      sellDate: "25/25/25",
      buyPrice: 100,
      sellPrice: 150,
      brokerAmount: 10,
      totalGain: 50,
      totalGainPercent: "50%",
      tax: 300
    }]
    self.totalHistoryRows = ko.observableArray(
      ko.utils.arrayMap(self.data.total_history_rows || [], function(row){
        return new historyRows(row);
      })
    );
    self.selectedProfile = ko.observable(self.availableProfiles()[0]);
    self.selectedProfileHistoryRows = ko.computed(function () {
      if (self.selectedProfile()) {
        return ko.utils.arrayFilter(self.totalHistoryRows() || [], function (row) {
          return row.profileId() === self.selectedProfile().id;
        });
      }
      return [];
    })
    self.totalRows = ko.computed(function(){
      return self.selectedProfileHistoryRows() ? self.selectedProfileHistoryRows().length-1 : 0;
    })
    self.transModalDetails = ko.observable(new Application.stockWatcher.historyTransModals({}, self));
    self.updateTrans = function updateTrans(updateTransDetails){
      var updateItem = Application.formats.portfolioTransDetail(updateTransDetails[0]);
      var transItem = ko.utils.arrayFirst(self.transactionDetails() || [], function(item){
          return item.id === updateItem.id;
      })
      if (transItem ){
        var index = self.transactionDetails.indexOf(transItem);
        if (index != -1){
          self.transactionDetails.remove(transItem);
          self.transactionDetails.splice(index, 0, updateItem);
          }
      }
    };

    self.transactionAction = function transactionAction(actionId, rowData, event) {
      if (actionId === Application.staticData.EDIT) {
        rowData.headerName = 'Edit Transaction';
        rowData.isEdit = true;
        rowData.onSave = self.updateTrans;
        self.transModalDetails(new Application.stockWatcher.historyTransModals(rowData, parent));
      } else if (actionId === Application.staticData.DEL) {
        Application.showAlert({
          msg: "Do you want to delete this Transaction?",
          callBack: function (result) {
            if (result) {
              self.totalHistoryRows.remove(rowData);
            }
          }
        });
      }
    };
    
  };
}(Application.namespace("Application.stockWatcher.transaction"), jQuery));
