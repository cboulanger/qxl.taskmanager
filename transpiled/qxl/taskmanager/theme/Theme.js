(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.taskmanager.theme.Color": {
        "require": true
      },
      "qxl.taskmanager.theme.Decoration": {
        "require": true
      },
      "qxl.taskmanager.theme.Font": {
        "require": true
      },
      "qx.theme.icon.Tango": {
        "require": true
      },
      "qxl.taskmanager.theme.Appearance": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     Copyright: 2020 Christian Boulanger
  
     License: MIT license
  
     Authors: Christian Boulanger (cboulanger) info@bibliograph.org
  
  ************************************************************************ */
  qx.Theme.define("qxl.taskmanager.theme.Theme", {
    meta: {
      color: qxl.taskmanager.theme.Color,
      decoration: qxl.taskmanager.theme.Decoration,
      font: qxl.taskmanager.theme.Font,
      icon: qx.theme.icon.Tango,
      appearance: qxl.taskmanager.theme.Appearance
    }
  });
  qxl.taskmanager.theme.Theme.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Theme.js.map?dt=1595453713337