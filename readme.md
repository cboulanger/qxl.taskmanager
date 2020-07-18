# qxl.taskmanager

![Build and Deploy](https://github.com/cboulanger/qxl.taskmanager/workflows/Build%20and%20Deploy/badge.svg)

A qooxdoo package providing a manager for objects representing real tasks which
are running in the background of the application. The manager offers bindable
properties and events that allow you to visualize the progress of the task(s)
or to determine the busy/idle state of the application. 

You can bind to the (virtual) `tasks` and `activeTasks` properties
of the manager, which are `qx.data.Array` objects. `tasks` contains
all tasks, `activeTasks` only those of which the `active` property
is `true`. The manager also has the virtual properties `busy`
(Boolean) and `progress` (Number) that can be bound to other qooxdoo
objects. The manager is "busy" if there are active tasks, and has a
"progress" value if any of the active tasks have a progress value.

For an example how to use the manager for creating a visual representation of 
running tasks, have a look at the classes in the [demo
application](source/class/qxl/taskmanager/demo/). A live version
of the demo can be found at https://cboulanger.github.io/qxl.taskmanager

## Installation 

To run the standalone demo and to develop the library, execute

```
npm install --no-save --no-package-lock @qooxdoo/compiler
npx qx serve
```
