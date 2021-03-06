/* eslint-env node */
'use strict';

var Funnel = require('broccoli-funnel');
const fastbootTransform = require('fastboot-transform');
var featuresToExclude = [];
var assetsToExclude = [];

function filterAssets() {
  featuresToExclude.forEach(function(featureToExclude)  {
    if (featureToExclude === 'firebase-util') {
      assetsToExclude.push('**/firebase-util.js');
      assetsToExclude.push('**/has-limited.js');
    } else if (featureToExclude === 'firebase-ui') {
      assetsToExclude.push('**/firebase-ui*.js');
    } else if (featureToExclude === 'firebase-flex') {
      assetsToExclude.push('**/firebase-flex.js');
      assetsToExclude.push('**/has-filtered.js');
    }
  });
}

function isFeatureExcluded(feature) {
  if (featuresToExclude.indexOf(feature) !== -1) {
    return true;
  }

  return false;
}

module.exports = {
  name: 'emberfire-utils',
  options: {
    nodeAssets: {
      firebaseui: function() {
        let imports = [ 'firebaseui.js', 'firebaseui.css' ];

        if (isFeatureExcluded('firebase-ui')) {
          imports = [];
        }

        return {
          srcDir: 'dist',
          import: {
            include: imports,
            processTree(input) {
              return fastbootTransform(input);
            },
          },
        };
      },
    },
  },

  included: function(app) {
    let addonConfig = this.app.options[this.name];

    if (addonConfig) {
      featuresToExclude = addonConfig.exclude || [];
      filterAssets();
    }

    this._super.included.apply(this, arguments);

    if (!isFeatureExcluded('firebase-ui')) {
      app.import('vendor/shims/firebaseui.js');
    }
  },

  treeForApp: function() {
    let tree = this._super.treeForApp.apply(this, arguments);

    return new Funnel(tree, { exclude: assetsToExclude });
  },

  treeForAddon: function() {
    let tree = this._super.treeForAddon.apply(this, arguments);

    return new Funnel(tree, { exclude: assetsToExclude });
  },
};
