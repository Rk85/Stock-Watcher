(function (Application, $) {
  Application.Routing = {
    Configure: function () {
      Application.Routing.Sammy = $.sammy("#main", function () {
        this.get("#home", function (context) {
          alert('home');
        });
        this.get("#/stock/invest", function (context) {
          var url = "/stock/invest";
          Application.Tab.GetContent(url);
        });
      });
    },
    run: function () {
      Application.Routing.Sammy.run("#main");
    }
  };
}(window.Application = window.Application || {}, jQuery));