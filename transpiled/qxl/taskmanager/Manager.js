(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.data.Array": {
        "construct": true
      },
      "qx.core.Assert": {},
      "qxl.taskmanager.Task": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
   * A manager for {@link qxl.taskmanager.Task} objects. You can bind to the
   * (virtual) `tasks` and `activeTasks` properties, which are {@link qx.data.Array}
   * objects. `tasks` contains all tasks, `activeTasks` only those of which the
   * `active` property is `true`. The manager also has the virtual properties
   * `busy` (Boolean) and `progress` (Number) that can be bound to other qooxdoo
   * objects. The manager is "busy" if there are active tasks, and has a "progress"
   * value if any of the active tasks have a progress value.
   */
  qx.Class.define("qxl.taskmanager.Manager", {
    extend: qx.core.Object,
    events: {
      /**
       * Fired when a new task is added
       */
      "taskAdded": "qx.event.type.Data",

      /**
       * Fired when the overall progress of all active tasks changes
       */
      "changeProgress": "qx.event.type.Data",

      /**
       * Fired when the busy state of the manager changes
       */
      "changeBusy": "qx.event.type.Data"
    },

    /**
     * Constructor
     */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_3_0 = new qx.data.Array();
      this.__P_3_1 = new qx.data.Array();
    },
    members: {
      __P_3_2: false,
      __P_3_0: null,
      __P_3_1: null,
      __P_3_3: null,

      /**
       * Sets the busy state and fires data event if appropriate
       * @private
       */
      __P_3_4: function __P_3_4() {
        var value = Boolean(this.__P_3_1.getLength());

        if (this.__P_3_2 !== value) {
          this.fireDataEvent("changeBusy", value, this.__P_3_2);
          this.__P_3_2 = value;
        }
      },

      /**
       * Sets the overall progress of all active tasks and fires data
       * event if appropriate
       * @private
       */
      __P_3_5: function __P_3_5() {
        var num = 0;

        var value = this.__P_3_1.reduce(function (acc, item) {
          var progress = item.getProgress();

          if (progress !== null) {
            num++;
            return (acc || 0) + progress;
          }

          return acc;
        }, null);

        if (typeof value == "number") {
          value = Math.round(value / num);
        }

        if (this.__P_3_3 !== value) {
          this.fireDataEvent("changeProgress", value, this.__P_3_3);
          this.__P_3_3 = value;
        }
      },

      /**
       * Adds a task
       * @param {qxl.taskmanager.Task} task
       * @return {qxl.taskmanager.Manager} Returns instance for chaining
       */
      add: function add(task) {
        var _this = this;

        qx.core.Assert.assertInstance(task, qxl.taskmanager.Task);

        if (this.__P_3_0.includes(task)) {
          throw new Error("Task has already been added:" + task.getName());
        } // active state of the task


        task.addListener("changeActive", function (active) {
          if (active && !_this.__P_3_1.includes(task)) {
            _this.__P_3_1.push(task);
          } else if (!active && _this.__P_3_1.includes(task)) {
            _this.__P_3_1.remove(task);
          }

          _this.__P_3_4();
        });
        task.addListener("changeProgress", this.__P_3_5, this);

        this.__P_3_0.push(task);

        if (task.isActive()) {
          this.__P_3_1.push(task);
        }

        this.__P_3_4();

        this.__P_3_5();

        this.fireDataEvent("taskAdded", task);
        return this;
      },

      /**
       * Removes a task
       * @param {qxl.taskmanager.Task} task
       * @return {qxl.taskmanager.Task} The removed task, for easy disposal
       */
      remove: function remove(task) {
        qx.core.Assert.assertInstance(task, qxl.taskmanager.Task);

        if (task.isActive()) {
          this.__P_3_1.remove(task);
        }

        this.__P_3_0.remove(task);

        this.__P_3_4();

        return task;
      },

      /**
       * Getter for all tasks managed by this instance
       * @return {qx.data.Array} A qx data array with instances of {@link qxl.taskmanager.Task}
       */
      getTasks: function getTasks() {
        return this.__P_3_0;
      },

      /**
       * Getter for all active tasks managed by this instance
       * @return {qx.data.Array} A qx data array with instances of {@link qxl.taskmanager.Task}
       */
      getActiveTasks: function getActiveTasks() {
        return this.__P_3_1;
      },

      /**
       * Getter for pseudo-property busy, returns true if there is any active task in the manager
       * @return {Boolean}
       */
      getBusy: function getBusy() {
        return this.__P_3_2;
      },

      /**
       * Getter for pseudo-property progress. Returns null if all of the active tasks progress
       * is null. Computes the overall progress of all the non-null progress
       * active tasks.
       * @return {Number|null}
       */
      getProgress: function getProgress() {
        return this.__P_3_3;
      }
    },

    /**
     * Destructor
     */
    destruct: function destruct() {
      this._disposeObjects("__P_3_0", "__P_3_1");
    }
  });
  qxl.taskmanager.Manager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Manager.js.map?dt=1595453713783