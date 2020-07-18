qx.Class.define("qxl.taskmanager.Task",{
  extend: qx.core.Object,
  properties: {
    name: {
      check: "String",
      event: "changeName"
    },
    active: {
      check: "Boolean",
      apply: "_applyActive",
      event: "changeActive",
      init: true
    },
    status:{
      check: ["active", "inactive", "aborted", "done"],
      init: "active",
      apply: "_applyStatus",
      event: "changeStatus"
    },
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
    }
  }
});
