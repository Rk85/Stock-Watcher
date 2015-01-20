var Application = window.Application || {};
Application.Routing = {
		Configure : function(){
			Application.Routing.Sammy = $.sammy("#main", function(){
				this.get("#main", function(context){
				});
				this.get("#/stock/quote", function(context){
					var url = "/stock/quote"
					Application.Tab.addTab("Get Stock Details" , url);
				});
				this.get("#/portfolio", function(context){
					var url = "/portfolio"
					Application.Tab.addTab("New Client Add" , url );
				});
				this.get("#/about", function(context){
					context.log("#/about");
					var url = "/about"
					Application.Tab.addTab("About Page" , url, true);
				});

			});
		},
		run : function(){
			Application.Routing.Sammy.run("#main");
		}
}
