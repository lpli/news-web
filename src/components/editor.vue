<template>
  <div class="editor">
    <quill-editor
      v-model="content"
      :ref="id"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    >
      <div id="toolbar" slot="toolbar">
        <!-- Add a bold button -->
        <span class="ql-formats">
          <button class="ql-bold">Bold</button>
          <button class="ql-italic">Italic</button>
          <button class="ql-underline">Underline</button>
          <button class="ql-strike">Strike</button>
          <button class="ql-header" value="1">Header 1</button>
          <button class="ql-header" value="2">Header 2</button>
        </span>
        <span class="ql-formats">
          <button class="ql-list" value="ordered">ordered</button>
          <button class="ql-list" value="bullet">bullet</button>
        </span>
        <span class="ql-formats">
          <button class="ql-script" value="sub">sub</button>
          <button class="ql-script" value="super">super</button>
        </span>
        <span class="ql-formats">
          <button class="ql-indent" value="-1">indent-1</button>
          <button class="ql-indent" value="+1">indent+1</button>
        </span>
        <span class="ql-formats">
          <button class="ql-direction" value="rtl">direction</button>
        </span>
        <!-- Add font size dropdown -->
        <span class="ql-formats">
          <select class="ql-size">
            <option selected></option>
            <option value="16px" ></option>
            <option value="18px"></option>
            <option value="20px"></option>
          </select>
          <select class="ql-font">
            <option value="SimSun" selected></option>
            <option value="SimHei"></option>
            <option value="Microsoft-YaHei"></option>
            <option value="KaiTi"></option>
            <option value="FangSong"></option>
            <option value="Arial"></option>
            <option value="Times-New-Roman"></option>
            <option value="sans-serif"></option>
          </select>
        </span>
        <span class="ql-formats">
          <select class="ql-color"></select>
          <select class="ql-background"></select>
        </span>
        <span class="ql-formats">
          <select class="ql-align"></select>
        </span>
        <span class="ql-formats">
          <button class="ql-image"></button>
          <button class="ql-video"></button>
          <button class="ql-link"></button>
        </span>
        <!-- You can also add your own -->
        <span class="ql-formats">
          <button class="ql-clean"></button>
          <button id="ql-undo" @click="undoClick" title="回撤">
            <i class="el-icon-third-undo1"></i>
          </button>
          <button id="ql-redo" @click="redoClick" title="重做">
            <i class="el-icon-third-redo1"></i>
          </button>
        </span>
        <span class="ql-formats">
          <button id="ql-html" @click="htmlClick" title="代码">
            <i class="el-icon-third-html"></i>
          </button>
          <button id="ql-html" @click="previewClick" title="预览">
            <i class="el-icon-third-eye"></i>
          </button>
        </span>
      </div>
    </quill-editor>
    <div class="quill-code" v-show="showCode">
      <code class="hljs xml" v-html="contentCode"></code>
    </div>
    <el-dialog title="预览" :visible.sync="dialogVisible" width="70%">
      <div class="ql-editor preview" v-html="content"></div>
    </el-dialog>
  </div>
</template>
<style lang="less">
.preview img {
  max-width: 100%;
  cursor: pointer !important;
}
.ql-editor{
  font-size:16px;
  font-family: "Microsoft Yahei", Avenir, "Segoe UI", "Hiragino Sans GB", STHeiti, "Microsoft Sans Serif", "WenQuanYi Micro Hei", sans-serif;
}
.ql-editor p{
  margin-bottom: 0.5em;
}
</style>

<style lang="less" scoped>


.editor {
  display: block;
}
.quill-editor {
  border-bottom: none;
}

.quill-code {
  border: 1px solid #ccc;
  > code {
    margin: 0;
    padding: 1rem;
    border-radius: 0;
    overflow-y: auto;
    display: block;
  }
}
.quill-code {
  border-top: none;
}
</style>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/github.css";
import '@/assets/style/font.less'; 

import { quillEditor } from "vue-quill-editor";
import * as Quill from "quill"; //引入编辑器
import Delta from "quill-delta";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
import {container, ImageExtend,QuillWatch} from 'quill-image-extend-module'
import { MessageBox } from 'element-ui';

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
Quill.register('modules/ImageExtend', ImageExtend)
import hljs from "highlight.js";
export default {
  name: "editor",
  components: {
    quillEditor
  },
  data() {
    return {
      dialogVisible: false,
      showCode: false,
      id: "editor",
      content: "",
      editorOption: {
        placeholder:'请输入',
        modules: {
          toolbar: {
            container:"#toolbar",
            handlers:{
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
              // 'video':function(){
              //     MessageBox.prompt('请输入URL', '提示', {
              //       confirmButtonText: '确定',
              //       cancelButtonText: '取消',
              //       inputPattern: /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
              //       inputErrorMessage: 'URL格式不正确'
              //     }).then(({value}) => {
              //         this.quill.format('video',value);
              //     }).catch(() => {
              //         this.quill.format('video',false);    
              //     });
              //   }
              // }
            }
          },
          history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "DisplaySize", "Toolbar"]
          },
          ImageExtend: {
              loading: true,
              name: 'img',
              action: '/xxx',
              response: (res) => {
                return res.info
              }
          },
          clipboard: {
            matchers: [
              [
                "p",
                (node, delta) => {
                  //保留段落前的空格
                  let newDelta = new Delta();
                  delta.forEach((op) => {
                    let line = false;
                    if (typeof op["insert"] == 'string' && op["insert"]!='\n') {
                      if(op['insert'].endWith('\n')){
                        line = true;
                      }
                      op['insert'] = node.innerText;
                    }
                    if(line){
                        newDelta.insert(op['insert'],op['attributes']).insert('\n');
                    }else{
                        newDelta.insert(op['insert'],op['attributes'])
                    }
                  });
                  return newDelta;
                }
              ]
            ]
          }
        }
      }
    }
  },
  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },
    undoClick() {
      this.$refs[this.id].quill.history.undo();
    },
    redoClick() {
      this.$refs[this.id].quill.history.redo();
    },
    htmlClick() {
      this.showCode = !this.showCode;
    },
    previewClick() {
      this.dialogVisible = true;
    }
  },
  computed: {
    editor() {
      return this.$refs[this.id].quill;
    },
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    }
  },
  mounted() {
    var fonts = [
      "SimSun",
      "SimHei",
      "Microsoft-YaHei",
      "KaiTi",
      "FangSong",
      "Arial",
      "Times-New-Roman",
      "sans-serif"
    ];
    var sizes = [
      "16px",
      "18px",
      "20px"
    ];
    var Font = Quill.import("formats/font");
    var Size = Quill.import("formats/size");
    Font.whitelist = fonts; //将字体加入到白名单
    Size.whitelist = sizes; //将字体加入到白名单
    Quill.register(Font, true);
    Quill.register(Size, true);
  }
  // Omit the same parts as in the following component sample code
  // ...
};
</script>