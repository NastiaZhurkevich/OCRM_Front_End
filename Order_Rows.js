define("OrderSectionV2", ["OrderConfigurationConstants"], function (OrderConfigurationConstants) {
    return {
        entitySchemaName: "Order",
        details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
        diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,
        methods: {
            isRunning: function (activeRowId) {
                var gridData = this.get("GridData");
                var selectedOrder = gridData.get(activeRowId);
                var selectedOrderStatus = selectedOrder.get("Status");
                return selectedOrderStatus.value === OrderConfigurationConstants.Order.OrderStatus.InPlanned;
            },

            isCustomActionEnabled: function () {
                var activeRowId = this.get("ActiveRow");
                return activeRowId ? this.isRunning(activeRowId) : false;
            },
            showOrderInfo: function () {
                var activeRowId = this.get("ActiveRow");
                var gridData = this.get("GridData");
                var dueData = gridData.get(activeRowId).get("CreatedOn");
                this.showInformationDialog(dueData);
            },
            getSectionActions: function () {
                var actionMenuItems = this.callParent(arguments);

                actionMenuItems.addItem(this.getButtonMenuItem({
                    Type: "Terrasoft.MenuSeparator",
                    Caption: ""
                }));

                actionMenuItems.addItem(this.getButtonMenuItem({
                    "Caption": { bindTo: "Resources.Strings.CreationDateActionCapiton" },
                    "Click": { bindTo: "showOrderInfo" },
                    "Enabled": { bindTo: "isCustomActionEnabled" }
                }));

                return actionMenuItems;


            }


        }
    };
});