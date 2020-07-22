(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.Appearance": {
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
  qx.Theme.define("qxl.taskmanager.theme.Appearance", {
    extend: qx.theme.indigo.Appearance,
    appearances: {}
  });
  qxl.taskmanager.theme.Appearance.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Appearance.js.map?dt=1595453604343