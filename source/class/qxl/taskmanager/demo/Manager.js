/* ************************************************************************

   qxl.taskmanager

   Copyright:
     2020 Christian Boulanger

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/**
 * The manager widget
 * @asset(qxl/taskmanager/*)
 */
qx.Class.define("qxl.taskmanager.demo.Manager", {
  extend: qx.ui.container.Composite,
  construct: function (manager) {
    this.base(arguments);
    this.__manager = manager;
    this.setLayout(new qx.ui.layout.VBox(5));
    this.add(this.__createStatusBar());
    this.__list = this.__createTaskList();
    this.add(this.__list, {flex: 1});
  },
  members: {
    __manager: null,
    __list: null,
    __createStatusBar() {
      let hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
      let busyAtom = new qx.ui.basic.Atom();
      this.__manager.addListener("changeBusy", evt => {
        let value = evt.getData();
        busyAtom.setIcon("qxl/taskmanager/" + (value ? "red" : "green") + ".png");
        busyAtom.setLabel(value ? "Busy" : "Idle");
        if (!value) {
          overallProgress.setValue(0);
        }
      });
      hbox.add(busyAtom);
      let overallProgress = new qx.ui.indicator.ProgressBar();
      this.__manager.bind("progress", overallProgress, "value", {
        converter: value => {
          if (typeof value == "number") {
            busyAtom.setLabel(`${value}% done`);
          }
          overallProgress.setEnabled(value !== null);
          return Number(value);
        }
      });
      hbox.add(overallProgress, {flex: 1});
      return hbox;
    },
    __createTaskList() {
      let list = new qx.ui.list.List().set({
        labelPath: "label"
      });
      var delegate = {
        // create a list item
        createItem : function() {
          let container = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
          container.add(new qx.ui.basic.Atom(), {flex:1});
          container.add(new qx.ui.indicator.ProgressBar().set({width:50}))
          return container;
        },
        bindItem : function(controller, item, id) {
          // bind label
          controller.bindProperty("name", "label", {}, item.getChildren()[0], id);
          // bind progress if any
          controller.bindProperty("progress", "visibility", {
            converter: value => value === null ? "excluded" : "visible"
          }, item.getChildren()[1], id);
          controller.bindProperty("progress", "value", {
            converter: value => Number(value)
          }, item.getChildren()[1], id);
          // show inactive tasks as disabled
          controller.bindProperty("active", "enabled", {}, item, id);
        }
      };
      list.setDelegate(delegate);
      list.setModel(this.__manager.getTasks());
      return list;
    }
  }
});
