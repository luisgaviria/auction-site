(self["webpackChunkauction_site_client"] = self["webpackChunkauction_site_client"] || []).push([["src_components_layout_newRepo_js"],{

/***/ "./src/components/layout/Map.js":
/*!**************************************!*\
  !*** ./src/components/layout/Map.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var recompose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! recompose */ "../node_modules/recompose/es/Recompose.js");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! node-fetch */ "../node_modules/node-fetch/browser.js");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_google_maps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-google-maps */ "../node_modules/react-google-maps/lib/index.js");
/* harmony import */ var _mapStyles_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mapStyles.js */ "./src/components/layout/mapStyles.js");
/* harmony import */ var _photos_auction_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./photos/auction.png */ "./src/components/layout/photos/auction.png");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _jsxFileName = "/Users/luisgaviria/challenges/auction-site/client/src/components/layout/Map.js",
    _this = undefined;



function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var MyMapComponent = (0,recompose__WEBPACK_IMPORTED_MODULE_2__.compose)((0,recompose__WEBPACK_IMPORTED_MODULE_2__.withProps)({
  googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC7idetxYH3xqundQWiHiQ3PNtXxW7-ygY",
  loadingElement: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    style: {
      height: "100%"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 21
    }
  }),
  containerElement: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    style: {
      height: "480px"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 23
    }
  }),
  mapElement: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    style: {
      height: "100%"
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 17
    }
  })
}), react_google_maps__WEBPACK_IMPORTED_MODULE_4__.withScriptjs, react_google_maps__WEBPACK_IMPORTED_MODULE_4__.withGoogleMap)(function (props) {
  var _React$useState = react__WEBPACK_IMPORTED_MODULE_1__.useState({
    directions: []
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      updateState = _React$useState2[1];

  var forceUpdate = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(function () {
    return updateState(_objectSpread({}, state));
  }, []);

  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_1__.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      selected = _React$useState4[0],
      setSelected = _React$useState4[1];

  var options = {
    styles: _mapStyles_js__WEBPACK_IMPORTED_MODULE_5__.default,
    disableDefaultUI: true,
    zoomControl: true
  };
  var mapRef = react__WEBPACK_IMPORTED_MODULE_1__.useRef();
  var onMapLoad = react__WEBPACK_IMPORTED_MODULE_1__.useCallback(function (map) {
    mapRef.current = map;
  }, []); // const onClick = (location, myPosition) => {
  //   // const DirectionsService = new google.maps.DirectionsService();
  //   // console.log(myPosition);
  //   // //console.log(location);
  //   // DirectionsService.route(
  //   //   {
  //   //     origin: new google.maps.LatLng(42.42143, -71.1363),
  //   //     destination: new google.maps.LatLng(location.lat, location.lng),
  //   //     travelMode: google.maps.TravelMode.DRIVING,
  //   //   },
  //   //   (result, status) => {
  //   //     if (status === google.maps.DirectionsStatus.OK) {
  //   //       updateState({ directions: result });
  //   //     } else {
  //   //       console.error(`error fetching directions ${result}`);
  //   //     }
  //   //   }
  //   // );
  // };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_google_maps__WEBPACK_IMPORTED_MODULE_4__.GoogleMap, {
    defaultZoom: 8,
    center: props.auctions[0] ? props.auctions[0].location : {
      lat: 42.361145,
      lng: -72.057083
    },
    defaultCenter: {
      lat: 42.361145,
      lng: -72.057083
    },
    onIdle: function onIdle() {
      return forceUpdate();
    },
    options: options,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 5
    }
  }, props.auctions.map(function (auction, index) {
    console.log(auction);
    return props.isMarkerShown ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_google_maps__WEBPACK_IMPORTED_MODULE_4__.Marker, {
      key: index,
      position: auction.location,
      icon: {
        url: _photos_auction_png__WEBPACK_IMPORTED_MODULE_6__.default,
        scaledSize: new window.google.maps.Size(48, 48),
        origin: new window.google.maps.Point(0, 0) // anchor: new window.google.maps.Point(15, 15),

      },
      onClick: function onClick() {
        setSelected(auction);
      } // onMouseOver={() => {
      //   console.log(auction);
      // }}
      ,
      __self: _this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 83,
        columnNumber: 11
      }
    }) : null;
  }), selected ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_google_maps__WEBPACK_IMPORTED_MODULE_4__.InfoWindow, {
    position: {
      lat: selected.location.lat,
      lng: selected.location.lng
    },
    onCloseClick: function onCloseClick() {
      setSelected(null);
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 9
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 11
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h4", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 109,
      columnNumber: 13
    }
  }, selected.address), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h4", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 110,
      columnNumber: 13
    }
  }, selected.status), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h4", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 13
    }
  }, selected.deposit))) : null, props.directions && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_google_maps__WEBPACK_IMPORTED_MODULE_4__.DirectionsRenderer, {
    directions: state.directions,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 122,
      columnNumber: 28
    }
  }));
});

var MyFancyComponent = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(MyFancyComponent, _React$PureComponent);

  var _super = _createSuper(MyFancyComponent);

  function MyFancyComponent(props) {
    var _this2;

    _classCallCheck(this, MyFancyComponent);

    _this2 = _super.call(this, props);
    _this2.state = {
      isMarkerShown: false,
      auctions: []
    };

    _this2.onClickEvent.bind(_assertThisInitialized(_this2));

    return _this2;
  }

  _createClass(MyFancyComponent, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var response, errorMessage, error, body, auctions;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return node_fetch__WEBPACK_IMPORTED_MODULE_3___default()("/api/v1/crawl");

              case 3:
                response = _context2.sent;

                if (response.ok) {
                  _context2.next = 8;
                  break;
                }

                errorMessage = "".concat(response.status, " (").concat(response.statusText, ")");
                error = new Error(errorMessage);
                throw error;

              case 8:
                _context2.next = 10;
                return response.json();

              case 10:
                body = _context2.sent;
                auctions = [];
                body.allAuctions.map(function (auction) {
                  // console.log(auction);
                  var location = {
                    lat: parseFloat(auction.lat),
                    lng: parseFloat(auction.lng)
                  };
                  auctions.push({
                    location: location,
                    address: auction.address,
                    deposit: auction.deposit,
                    status: auction.status
                  });
                });
                _context2.next = 15;
                return navigator.geolocation.getCurrentPosition( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee(position) {
                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            auctions.push({
                              location: {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                              }
                            });

                          case 1:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 15:
                this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
                  auctions: auctions,
                  directions: []
                }));
                _context2.next = 21;
                break;

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 18]]);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "onClickEvent",
    value: function onClickEvent(location, myPosition) {}
    /*componentWillReceiveProps() {
      console.log(this.props.addresses);
      this.setState({
        ...this.state,
          positions: this.props.addresses
      })
    }*/

  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(MyMapComponent, {
        isMarkerShown: true,
        onClickEvent: this.onClickEvent,
        auctions: this.state.auctions,
        directions: this.state.directions,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 186,
          columnNumber: 7
        }
      });
    }
  }]);

  return MyFancyComponent;
}(react__WEBPACK_IMPORTED_MODULE_1__.PureComponent);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyFancyComponent);

/***/ }),

/***/ "./src/components/layout/mapStyles.js":
/*!********************************************!*\
  !*** ./src/components/layout/mapStyles.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{
  featureType: "water",
  elementType: "geometry.fill",
  stylers: [{
    color: "#d3d3d3"
  }]
}, {
  featureType: "transit",
  stylers: [{
    color: "#808080"
  }, {
    visibility: "off"
  }]
}, {
  featureType: "road.highway",
  elementType: "geometry.stroke",
  stylers: [{
    visibility: "on"
  }, {
    color: "#b3b3b3"
  }]
}, {
  featureType: "road.highway",
  elementType: "geometry.fill",
  stylers: [{
    color: "#ffffff"
  }]
}, {
  featureType: "road.local",
  elementType: "geometry.fill",
  stylers: [{
    visibility: "on"
  }, {
    color: "#ffffff"
  }, {
    weight: 1.8
  }]
}, {
  featureType: "road.local",
  elementType: "geometry.stroke",
  stylers: [{
    color: "#d7d7d7"
  }]
}, {
  featureType: "poi",
  elementType: "geometry.fill",
  stylers: [{
    visibility: "on"
  }, {
    color: "#ebebeb"
  }]
}, {
  featureType: "administrative",
  elementType: "geometry",
  stylers: [{
    color: "#a7a7a7"
  }]
}, {
  featureType: "road.arterial",
  elementType: "geometry.fill",
  stylers: [{
    color: "#ffffff"
  }]
}, {
  featureType: "road.arterial",
  elementType: "geometry.fill",
  stylers: [{
    color: "#ffffff"
  }]
}, {
  featureType: "landscape",
  elementType: "geometry.fill",
  stylers: [{
    visibility: "on"
  }, {
    color: "#efefef"
  }]
}, {
  featureType: "road",
  elementType: "labels.text.fill",
  stylers: [{
    color: "#696969"
  }]
}, {
  featureType: "administrative",
  elementType: "labels.text.fill",
  stylers: [{
    visibility: "on"
  }, {
    color: "#737373"
  }]
}, {
  featureType: "poi",
  elementType: "labels.icon",
  stylers: [{
    visibility: "off"
  }]
}, {
  featureType: "poi",
  elementType: "labels",
  stylers: [{
    visibility: "off"
  }]
}, {
  featureType: "road.arterial",
  elementType: "geometry.stroke",
  stylers: [{
    color: "#d6d6d6"
  }]
}, {
  featureType: "road",
  elementType: "labels.icon",
  stylers: [{
    visibility: "off"
  }]
}, {}, {
  featureType: "poi",
  elementType: "geometry.fill",
  stylers: [{
    color: "#dadada"
  }]
}]);

/***/ }),

/***/ "./src/components/layout/newRepo.js":
/*!******************************************!*\
  !*** ./src/components/layout/newRepo.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Map */ "./src/components/layout/Map.js");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/es/Helmet.js");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! node-fetch */ "../node_modules/node-fetch/browser.js");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "/Users/luisgaviria/challenges/auction-site/client/src/components/layout/newRepo.js",
    _this = undefined;



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var NewRepoTile = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.lazy(function () {
  return __webpack_require__.e(/*! import() */ "src_components_layout_newRepoTile_js").then(__webpack_require__.bind(__webpack_require__, /*! ./newRepoTile.js */ "./src/components/layout/newRepoTile.js"));
});
 //import Geocode from "react-geocode";
// import NewRepoTile from "./newRepoTile.js";

var RepoList = function RepoList(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    repo: [],
    addresses: []
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var getRepo = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var response, errorMessage, error, body;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return node_fetch__WEBPACK_IMPORTED_MODULE_4__("/api/v1/crawl");

            case 3:
              response = _context.sent;

              if (response.ok) {
                _context.next = 8;
                break;
              }

              errorMessage = "".concat(response.status, " (").concat(response.statusText, ")");
              error = new Error(errorMessage);
              throw error;

            case 8:
              console.log(response.body);
              _context.next = 11;
              return response.json();

            case 11:
              body = _context.sent;
              setState(_objectSpread(_objectSpread({}, state), {}, {
                repo: body.allAuctions
              }));
              _context.next = 18;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              console.error("Error in fetch: ".concat(_context.t0.message));

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 15]]);
    }));

    return function getRepo() {
      return _ref.apply(this, arguments);
    };
  }();

  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    getRepo();
  }, []);
  var repoListItems = state.repo.map(function (repoItem, i) {
    if (repoItem.date) {
      if (repoItem.status) {
        if (!repoItem.status.toUpperCase().includes("SOLD") && !repoItem.date.toUpperCase().includes("SOLD") && !repoItem.status.toUpperCase().includes("CANCEL")) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(NewRepoTile, {
            key: i,
            repoData: repoItem,
            user: props.user,
            __self: _this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 47,
              columnNumber: 18
            }
          });
        }
      } else {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(NewRepoTile, {
          key: i,
          repoData: repoItem,
          user: props.user,
          __self: _this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 50,
            columnNumber: 16
          }
        });
      }
    }
  });

  var refreshDatabaseHandleClickButton = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return node_fetch__WEBPACK_IMPORTED_MODULE_4__("/api/v1/crawl/scrap");

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function refreshDatabaseHandleClickButton() {
      return _ref2.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react_helmet__WEBPACK_IMPORTED_MODULE_3__.Helmet, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    charSet: "utf-8",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("meta", {
    name: "description",
    content: "Auction Website",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 9
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("title", {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 9
    }
  }, "Auction and Company")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "map",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Map__WEBPACK_IMPORTED_MODULE_2__.default, {
    alt: "map, centered in the Mass area, markers displayed on each auction location.",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 67,
      columnNumber: 9
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "button-container",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("a", {
    className: "button large secondary ",
    onClick: refreshDatabaseHandleClickButton,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 9
    }
  }, "Refresh Auctions")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "list-item",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 7
    }
  }, repoListItems));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RepoList);

/***/ }),

/***/ "./src/components/layout/photos/auction.png":
/*!**************************************************!*\
  !*** ./src/components/layout/photos/auction.png ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "ec371d8c8a1c970b720988bc4e9f6beb.png");

/***/ })

}]);
//# sourceMappingURL=src_components_layout_newRepo_js.bundle.js.map