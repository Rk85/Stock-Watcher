(function (investment, $) {
  var profileCompanyDetails = function profileCompanyRows(data, parent) {
    var self = this;
    self.data = data || {};
    self.profileId =  self.data.profile_id || 0;
    self.companyId = self.data.id;
    self.companyTransShow = ko.observable(false);
    self.transId = undefined; // This will come from DB
    self.transactionTotal = ko.observable(Application.formats.portfolioTransDetail(self.data));
    self.transactionDetails = ko.observableArray(
      ko.utils.arrayMap(self.data.transaction_details || [],  function (transaction) {
        return Application.formats.portfolioTransDetail(transaction);
      })
    );
    self.addNewTrans = function addNewTrans(newTransDetails) {
      $.each(newTransDetails, function (index, trans) {
        trans.id = self.transId;
        self.transactionDetails.push(Application.formats.portfolioTransDetail(trans));
        self.transId = self.transId + 1;
      });
    };
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
      if (actionId === Application.staticData.ADD) {
        var newTransData = {
          companyName: self.transactionTotal().companyName,
          onSave: self.addNewTrans
        };
        parent.transModalDetails(new Application.stockWatcher.portfolioTransModals(newTransData, parent));
      } else if (actionId === Application.staticData.EDIT) {
        rowData.headerName = 'Edit Transaction';
        rowData.isEdit = true;
        rowData.onSave = self.updateTrans;
        parent.transModalDetails(new Application.stockWatcher.portfolioTransModals(rowData, parent));
      } else if (actionId === Application.staticData.SELL) {
        var sellDetails = {
          headerName: 'Sell Transaction',
          isEdit: true,
          profileId: self.profileId,
          companyName: self.transactionTotal().companyName,
          quantity: rowData.quantity,
          buyDate: rowData.invDate,
          buyPrice: rowData.invPrice
        }
        parent.transHistoryModalDetails(new Application.stockWatcher.historyTransModals(sellDetails, parent));
      } else if (actionId === Application.staticData.DEL) {
        Application.showAlert({
          msg: "Do you want to delete this Transaction?",
          callBack: function (result) {
            if (result) {
              self.transactionDetails.remove(rowData);
            }
          }
        });
      }
    };
  }

  investment.portFolio = function portFolio(data) {
    var self = this;
    self.userName = ko.observable(data.user_name || 'Guest');
    self.showToday = ko.observable(true);
    self.changePortfolioType = function () {
      self.showToday(!self.showToday());
      if ( self.showToday()) {
        self.drawChart("today");
      }
      else{
        self.drawChart("total");
      }
    };
    self.todayDataPoints = ko.observableArray();
    self.totalDataPoints = ko.observableArray();
    self.drawChart = function (type){
      if (type == "today") {
        var options = {
          graphArgs: {
            title :{ text: "Today Net Profit"},      
            data: [{ type: "line", xValueType: "dateTime"}],
            axisX: { title: "chart updates every 3 secs"},
            axisY:{ prefix: 'Rs', includeZero: false}, 
          },
          dataLength: 5,
          updateInterval: 3000,
          dataPoints: self.todayDataPoints
        }
        Application.graph.Init("portfolioGraph_today", options)
      }
      if (type == "total") {
        var options = {
          graphArgs: {
            title :{ text: "OverAll Net Profit"},      
            data: [{ type: "line", xValueType: "dateTime"}],
            axisX: { title: "chart updates every 3 secs"},
            axisY:{ prefix: 'Rs', includeZero: false}, 
          },
          dataLength: 5,
          updateInterval: 3000,
          dataPoints: self.totalDataPoints
        }
        Application.graph.Init("portfolioGraph_total", options)
      }
    }
    self.drawChart("today");
    self.todayDetails = ko.observable(Application.formats.portfolioTotalDetails({}));
    self.totalDetails = ko.observable(Application.formats.portfolioTotalDetails({}));
    self.portFolioDetails = ko.computed(function () {
      if ( self.showToday() ){
        return  {
            linkName: 'Today',
            linkValue: self.todayDetails
          };
      }
      else {
        return {
            linkName: 'OverAll',
            linkValue: self.totalDetails
          };
      }
    });
    self.availableProfiles = ko.observableArray($.map(data.user_profiles || [], function(item){
      return {
        id: item.id, name: item.name
      }
    }));
    self.selectedProfile = ko.observable(self.availableProfiles()[0]);
    self.availableRefreshRates = ko.observableArray($.map(data.refresh_rates || [], function(item){
      return {
        id: item.id, name: item.name
      }
    }));
    self.selectedRefreshRate = ko.observable();
    self.totalProfileTableRows = ko.observableArray($.map(data.company_details || [], function(item){
      return new profileCompanyDetails(item, self);
    }));
    self.selectedProfileRows = ko.computed(function () {
      if (self.selectedProfile()) {
        return ko.utils.arrayFilter(self.totalProfileTableRows() || [], function (row) {
          return row.profileId === self.selectedProfile().id;
        });
      }
      return [];
    });
    self.transModalDetails = ko.observable(new Application.stockWatcher.portfolioTransModals({}, self));
    self.transHistoryModalDetails = ko.observable(new Application.stockWatcher.historyTransModals({}, self));
    self.companyAction = function companyAction(actionId, rowData, event) {
      if (actionId === Application.staticData.ADD) {
        alert('Add New Company');
      } else if (actionId === Application.staticData.DEL) {
        var result = Application.showAlert({
          msg: "Do you want to delete this Company?",
          callBack: function (result) {
            if (result) {
              self.totalProfileTableRows.remove(
                ko.utils.arrayFirst(self.totalProfileTableRows() || [],
                  function (profileRow) {
                    return profileRow.companyId === rowData.companyId;
                  })
              );
            }
          }
        });
      }
    };
  };
}(Application.namespace("Application.stockWatcher.investment"), jQuery));
