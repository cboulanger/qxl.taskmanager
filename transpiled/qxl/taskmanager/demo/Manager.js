(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.VBox": {
        "construct": true
      },
      "qx.ui.layout.HBox": {},
      "qx.ui.basic.Atom": {},
      "qx.ui.indicator.ProgressBar": {},
      "qx.ui.list.List": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * @asset(qxl/taskmanager/*)
   */
  qx.Class.define("qxl.taskmanager.demo.Manager", {
    extend: qx.ui.container.Composite,
    construct: function construct(manager) {
      qx.ui.container.Composite.constructor.call(this);
      this.__P_4_0 = manager;
      this.setLayout(new qx.ui.layout.VBox(5));
      this.add(this.__P_4_1());
      this.__P_4_2 = this.__P_4_3();
      this.add(this.__P_4_2, {
        flex: 1
      });
    },
    members: {
      __P_4_0: null,
      __P_4_2: null,
      __P_4_1: function __P_4_1() {
        var hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
        var busyAtom = new qx.ui.basic.Atom();

        this.__P_4_0.addListener("changeBusy", function (evt) {
          var value = evt.getData();
          busyAtom.setIcon("qxl/taskmanager/" + (value ? "red" : "green") + ".png");
          busyAtom.setLabel(value ? "Busy" : "Idle");

          if (!value) {
            overallProgress.setValue(0);
          }
        });

        hbox.add(busyAtom);
        var overallProgress = new qx.ui.indicator.ProgressBar();

        this.__P_4_0.bind("progress", overallProgress, "value", {
          converter: function converter(value) {
            if (typeof value == "number") {
              busyAtom.setLabel("".concat(value, "% done"));
            }

            overallProgress.setEnabled(value !== null);
            return Number(value);
          }
        });

        hbox.add(overallProgress, {
          flex: 1
        });
        return hbox;
      },
      __P_4_3: function __P_4_3() {
        var list = new qx.ui.list.List().set({
          labelPath: "label"
        });
        var delegate = {
          // create a list item
          createItem: function createItem() {
            var container = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
            container.add(new qx.ui.basic.Atom(), {
              flex: 1
            });
            container.add(new qx.ui.indicator.ProgressBar().set({
              width: 50
            }));
            return container;
          },
          bindItem: function bindItem(controller, item, id) {
            // bind label
            controller.bindProperty("name", "label", {}, item.getChildren()[0], id); // bind progress if any

            controller.bindProperty("progress", "visibility", {
              converter: function converter(value) {
                return value === null ? "excluded" : "visible";
              }
            }, item.getChildren()[1], id);
            controller.bindProperty("progress", "value", {
              converter: function converter(value) {
                return Number(value);
              }
            }, item.getChildren()[1], id); // show inactive tasks as disabled

            controller.bindProperty("active", "enabled", {}, item, id);
          }
        }; // sets the delegate to the list

        list.setDelegate(delegate);
        list.setModel(this.__P_4_0.getTasks());
        return list;
      }
    }
  });
  qxl.taskmanager.demo.Manager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Manager.js.map?dt=1595098494259