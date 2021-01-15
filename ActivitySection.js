
define("ActivitySectionV2", ["ConfigurationConstants"], function (ConfigurationConstants) {
    return {
        entitySchemaName: "Activity",
        details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
        diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
        methods: {
            isCustomActionEnabled: function () {
                var selRows = this.get("SelectedRows");
                return selRows ? (selRows.length > 0) : false;
            },
            setAllDone: function () {
                var selRows = this.get("SelectedRows");
                if (selRows.length > 0) {
                    var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
                    selRows.forEach(function (selRowsId) {
                        var update = this.Ext.create("Terrasoft.UpdateQuery", {
                            rootSchemaName: "Activity"
                        });
                        update.enablePrimaryColumnFilter(selRowsId);
                        update.setParameterValue("Status", ConfigurationConstants.Activity.Status.Done,
                            this.Terrasoft.DataValueType.GUID);
                        batchQuery.add(update);
                    }, this);
                    batchQuery.execute(function () {
                        this.reloadGridData();
                    }, this);
                }
            },
            getSectionActions: function () {
                var actionMenuItems = this.callParent(arguments);

                actionMenuItems.addItem(this.getButtonMenuItem({
                    Type: "Terrasoft.MenuSeparator",
                    Caption: ""
                }));

                actionMenuItems.addItem(this.getButtonMenuItem({
                    "Caption": { bindTo: "Resources.Strings.AllDoneCaption" },
                    "Click": { bindTo: "setAllDone" },
                    "Enabled": { bindTo: "isCustomActionEnabled" },
                    "IsEnableForSelectedAll": true
                }));

                return actionMenuItems;
            }
        }
    };
});