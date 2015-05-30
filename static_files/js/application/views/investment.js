(function (investment, $) {
  var profileCompanyDetails = function profileCompanyRows(data, parent) {
    var self = this;
    self.data = data || {};
    self.profileId =  self.data.profileId || 1;
    self.companyId = self.data.id;
    self.companyTransShow = ko.observable(false);
    self.transId = 1; // This will come from DB
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
        parent.transModalDetails(new Application.stockWatcher.transModals(newTransData, parent));
      } else if (actionId === Application.staticData.EDIT) {
        rowData.headerName = 'Edit Transaction';
        rowData.isEdit = true;
        rowData.onSave = self.updateTrans;
        parent.transModalDetails(new Application.stockWatcher.transModals(rowData, parent));
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
    self.userName = ko.observable('Guest');
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
    self.selectedProfile = ko.observable(self.availableProfiles()[0]);
    self.availableRefreshRates = ko.observableArray([
      {
        id: 1,
        name: '2 minutes'
      },
      {
        id: 2,
        name: '5 minutes'
      }
    ]);
    self.selectedRefreshRate = ko.observable();
    self.totalProfileTableRows = ko.observableArray([
      new profileCompanyDetails({id: 1, companyName: "NAME1", profileId: 1}, self),
      new profileCompanyDetails({id: 2, companyName: "NAME3", profileId: 1}, self),
      new profileCompanyDetails({id: 3, companyName: "NAME2", profileId: 2}, self)
    ]);
    self.selectedProfileRows = ko.computed(function () {
      if (self.selectedProfile()) {
        return ko.utils.arrayFilter(self.totalProfileTableRows() || [], function (row) {
          return row.profileId === self.selectedProfile().id;
        });
      }
      return [];
    });
    self.transModalDetails = ko.observable(new Application.stockWatcher.transModals({}, self));
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
