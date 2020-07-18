qx.Class.define("qxl.taskmanager.Task",{
  extend: qx.core.Object,
  properties: {
    name: {
      check: "String",
      event: "changeName"
    },

    active: {
      check: "Boolean",
      apply: "_applyActive"
    },

    status:{
      check: ["active", "inactive", "aborted", "done"],
      init: "active",
      apply: "_applyStatus"
    },

    progress: {
      check: value => {
        if ((value < 0 || value > 100) && value !== null) {
          throw new Error("Value must be null or between 0 and 100");
        }
        return true
      },
      nullable: true
    },

    data: {
      init: null
    }

  },
  construct: function(name){
    this.base(arguments);

  },
  members: {
    _applyActive(value) {
      this.setStatus(value ? "active": "inactive");
    },

    _applyStatus(value) {
      this.setActive(status === "active");
    }
  }
});
