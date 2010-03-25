ChartWindow = Ext.extend(Ext.Window, {
    title: 'Some chart window',
    width: 800,
	height: 400,
	layout: 'fit',
    initComponent: function() {
		this.items = [new Ext.highcharts.ChartPanel(this.config)];
        ChartWindow.superclass.initComponent.call(this);
		this.show();
    }
});