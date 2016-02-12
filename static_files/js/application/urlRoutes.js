(function (Application, $) {
  Application.Routing = {
    Configure: function () {
      Application.Routing.Sammy = $.sammy("#main", function () {
        this.get("#home", function (context) {
          alert('home');
        });
        this.get("#/stock/invest", function (context) {
          var url = "/api/1.0/portfolio_investment/";
          Application.Tab.GetContent(url);
        });
        this.get("#/stock/trans", function (context) {
          var url = "/api/1.0/transaction_history/";
          Application.Tab.GetContent(url);
        });
      });
    },
    run: function () {
      Application.Routing.Sammy.run("#main");
    }
  };
}(window.Application = window.Application || {}, jQuery));