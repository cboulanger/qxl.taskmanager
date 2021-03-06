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
 * This is the main application class of "qxl.taskmanager"
 */
qx.Class.define("qxl.taskmanager.demo.Application",
{
  extend : qx.application.Standalone,
  members :
  {
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      // create task manager
      const manager = new qxl.taskmanager.Manager();

      // create UI
      const container = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
      container.set({width:300});
      let title = (new qx.ui.basic.Label()).set({rich:true});
      let libInfo = qx.$$environment["qx.libraryInfoMap"]["qxl.taskmanager"];
      let sourcePath = "tree/master/source/class/qxl/taskmanager/demo/";
      title.setValue(`<h1>${libInfo.name}</h1>
        <p>${libInfo.description}</p>
        <p>The source code of this demo can be found
          <a target="_blank" href="${libInfo.homepage}/${sourcePath}">here.</a>
        </p>`);
      container.add(title);
      const managerUi = (new qxl.taskmanager.demo.Manager(manager)).set({height: 500});
      container.add(managerUi, {flex:1});
      this.getRoot().add( container, {top: 50, left: 20});

      /**
       * Creates a fake task that last the given duration
       * @param {String} name Name of the task, description in UI
       * @param {Number} duration Duration of task in seconds
       * @param {Boolean} showProgress Whether to show a progressbar (0-100)
       * @return {Promise<void>}
       */
      function createTask(name, duration, showProgress=true) {
        let task = new qxl.taskmanager.Task(name);
        let callback = showProgress ? value => task.setProgress(value) : null;
        manager.add(task);
        return new Promise(resolve => {
          let interval = Math.round(duration*1000)/100;
          let progress = 0;
          let id = setInterval(() => {
            progress++;
            if (typeof callback == "function") {
              callback(progress)
            }
            if (progress === 100) {
              clearInterval(id);
              manager.remove(task);
              resolve();
            }
          }, interval);
        });
      }

      /**
       * Waits the given duration
       * @param {Number} ms Duration in milliseconds
       * @return {Promise<unknown>}
       */
      function wait(ms) {
        return new Promise(resolve => qx.event.Timer.once(resolve,null,ms));
      }

      // run some random "tasks"
      (async ()=>{
        for (let j=1; j<4; j++) {
          let promises = [];
          for (let i=1; i<=20; i++) {
            let duration = Math.round(Math.random()*10);
            let showProgress = (()=>{
              switch(j) {
                case 1: return true;
                case 2: return false;
                default: return Math.random()>0.5;
              }
            })();
            let label = showProgress
              ? `Progressing task #${i}, Duration: ${duration} seconds.`
              : `Blocking Task #${i}, Duration: ${duration} seconds.`;
            promises.push(createTask(label, duration, showProgress));
            await wait(Math.round(Math.random()*1000));
          }
          await Promise.all(promises);
          await wait(1000);
        }
      })();
    }
  }
});
