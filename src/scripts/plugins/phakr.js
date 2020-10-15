(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Phakr = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Components = void 0;

var _message = require("./message.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Components = /*#__PURE__*/function () {
  function Components(Cs) {
    _classCallCheck(this, Components);

    this._count = Cs.length;
    this._types = Cs;
  }

  _createClass(Components, [{
    key: "index",
    value: function index(C) {
      for (var i = 0; i < this._types.length; i++) {
        if (this._types[i] === C) return i;
      }

      throw new TypeError((0, _message.message)("unknown_component", C));
    }
  }, {
    key: "mask",
    value: function mask(C) {
      return 1 << this.index(C);
    }
  }, {
    key: "count",
    get: function get() {
      return this._count;
    }
  }, {
    key: "array",
    get: function get() {
      return this._types;
    }
  }]);

  return Components;
}();

exports.Components = Components;

},{"./message.js":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContiguousStorage = void 0;

var _utils = require("./utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ContiguousStorage = /*#__PURE__*/function () {
  function ContiguousStorage(components, capacity) {
    _classCallCheck(this, ContiguousStorage);

    if (capacity === void 0) {
      capacity = 0;
    }

    this._count = components.count;
    this._components = (0, _utils.arrayCreate)(this._count * capacity, null);
  }

  _createClass(ContiguousStorage, [{
    key: "get",
    value: function get(id, index) {
      return this._components[this._count * id + index];
    }
  }, {
    key: "set",
    value: function set(id, index, component) {
      this._components[this._count * id + index] = component;
    }
  }, {
    key: "delete",
    value: function _delete(id, index) {
      this.set(id, index, null);
    }
  }, {
    key: "destroy",
    value: function destroy(id) {
      (0, _utils.arrayFill)(this._components, null, this._count * id, this._count * (id + 1));
    }
  }, {
    key: "resize",
    value: function resize(capacity) {
      (0, _utils.arrayExpand)(this._components, this._count * capacity, null);
    }
  }]);

  return ContiguousStorage;
}();

exports.ContiguousStorage = ContiguousStorage;

},{"./utils.js":8}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Entity = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Entity = /*#__PURE__*/function () {
  function Entity(manager, id) {
    _classCallCheck(this, Entity);

    this._manager = manager;
    this._id = id;
  }

  _createClass(Entity, [{
    key: "add",
    value: function add(C) {
      this._manager._add(this._id, C);
    }
  }, {
    key: "remove",
    value: function remove(C) {
      this._manager._remove(this._id, C);
    }
  }, {
    key: "has",
    value: function has(C) {
      return this._manager._has(this._id, C);
    }
  }, {
    key: "get",
    value: function get(C) {
      return this._manager._get(this._id, C);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      return this._manager._destroy(this._id);
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "valid",
    get: function get() {
      return this._manager.valid(this);
    }
  }]);

  return Entity;
}();

exports.Entity = Entity;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityManager = void 0;

var _components = require("./components.js");

var _contiguous_storage = require("./contiguous_storage.js");

var _entity = require("./entity.js");

var _utils = require("./utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var INITIAL_CAPACITY = 1024;
var ENTITY_DEAD = 0;
var ENTITY_ALIVE = 1;

var EntityManager = /*#__PURE__*/function () {
  function EntityManager(components) {
    _classCallCheck(this, EntityManager);

    // Components storages
    this._components = components;
    this._storage = new _contiguous_storage.ContiguousStorage(components, components.count); // Entities storages

    this._entityFlag = new Uint8Array(INITIAL_CAPACITY);
    this._entityMask = new Uint32Array(INITIAL_CAPACITY);
    this._entityInst = (0, _utils.arrayCreate)(INITIAL_CAPACITY, null);
    this._entityPool = [];
    this._entityCounter = 0;
  }

  _createClass(EntityManager, [{
    key: "create",
    value: function create() {
      var id;

      if (this._entityPool.length > 0) {
        id = this._entityPool.pop();
      } else {
        id = this._entityCounter++;
        this._entityInst[id] = new _entity.Entity(this, id);

        this._accomodate(id);
      }

      var entity = this._entityInst[id];
      this._entityFlag[id] = ENTITY_ALIVE;
      return entity;
    }
  }, {
    key: "get",
    value: function get(id) {
      return this._entityInst[id];
    }
  }, {
    key: "query",
    value: function query(components) {
      if (typeof components == 'undefined' || components === null) {
        components = [];
      }

      var mask = 0;

      for (var i = 0; i < components.length; i++) {
        mask |= this._components.mask(components[i]);
      }

      if (mask === 0) {
        return [];
      }

      var result = [];

      for (var id = 0; id < this._entityCounter; id++) {
        if (this._entityFlag[id] === ENTITY_ALIVE && (this._entityMask[id] & mask) === mask) {
          result.push(this._entityInst[id]);
        }
      }

      return result;
    }
  }, {
    key: "valid",
    value: function valid(entity) {
      var id = entity._id;
      return this._entityFlag[id] === ENTITY_ALIVE && this._entityInst[id] === entity;
    }
  }, {
    key: "_accomodate",
    value: function _accomodate(id) {
      var capacity = this._entityFlag.length;

      if (capacity <= id) {
        capacity *= 2;
        this._entityFlag = (0, _utils.typedArrayExpand)(this._entityFlag, capacity);
        this._entityMask = (0, _utils.typedArrayExpand)(this._entityMask, capacity);
        this._entityInst = (0, _utils.arrayExpand)(this._entityInst, capacity, null);

        this._storage.resize(capacity);
      }
    }
  }, {
    key: "_add",
    value: function _add(id, component) {
      var ctor = component.constructor;

      var index = this._components.index(ctor);

      this._entityMask[id] |= 1 << index;

      this._storage.set(id, index, component);
    }
  }, {
    key: "_remove",
    value: function _remove(id, C) {
      var index = this._components.index(C);

      this._entityMask[id] &= ~(1 << index);

      this._storage["delete"](id, index);
    }
  }, {
    key: "_has",
    value: function _has(id, C) {
      var mask = this._components.mask(C);

      return (this._entityMask[id] & mask) !== 0;
    }
  }, {
    key: "_get",
    value: function _get(id, C) {
      var index = this._components.index(C);

      return this._storage.get(id, index);
    }
  }, {
    key: "_destroy",
    value: function _destroy(id) {
      if (this._entityFlag[id] === ENTITY_ALIVE) {
        this._entityFlag[id] = ENTITY_DEAD;
        this._entityMask[id] = 0;

        this._entityPool.push(id);

        this._storage.destroy(id);
      }
    }
  }, {
    key: "capacity",
    get: function get() {
      return this._entityFlag.length;
    }
  }]);

  return EntityManager;
}();

exports.EntityManager = EntityManager;

},{"./components.js":1,"./contiguous_storage.js":2,"./entity.js":3,"./utils.js":8}],5:[function(require,module,exports){
"use strict";

var _components = require("./components");

var _contiguous_storage = require("./contiguous_storage");

var _entity_manager = require("./entity_manager");

var _message = require("./message");

var _phakr = require("./phakr");

module.exports = {
  PhakrPlugin: _phakr.PhakrPlugin,
  PhakrSystem: _phakr.PhakrSystem
};

},{"./components":1,"./contiguous_storage":2,"./entity_manager":4,"./message":6,"./phakr":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.message = message;
var messages = {
  "too_many_components": "Too many components declared (only {0} allowed)",
  "unknown_component": "Unknown component type '{0}'",
  "invalid_entity": "Invalid entity '{0}'",
  "illegal_entity": "Illegal access to entity '{0}'",
  "realloc_performed": "Reallocation performed to handle {0} entities"
};

function message(type) {
  return messages[type].replace(/{(\d+)}/g, function (i) {
    return arguments[i + 1];
  });
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhakrPlugin = exports.PhakrSystem = void 0;

var _components = require("./components.js");

var _entity_manager = require("./entity_manager.js");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PhakrSystem = /*#__PURE__*/function () {
  function PhakrSystem(core, components) {
    _classCallCheck(this, PhakrSystem);

    this.core = core;
    this.components = new _components.Components(components);
  }

  _createClass(PhakrSystem, [{
    key: "update",
    value: function update(time, delta_t, entity) {}
  }, {
    key: "onRegister",
    value: function onRegister() {}
  }]);

  return PhakrSystem;
}();

exports.PhakrSystem = PhakrSystem;

var PhakrPlugin = function PhakrPlugin(scene) {
  this.scene = scene;
  this._systems = [];
  this.ecsmanager = null;

  if (!scene.sys.settings.isBooted) {
    scene.sys.events.once('boot', this.boot, this);
  }
};

exports.PhakrPlugin = PhakrPlugin;

PhakrPlugin.register = function (PluginManager) {
  PluginManager.register('PhakrPlugin', PhakrPlugin, 'phakr');
};

PhakrPlugin.prototype = {
  boot: function boot() {
    var eventEmitter = this.scene.sys.events;
    eventEmitter.on('update', this.update, this);
    eventEmitter.on('shutdown', this.shutdown, this);
    eventEmitter.on('destroy', this.destroy, this);
  },
  //  Called every Scene step - phase 2
  update: function update(time, delta) {
    var _iterator = _createForOfIteratorHelper(this._systems),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var system = _step.value;
        var entities = this.queryEntities(system.components);

        var _iterator2 = _createForOfIteratorHelper(entities),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var entity = _step2.value;
            system.update(time, delta, entity);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  },
  //  Called when a Scene shuts down, it may then come back again later (which will invoke the 'start' event) but should be considered dormant.
  shutdown: function shutdown() {},
  destroy: function destroy() {
    this.shutdown();
    this.scene = undefined;
  },
  setComponents: function setComponents(component_list) {
    var count = component_list.length;
    var Cs = new Array(count);

    for (var i = 0; i < Cs.length; i++) {
      Cs[i] = component_list[i];
    }

    var components = new _components.Components(Cs);
    this.ecsmanager = new _entity_manager.EntityManager(components);
  },
  createEntity: function createEntity(components) {
    var e = this.ecsmanager.create();

    for (var i = 0; i < components.length; i++) {
      e.add(components[i]);
    }

    return e;
  },
  queryEntities: function queryEntities(components) {
    return this.ecsmanager.query(components.array);
  },
  getEntity: function getEntity(id) {
    return this.ecsmanager.get(id);
  },
  valid: function valid(id) {
    return this.ecsmanager.valid(id);
  },
  registerSystem: function registerSystem(system) {
    if (this._systems.indexOf(system) >= 0) {
      throw "Cannot register a system twice";
    }

    this._systems.push(system);

    system.onRegister();
  },
  clearSystems: function clearSystems() {
    this._systems.clear();
  }
};
PhakrPlugin.prototype.constructor = PhakrPlugin;

},{"./components.js":1,"./entity_manager.js":4}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayCreate = arrayCreate;
exports.arrayExpand = arrayExpand;
exports.arrayFill = arrayFill;
exports.typedArrayExpand = typedArrayExpand;

// Arrays
// ------
function arrayCreate(length, value) {
  return arrayFill(new Array(length), value, 0, length);
}

function arrayExpand(source, length, value) {
  return arrayFill(source, value, source.length, length);
}

function arrayFill(target, value, start, end) {
  for (var i = start; i < end; i++) {
    target[i] = value;
  }

  return target;
} // Typed arrays
// ------------


function typedArrayExpand(source, length) {
  var SourceTypedArray = source.constructor;
  var target = new SourceTypedArray(length);
  target.set(source);
  return target;
}

},{}]},{},[5])(5)
});
