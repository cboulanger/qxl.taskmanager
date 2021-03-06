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
 * An object representing a background task
 */
qx.Class.define("qxl.taskmanager.Task",{
  extend: qx.core.Object,
  properties: {
    /**
     * The name/description of the task
     */
    name: {
      check: "String",
      event: "changeName"
    },

    /**
     * Whether the task is active or not
     */
    active: {
      check: "Boolean",
      apply: "_applyActive",
      event: "changeActive",
      init: true
    },

    /**
     * The status of the task
     */
    status:{
      check: ["active", "inactive", "aborted", "done"],
      init: "active",
      apply: "_applyStatus",
      event: "changeStatus"
    },

    /**
     * The progress of the task. Null if the progress cannot be
     * determined.
     */
    progress: {
      check: value => {
        if ((value < 0 || value > 100) && value !== null) {
          throw new Error("Value must be null or between 0 and 100");
        }
        return true
      },
      nullable: true,
      event: "changeProgress"
    },

    /**
     * Arbitrary additional data
     */
    data: {
      init: null,
      nullable: true
    }
  },

  events: {
    /**
     * Fired when the task is aborted by calling the {@link #abort} method.
     */
    "abort" : "qx.event.type.Event",

    /**
     * Fired when the task is marked as done by calling the {@link #done} method.
     */
    "done" : "qx.event.type.Event",
  },

  /**
   * Constructor
   * @param {String} name
   * @param {*?} data
   */
  construct: function(name, data=null) {
    this.base(arguments);
    this.set({name, data});
  },

  members: {
    _applyActive(value) {
      this.setStatus(value ? "active": "inactive");
    },
    _applyStatus(value) {
      this.setActive(value === "active");
    },

    /**
     * Fires the "abort" event on the instance and sets the status of the task
     * to "aborted". Note that it is the responsibility of the application
     * to listen to this event (or, alternatively, to the "changeStatus"
     * event) and abort the "real" task that this instance represents.
     */
    abort() {
      this.fireEvent("aborted");
      this.setStatus("aborted");
    },

    /**
     * Fires the "done" event on the instance and sets the status of the task
     * to "done".
     */
    done() {
      this.fireEvent("done");
      this.setStatus("done");
    }
  }
});
