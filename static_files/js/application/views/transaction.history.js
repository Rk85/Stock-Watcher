(function (transaction, $) {
  var historyRows = function historyRows(data, parent) {
    var self = this;
    self.data = data || {};
    self.profileId =  ko.observable(self.data.profileId || 1);
    self.companyName = ko.observable(self.data.companyName || 'companyName');
    self.quantity = ko.observable(self.data.quantity || 0);
    self.buyDate = ko.observable(self.data.buyDate || 'buy_date');
    self.sallDate = ko.observable(self.data.sellDate || 'sell_date');
    self.buyPrice = ko.observable(self.data.buyPrice || 'buyPrice');
    self.sellPrice = ko.observable(self.data.sellPrice || 'sellPrice');
    self.brokerAmount = ko.observable(self.data.brokerAmount || 'brokerAmount');
    self.totalGain = ko.observable(self.data.totalGain || 'totalGain');
    self.totalGainPercent = ko.observable(self.data.totalGainPercent || 'totalGainPercent');
    self.tax = ko.observable(self.data.tax || 'tax');
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
    //self.transModalDetails = ko.observable(new Application.stockWatcher.transModals({}, self));

    self.transactionAction = function transactionAction(actionId, rowData, event) {
      if (actionId === Application.staticData.EDIT) {
        rowData.headerName = 'Edit Transaction';
        rowData.isEdit = true;
        rowData.onSave = self.updateTrans;
        // parent.transModalDetails(new Application.stockWatcher.transModals(rowData, parent));
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
