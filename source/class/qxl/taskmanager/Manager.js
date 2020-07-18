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
qx.Class.define("qxl.taskmanager.Manager",{
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
  construct: function(){
    this.base(arguments);
    this.__tasks = new qx.data.Array();
    this.__activeTasks = new qx.data.Array();
  },

  members: {
    __busy: false,
    __tasks: null,
    __activeTasks: null,
    __progress: null,

    /**
     * Sets the busy state and fires data event if appropriate
     * @private
     */
    __setBusy() {
      let value = Boolean(this.__activeTasks.getLength());
      if (this.__busy !== value) {
        this.fireDataEvent("changeBusy", value, this.__busy);
        this.__busy = value;
      }
    },

    /**
     * Sets the overall progress of all active tasks and fires data
     * event if appropriate
     * @private
     */
    __setProgress() {
      let num = 0;
      let value = this.__activeTasks.reduce((acc, item) => {
        let progress = item.getProgress();
        if ( progress !== null) {
          num++;
          return (acc || 0) + progress;
        }
        return acc;
      }, null);
      if (typeof value == "number") {
        value = Math.round(value/num);
      }
      if (this.__progress !== value) {
        this.fireDataEvent("changeProgress", value, this.__progress);
        this.__progress = value;
      }
    },

    /**
     * Adds a task
     * @param {qxl.taskmanager.Task} task
     * @return {qxl.taskmanager.Manager} Returns instance for chaining
     */
    add(task) {
      qx.core.Assert.assertInstance(task, qxl.taskmanager.Task);
      if (this.__tasks.includes(task)) {
        throw new Error("Task has already been added:" +  task.getName());
      }
      // active state of the task
      task.addListener("changeActive", active => {
        if (active && !this.__activeTasks.includes(task)) {
          this.__activeTasks.push(task);
        } else if (!active && this.__activeTasks.includes(task)) {
          this.__activeTasks.remove(task);
        }
        this.__setBusy();
      });
      task.addListener("changeProgress", this.__setProgress, this);
      this.__tasks.push(task);
      if (task.isActive()) {
        this.__activeTasks.push(task);
      }
      this.__setBusy();
      this.__setProgress();
      this.fireDataEvent("taskAdded", task);
      return this;
    },

    /**
     * Removes a task
     * @param {qxl.taskmanager.Task} task
     * @return {qxl.taskmanager.Task} The removed task, for easy disposal
     */
    remove(task) {
      qx.core.Assert.assertInstance(task, qxl.taskmanager.Task);
      if (task.isActive()) {
        this.__activeTasks.remove(task);
      }
      this.__tasks.remove(task);
      this.__setBusy();
      return task;
    },

    /**
     * Getter for all tasks managed by this instance
     * @return {qx.data.Array} A qx data array with instances of {@link qxl.taskmanager.Task}
     */
    getTasks() {
      return this.__tasks;
    },

    /**
     * Getter for all active tasks managed by this instance
     * @return {qx.data.Array} A qx data array with instances of {@link qxl.taskmanager.Task}
     */
    getActiveTasks() {
      return this.__activeTasks;
    },

    /**
     * Getter for pseudo-property busy, returns true if there is any active task in the manager
     * @return {Boolean}
     */
    getBusy() {
      return this.__busy;
    },

    /**
     * Getter for pseudo-property progress. Returns null if all of the active tasks progress
     * is null. Computes the overall progress of all the non-null progress
     * active tasks.
     * @return {Number|null}
     */
    getProgress() {
      return this.__progress;
    }
  },

  /**
   * Destructor
   */
  destruct: function () {
    this._disposeObjects("__tasks","__activeTasks");
  }
});
