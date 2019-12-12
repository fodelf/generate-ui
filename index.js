#!/usr/bin/env node
/*
 * @Description: 描述
 * @Author: 吴文周
 * @Github: http://gitlab.yzf.net/wuwenzhou
 * @Date: 2019-11-25 08:46:03
 * @LastEditors: 吴文周
 * @LastEditTime: 2019-11-26 17:30:59
 * @鸣谢live-serve
 */
const open = require('opn')
const os = require('os')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const proxyMid = require('http-proxy-middleware')
const chalk = require('chalk')
const API = require('./server/api')

var GenerateServer = {
  server: null,
  watcher: null,
  logLevel: 2
};
/**
 * Start a live server with parameters given as an object
 * @param host {string} Address to bind to (default: 0.0.0.0)
 * @param port {number} Port number (default: 8080)
 * @param open {(string|string[])} Subpath(s) to open in browser, use false to suppress launch (default: server root)
 * @param middleware {array} Append middleware to stack, e.g. [function(req, res, next) { next(); }].
 */
GenerateServer.start = function (options) {
  options = options || {};
  var host = ' http://localhost';
  var port = options.port !== undefined ? options.port : 8080; // 0 means random
  var proxy = options.proxy || {};
  var middleware = options.middleware || [];
  const server = express()
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json({ 'limit': '5000000kb' }))
  server.use(express.static(path.join(__dirname, 'dist')))
  API(server)
  for (let k in proxy) {
    var options = proxy[k]
    var exampleProxy = proxyMid(options)
    server.use(k, exampleProxy)
  }
  // Add middleware
  // middleware.map(function (mw) {
  //   if (typeof mw === "string") {
  //     var ext = path.extname(mw).toLocaleLowerCase();
  //     if (ext !== ".js") {
  //       mw = require(path.join(__dirname, "middleware", mw + ".js"));
  //     } else {
  //       mw = require(mw);
  //     }
  //   }
  //   app.use(mw);
  // });

  // proxy.forEach(function (proxyRule) {
  //   var proxyOpts = url.parse(proxyRule[1]);
  //   proxyOpts.via = true;
  //   proxyOpts.preserveHost = true;
  //   app.use(proxyRule[0], require('proxy-middleware')(proxyOpts));
  //   if (GenerateServer.logLevel >= 1)
  //     console.log('Mapping %s to "%s"', proxyRule[0], proxyRule[1]);
  // });
  // Handle server startup errors
  server.addListener('error', function (e) {
    if (e.code === 'EADDRINUSE') {
      var serveURL = protocol + '://' + host + ':' + port;
      console.log('%s is already in use. Trying another port.'.yellow, serveURL);
      setTimeout(function () {
        server.listen(0, host);
      }, 1000);
    } else {
      console.error(e.toString().red);
      GenerateServer.shutdown();
    }
  });

  // Handle successful server
  server.addListener('listening', function (/*e*/) {
    GenerateServer.server = server;

    var address = server.address();
    var serveHost = address.address === "0.0.0.0" ? "127.0.0.1" : address.address;
    var openHost = host === "0.0.0.0" ? "127.0.0.1" : host;

    var serveURL = protocol + '://' + serveHost + ':' + address.port;
    var openURL = protocol + '://' + openHost + ':' + address.port;

    var serveURLs = [serveURL];
    if (GenerateServer.logLevel > 2 && address.address === "0.0.0.0") {
      var ifaces = os.networkInterfaces();
      serveURLs = Object.keys(ifaces)
        .map(function (iface) {
          return ifaces[iface];
        })
        // flatten address data, use only IPv4
        .reduce(function (data, addresses) {
          addresses.filter(function (addr) {
            return addr.family === "IPv4";
          }).forEach(function (addr) {
            data.push(addr);
          });
          return data;
        }, [])
        .map(function (addr) {
          return protocol + "://" + addr.address + ":" + address.port;
        });
    }

    // Output
    if (GenerateServer.logLevel >= 1) {
      if (serveURL === openURL)
        if (serveURLs.length === 1) {
          console.log(("Serving \"%s\" at %s").green, root, serveURLs[0]);
        } else {
          console.log(("Serving \"%s\" at\n\t%s").green, root, serveURLs.join("\n\t"));
        }
      else
        console.log(("Serving \"%s\" at %s (%s)").green, root, openURL, serveURL);
    }

    // Launch browser
    if (openPath !== null)
      if (typeof openPath === "object") {
        openPath.forEach(function (p) {
          open(openURL + p, { app: browser });
        });
      } else {
        open(openURL + openPath, { app: browser });
      }
  });

  // Setup server to listen at port
  server.listen(port);
  console.log(`  App running at:`)
  console.log(`  - Local:    http://localhost:${port}/`)
  return server;
};
module.exports = GenerateServer;