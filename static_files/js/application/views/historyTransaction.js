(function (transaction, $) {
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
    self.filterCriteria = ko.observableArray([
      'Buy Date',
      'Sell Date'
    ]);
    self.selectedFilterCriteria = ko.observable();
    self.data.total_history_rows = [{
      id: 1,
      profileId: 1,
      companyName: "Test",
      quantity: 100,
      buyDate: "02/06/16",
      sellDate: "02/12/16",
      buyPrice: 100,
      sellPrice: 150,
      brokerAmount: 10,
      totalGain: 50,
      totalGainPercent: "50%",
      tax: 300
    },
    {
      id: 2,
      profileId: 1,
      companyName: "Test",
      quantity: 101,
      buyDate: "06/01/15",
      sellDate: "10/01/15",
      buyPrice: 100,
      sellPrice: 150,
      brokerAmount: 10,
      totalGain: 50,
      totalGainPercent: "50%",
      tax: 300
    }]
    self.fromDate = ko.observable();
    self.toDate = ko.observable();
    self.totalHistoryRows = ko.observableArray(
      ko.utils.arrayMap(self.data.total_history_rows || [], function(row){
        return new Application.formats.historyTransDetail(row);
      })
    );
    self.selectedProfile = ko.observable(self.availableProfiles()[0]);
    var getTransHistoryRows = function getTransHistoryRows(){
      if (self.selectedProfile()) {
        return ko.utils.arrayFilter(self.totalHistoryRows() || [], function (row) {
          return row.profileId === self.selectedProfile().id;
        });
      }
      return [];
    }
    self.selectedProfileHistoryRows = ko.observableArray(getTransHistoryRows())
    
    self.totalRows = ko.computed(function(){
      return self.selectedProfileHistoryRows() ? self.selectedProfileHistoryRows().length-1 : 0;
    })
    self.transHistoryModalDetails = ko.observable(new Application.stockWatcher.historyTransModals({}, self));
    self.updateTrans = function updateTrans(updateTransDetails){
      var updateItem = Application.formats.historyTransDetail(updateTransDetails[0]);
      var transItem = ko.utils.arrayFirst(self.totalHistoryRows() || [], function(item){
          return item.id === updateItem.id;
      })
      if (transItem ){
        var index = self.totalHistoryRows.indexOf(transItem);
        if (index != -1){
          self.totalHistoryRows.remove(transItem);
          self.totalHistoryRows.splice(index, 0, updateItem);
          }
      }
    };

    self.transactionAction = function transactionAction(actionId, rowData, event) {
      if (actionId === Application.staticData.EDIT) {
        rowData.headerName = 'Edit Sold Transaction';
        rowData.isEdit = true;
        rowData.onSave = self.updateTrans;
        self.transHistoryModalDetails(new Application.stockWatcher.historyTransModals(rowData, parent));
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
    self.applyFilter = function applyFilter(){
      var fromDate = self.fromDate() ? new Date(self.fromDate()).getTime() : new Date(1900, 01, 01).getTime(), 
          toDate = self.toDate() ? new Date(self.toDate()).getTime() : new Date(3100, 01, 01).getTime();
      var filteredArray = ko.utils.arrayFilter(self.totalHistoryRows() || [], function (row) {
        var rowTime = self.selectedFilterCriteria() == 'Buy Date' ? new Date(row.buyDate).getTime() : new Date(row.sellDate).getTime();
        return row.profileId === self.selectedProfile().id && fromDate <= rowTime && rowTime <= toDate;
      });
      self.selectedProfileHistoryRows(filteredArray);
    };
  };
}(Application.namespace("Application.stockWatcher.transaction"), jQuery));
