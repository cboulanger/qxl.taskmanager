(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.Color": {
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
  qx.Theme.define("qxl.taskmanager.theme.Color", {
    extend: qx.theme.indigo.Color,
    colors: {}
  });
  qxl.taskmanager.theme.Color.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Color.js.map?dt=1595453714348