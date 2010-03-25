Ext.ns('Ext.highcharts');

Ext.highcharts.ChartPanel = Ext.extend(Ext.Panel,{
	initComponent: function() {
		this.on('afterlayout', this.renderChart, this);
	   	Ext.highcharts.ChartPanel.superclass.initComponent.call(this);
	},
	renderChart: function(){
		Ext.apply(this.chartConfig.chart,{
			renderTo: this.body.dom
		});
		this.chart = new Highcharts.Chart(this.chartConfig);
		this.un('afterlayout', this.renderChart, this);
		this.on('afterlayout', this.redrawChart, this);
		this.on('resize', this.redrawChart, this);
	},
	redrawChart: function(){
		if(!this.backupSeries){
			this.backupSeries = [];
			for (var i = 0, len = this.chart.series.length; i < len; i++) {
			    var data = [], s = this.chart.series[i];
			    for (var c = 0, dlen = s.data.length; c < dlen; c++) {
			        data.push({
						x: s.data[c].x,
						y: s.data[c].y,
						name: s.data[c].name
					});
			    }
			    var opt = {id:'',name:s.name,data:data,options:{}};
			    if (typeof s.options != undefined && typeof s.options.id != undefined) opt.id = s.options.id;
			    if (typeof s.options  != undefined) Ext.apply(opt.options,s.options);
			    if (typeof s.color    != undefined) opt.color = s.color;
			    if (typeof s.selected != undefined) opt.selected = (s.selected) ? true:false;
			    if (typeof s.type     != undefined) opt.type  = s.type;
			    if (typeof s.visible  != undefined) opt.visible = (s.visible) ? true:false;
			    if (typeof s.xAxis    != undefined) Ext.apply(opt.xAxis, s.xAxis);
			    if (typeof s.yAxis    != undefined) Ext.apply(opt.yAxis,s.yAxis);
			    this.backupSeries.push(opt);
			}
		}
		// Clear previous chart.
		this.chart.destroy();
        
		// Clear the old series
		delete this.chartConfig.series
        
		// Set the new series.
		this.chartConfig.series = this.backupSeries;
        
		// Recreate chart
		this.chart = new Highcharts.Chart(this.chartConfig);
	}
});