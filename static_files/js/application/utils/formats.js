(function (formats, $) {
  formats.portfolioTotalDetails = function formatTotalDetails(details) {
    return {
      totalValue: details.total_value || "877,234",
      totalChange: details.total_change || "+10000",
      changePercent: details.change_percent || "(+15.0%)",
      valueInc: details.value_inc || true,
      maxGainerName: details.max_gainer_name || 'Company Name',
      maxGainerValue: details.max_gainer_value || 30.50,
      maxGainerChange: details.max_gainer_change || "+5.50",
      maxGainerChangePercent: details.max_gainer_percent || "(+5.50)",
      maxLoserName: details.max_loser_name || 'Company Name',
      maxLoserValue: details.max_loser_value || 30.50,
      maxLoserChange: details.max_loser_change || "+5.50",
      maxLoserChangePercent: details.max_loser_percent || "(+5.50)"
    };
  };

  formats.portfolioTransDetail = function formatProfileTransDetail(details) {
    return {
      id: ko.utils.unwrapObservable(details.id) || '',
      companyName: ko.utils.unwrapObservable(details.companyName) || '',
      invPrice: ko.utils.unwrapObservable(details.invPrice) || '0',
      invDate: ko.utils.unwrapObservable(details.invDate) || '',
      quantity: ko.utils.unwrapObservable(details.quantity) || '0',
      comments: ko.utils.unwrapObservable(details.comments) || '',
      invTotalAmount: ko.utils.unwrapObservable(details.invTotalAmount) || '0',
      livePrice: ko.utils.unwrapObservable(details.livePrice) || '0',
      todayChange: ko.utils.unwrapObservable(details.todayChange) || '0',
      todayGain: ko.utils.unwrapObservable(details.todayGain) || '0',
      todayPercentage: ko.utils.unwrapObservable(details.todayPercentage) || '0',
      totalChange: ko.utils.unwrapObservable(details.totalChange) || '0',
      totalGain: ko.utils.unwrapObservable(details.totalGain) || '0',
      totalPercentage: ko.utils.unwrapObservable(details.totalPercent) || '0',
      companyId: ko.utils.unwrapObservable(details.id) || '0'
    };
  };
}(Application.namespace("Application.formats"), jQuery));