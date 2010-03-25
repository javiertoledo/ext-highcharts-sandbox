Ext.ns("Ext.ux");
Ext.ux.AutoColumnPanel = Ext.extend(Ext.Panel, {
    layout: 'column',
    initComponent: function() {	
		var columnWidth = 1/this.items.length;
		Ext.each(this.items,function(item){
			Ext.apply(item,{
				columnWidth: columnWidth
			});
		},this);
        Ext.ux.AutoColumnPanel.superclass.initComponent.call(this);
    }
});
