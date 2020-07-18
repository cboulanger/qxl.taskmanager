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
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qxl.taskmanager.Task", {
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
      status: {
        check: ["active", "inactive", "aborted", "done"],
        init: "active",
        apply: "_applyStatus",
        event: "changeStatus"
      },
      progress: {
        check: function check(value) {
          if ((value < 0 || value > 100) && value !== null) {
            throw new Error("Value must be null or between 0 and 100");
          }

          return true;
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
    construct: function construct(name) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      qx.core.Object.constructor.call(this);
      this.set({
        name: name,
        data: data
      });
    },
    members: {
      _applyActive: function _applyActive(value) {
        this.setStatus(value ? "active" : "inactive");
      },
      _applyStatus: function _applyStatus(value) {
        this.setActive(value === "active");
      }
    }
  });
  qxl.taskmanager.Task.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Task.js.map?dt=1595098494300