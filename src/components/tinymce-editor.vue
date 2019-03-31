<template>
  <div class="tinymce-editor">
    <editor v-model="myValue" :init="init" :disabled="disabled" @onClick="onClick"></editor>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
import "tinymce/plugins/image";
import "tinymce/plugins/code";
import "tinymce/plugins/link";
import "tinymce/plugins/anchor";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import "tinymce/plugins/contextmenu";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/colorpicker";
import "tinymce/plugins/textcolor";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/preview";
import "tinymce/plugins/autosave";
import "tinymce/plugins/directionality";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/hr";
import "tinymce/plugins/help";
import "tinymce/plugins/pagebreak";
export default {
  components: {
    Editor
  },
  props: {
    //传入一个value，使组件支持v-model绑定
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: "lists image media table textcolor wordcount contextmenu"
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat"
    }
  },
  data() {
    return {
      //初始化配置
      init: {
        language_url: "/static/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/static/tinymce/skins/ui/oxide/",
        emoticons_database_url: "/static/tinymce/js/emojis.min.js",
        height: 400,
        plugins:
          "hr anchor pagebreak preview emoticons help directionality autosave link lists advlist image code table colorpicker textcolor wordcount contextmenu fullscreen media",
        toolbar:
          "undo redo | bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent blockquote pagebreak hr|ltr rtl|numlist bullist| link unlink anchor code image media emoticons|  removeformat | table tabledelete  |tablemergecells tablesplitcells tableinsertrowbefore tableinsertrowafter tabledeleterow  tableinsertcolbefore tableinsertcolafter tabledeletecol| fullscreen preview |help",
        advlist_bullet_styles: "default,circle,disc,square",
        advlist_number_styles:
          "default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman",
        branding: false,
        menubar: false,
        autosave_ask_before_unload: true,
        media_live_embeds: true,
        //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: function(blobInfo, success, failure) {
          var xhr, formData;

          xhr = new XMLHttpRequest();
          xhr.withCredentials = false;
          xhr.open("POST", "/vlog/image/upload");

          xhr.onload = function() {
            var json;

            if (xhr.status != 200) {
              failure("HTTP Error: " + xhr.status);
              return;
            }

            json = JSON.parse(xhr.responseText);

            if (!json || typeof json.data != "string") {
              failure("Invalid JSON: " + xhr.responseText);
              return;
            }

            success(json.data);
          };

          formData = new FormData();
          formData.append("file", blobInfo.blob(), blobInfo.filename());

          xhr.send(formData);
        }
      },
      myValue: ""
    };
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    //添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    //需要什么事件可以自己增加
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    //可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = "";
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    }
  }
};
</script>
<style scoped>
</style>
