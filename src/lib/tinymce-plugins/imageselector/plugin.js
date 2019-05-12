/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.3 (2019-03-19)
 */
(function() {
  var imageselector = (function(domGlobals) {
    "use strict";
    
		
		

	

    var global = tinymce.util.Tools.resolve("tinymce.PluginManager");
    global.add("imageselector", function(editor) {
      editor.ui.registry.addButton("imageselector", {
        icon: "image",
        tooltip: "选择图片",
        onAction: function() {
						editor.settings.image_selector_click();
        }
      });
    });
    function Plugin() {}

    return Plugin;
  })(window);
})();
