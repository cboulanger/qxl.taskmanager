function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.application.Standalone": {
        "require": true
      },
      "qxl.taskmanager.Manager": {},
      "qxl.taskmanager.demo.Manager": {},
      "qxl.taskmanager.Task": {},
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     Copyright: 2020 Christian Boulanger
  
     License: MIT license
  
     Authors: Christian Boulanger (cboulanger) info@bibliograph.org
  
  ************************************************************************ */

  /**
   * This is the main application class of "qxl.taskmanager"
   */
  qx.Class.define("qxl.taskmanager.demo.Application", {
    extend: qx.application.Standalone,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      /**
       * This method contains the initial application code and gets called
       * during startup of the application
       *
       * @lint ignoreDeprecated(alert)
       */
      main: function main() {
        // Call super class
        qxl.taskmanager.demo.Application.prototype.main.base.call(this); // Enable logging in debug variant

        // create task manager
        var manager = new qxl.taskmanager.Manager(); // create UI

        var managerUi = new qxl.taskmanager.demo.Manager(manager).set({
          width: 300,
          height: 500
        });
        this.getRoot().add(managerUi, {
          top: 50,
          left: 20
        });
        /**
         * Creates a fake task that last the given duration
         * @param {String} name Name of the task, description in UI
         * @param {Number} duration Duration of task in seconds
         * @param {Boolean} showProgress Whether to show a progressbar (0-100)
         * @return {Promise<unknown>}
         */

        function createTask(name, duration) {
          var showProgress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
          var task = new qxl.taskmanager.Task(name);
          var callback = showProgress ? function (value) {
            return task.setProgress(value);
          } : null;
          manager.add(task);
          return new Promise(function (resolve) {
            var interval = Math.round(duration * 1000) / 100;
            var progress = 0;
            var id = setInterval(function () {
              progress++;

              if (typeof callback == "function") {
                callback(progress);
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
          return new Promise(function (resolve) {
            return qx.event.Timer.once(resolve, null, ms);
          });
        } // run some random "tasks"


        _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var _loop, j;

          return regeneratorRuntime.wrap(function _callee$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(j) {
                    var promises, i, duration, showProgress, label;
                    return regeneratorRuntime.wrap(function _loop$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            promises = [];
                            i = 1;

                          case 2:
                            if (!(i <= 20)) {
                              _context.next = 12;
                              break;
                            }

                            duration = Math.round(Math.random() * 10);

                            showProgress = function () {
                              switch (j) {
                                case 1:
                                  return true;

                                case 2:
                                  return false;

                                default:
                                  return Math.random() > 0.5;
                              }
                            }();

                            label = showProgress ? "Progressing task #".concat(i, ", Duration: ").concat(duration, " seconds.") : "Blocking Task #".concat(i, ", Duration: ").concat(duration, " seconds.");
                            promises.push(createTask(label, duration, showProgress));
                            _context.next = 9;
                            return wait(Math.round(Math.random() * 1000));

                          case 9:
                            i++;
                            _context.next = 2;
                            break;

                          case 12:
                            _context.next = 14;
                            return Promise.all(promises);

                          case 14:
                            _context.next = 16;
                            return wait(1000);

                          case 16:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _loop);
                  });
                  j = 1;

                case 2:
                  if (!(j < 4)) {
                    _context2.next = 7;
                    break;
                  }

                  return _context2.delegateYield(_loop(j), "t0", 4);

                case 4:
                  j++;
                  _context2.next = 2;
                  break;

                case 7:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee);
        }))();
      }
    }
  });
  qxl.taskmanager.demo.Application.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Application.js.map?dt=1595098493616