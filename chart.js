Ext.ns("Ext.ux.highcharts");

var _ChartNumber = 1;

Ext.ux.highcharts.Chart = Ext.extend(Ext.Panel, {
	
	constructor: function(config){
		
		var div_id = "pie_chart_" + _ChartNumber++;
		
		this.heigh = config.heigh || 300;			
		
		config = Ext.apply({
			html: '<div id="' + div_id + '" style="width: 100%; height: '+this.heigh+'px"></div>'
		},config);
		
		Ext.ux.highcharts.Chart.superclass.constructor.call(this, config);
		
		this.on("afterlayout",function(){
			
			var data = [
				["Firefox", 50],
				["Internet explorer", 10],
				["Safari", 20]
			]
			
			new Highcharts.Chart({
				chart: {
					renderTo: div_id,
					margin: [30, 0, 30, 100],
					backgroundColor: "#333",
					borderRadius: 0
				},
				credits: {
					enabled: false
				},
				title: {
					text: config.dataName,
					color: "#ddd"
				},
				plotArea: {
					shadow: null,
					borderWidth: null,
					backgroundColor: null
				},
				tooltip: {
					formatter: function() {
						return '<b>'+ this.point.name +'</b>: '+ this.y + ' Cosas';
					}
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						dataLabels: {
							enabled: true,
							formatter: function() {
								if (this.y > 5) return '<div style="text-align: center">' + this.point.name.replace(" ","<br/>") + '</div>';
							},
							color: 'white',
							y: -3,
							style: {
								font: '13px Trebuchet MS, Verdana, sans-serif'
							}
						}
					}
				},
				legend: {
					layout: 'vertical',
					backgroundColor: "#ccc",
					borderRadius: 5,
					style: {
						left: '5px',
						bottom: '5px',
						right: 'auto',
						top: 'auto',
						font: '11px Trebuchet MS, Verdana, sans-serif'
					}
				},
				series: [{
					type: 'pie',
					name: config.dataName,
					data: data
				}]
			});
		},this);
	}
});