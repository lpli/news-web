/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.3 (2019-03-19)
 */
(function() {
    var linkinsert = (function(domGlobals) {
      "use strict";
      
          
          
  
      
  
      var global = tinymce.util.Tools.resolve("tinymce.PluginManager");
      global.add("linkinsert", function(editor) {
        editor.ui.registry.addButton("linkinsert", {
          icon: "link",
          tooltip: "插入连接",
          onAction: function() {
             editor.settings.link_insert_click();
          }
        });
      });
      function Plugin() {}
  
      return Plugin;
    })(window);
  })();
  