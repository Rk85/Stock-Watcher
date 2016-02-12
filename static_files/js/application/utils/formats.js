(function (formats, $) {
  formats.portfolioTotalDetails = function formatTotalDetails(details) {
    return {
      totalValue: details.total_value || "877,234",
      totalChange: details.total_change || "+10000",
      changePercent: details.change_percent || "(+15.0%)",
      valueInc: details.value_inc || false,
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
      id: ko.utils.unwrapObservable(details.id || ''),
      companyName: ko.utils.unwrapObservable(details.name || details.companyName || ''),
      invPrice: ko.utils.unwrapObservable(details.inv_price || details.invPrice || ''),
      invDate: ko.utils.unwrapObservable(details.inv_date || details.invDate || ''),
      quantity: ko.utils.unwrapObservable(details.quantity || details.quantity || ''),
      comments: ko.utils.unwrapObservable(details.comments || ''),
      invTotalAmount: ko.utils.unwrapObservable(details.inv_total_amount || details.invTotalAmount || ''),
      livePrice: ko.utils.unwrapObservable(details.live_price || details.livePrice || ''),
      todayChange: ko.utils.unwrapObservable(details.today_change || details.todayChange || ''),
      todayGain: ko.utils.unwrapObservable(details.today_gain || details.todayGain || ''),
      todayPercentage: ko.utils.unwrapObservable(details.today_percentage || details.todayPercentage || ''),
      totalChange: ko.utils.unwrapObservable(details.total_change || details.totalChange || ''),
      totalGain: ko.utils.unwrapObservable(details.total_gain || details.totalGain || ''),
      totalPercentage: ko.utils.unwrapObservable(details.total_percent || details.totalPercent || ''),
      companyId: ko.utils.unwrapObservable(details.company_id || '')
    };
  };
  formats.historyTransDetail = function historyTransDetail(details) {
    return {
      id: ko.utils.unwrapObservable(details.id) || '',
      profileId: ko.utils.unwrapObservable(details.profileId) || '',
      companyName: ko.utils.unwrapObservable(details.companyName) || '',
      quantity: ko.utils.unwrapObservable(details.quantity) || '0',
      buyPrice: ko.utils.unwrapObservable(details.buyPrice) || '0',
      sellPrice: ko.utils.unwrapObservable(details.sellPrice) || '0',
      buyDate: ko.utils.unwrapObservable(details.buyDate) || '0',
      sellDate: ko.utils.unwrapObservable(details.sellDate) || '0',
      brokerAmount: ko.utils.unwrapObservable(details.brokerAmount) || '0',
      totalGain: ko.utils.unwrapObservable(details.totalGain) || '0',
      totalGainPercent: ko.utils.unwrapObservable(details.totalGainPercent) || '0',
      tax: ko.utils.unwrapObservable(details.tax) || '0',
    };
  };
}(Application.namespace("Application.formats"), jQuery));