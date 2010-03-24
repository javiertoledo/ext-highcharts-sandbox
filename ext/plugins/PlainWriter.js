/**
 * @class Ext.ux.data.PlainWriter
 * @extends Ext.data.DataWriter
 * DataWriter extension for writing a single {@link Ext.data.Record} object in plain format in preparation for executing a remote RESTful CRUD action.
 * @author  Javier Toledo <javier at theagilemonkeys.com>
 * @version 1.0
 * @date    March 6th, 2010
 * @license http://www.gnu.org/licenses/lgpl-3.0.txt
 */
Ext.ns("Ext.ux.data")
Ext.ux.data.PlainWriter = function(params) {
    Ext.ux.data.PlainWriter.superclass.constructor.apply(this, arguments);
};
Ext.extend(Ext.ux.data.PlainWriter, Ext.data.DataWriter, {
	
	/**
	 * @cfg {String} objectName
	 * Optionally set an Object name to record params. The string you set in this option will be added to params name in Rails way: objectName[your_param_name]. Leave it unset or set it null to transfer params in plain HTTP. Default is null.
	 */
	objectName: null,
    
	/**
     * PlainWriter implementation of the final stage of a write action.
     * @param {Object} params Transport-proxy's (eg: {@link Ext.Ajax#request}) params-object to write-to.
     * @param {Object} baseParams as defined by {@link Ext.data.Store#baseParams}.
     * @param {Object} data Data-object representing the compiled Store-recordset.
     */
    render : function(params, baseParams, data) {
		var object = this.objectName;
		if (object) {
			var paramsHash = {};
			Ext.iterate(data, function(k,v){
				paramsHash[object + "[" + k + "]"] = v;
			});
			Ext.apply(params,paramsHash,baseParams);
		}
		else{
	    	Ext.apply(params,data,baseParams);
		}
    },

    
	/**
     * createRecord
     * @protected
     * @param {Ext.data.Record} rec
     * @return {Object} name:value pairs for attributes of the {@link Ext.data.Record}.  See {@link Ext.data.DataWriter#toHash}.
     */
    createRecord : function(rec) {
	   	return this.toHash(rec);
	},

    
	/**
     * updateRecord
     * @protected
     * @param {Ext.data.Record} rec
     * @return {Object} name:value pairs for attributes of the {@link Ext.data.Record}.  See {@link Ext.data.DataWriter#toHash}.
     */
    updateRecord : function(rec) {
	   	return this.toHash(rec);
		data[this.meta.idProperty] = rec.id;
	},
    
	/**
     * destroyRecord
     * @protected
     * @param {Ext.data.Record} rec
     * @return {Object} Array containing a attribute-object (name/value pair) representing the {@link Ext.data.DataReader#idProperty idProperty}.
     */
    destroyRecord : function(rec) {
    	var data = {};
		data[this.meta.idProperty] = rec.id;
    }
});