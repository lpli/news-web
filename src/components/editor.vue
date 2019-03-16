<template>
  <div class="editor">
    <el-form :model="artical" label-width="100px">
      <el-form-item prop="title" label="标题">
        <el-input type="text" v-model="artical.title"></el-input>
      </el-form-item>
      <el-form-item prop="title" label="封面图">
        <el-radio v-model.number="artical.cover" label="单图"></el-radio>
        <el-radio v-model.number="artical.cover" label="多图"></el-radio>
      </el-form-item>
      <el-form-item prop="content">
        <quill-editor
          v-model="artical.content"
          :ref="id"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          v-loading="loading"
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
              <button class="ql-list" value="ordered">ordered</button>
              <button class="ql-list" value="bullet">bullet</button>
              <button class="ql-script" value="sub">sub</button>
              <button class="ql-script" value="super">super</button>
              <button class="ql-indent" value="-1">indent-1</button>
              <button class="ql-indent" value="+1">indent+1</button>
              <button class="ql-direction" value="rtl">direction</button>
              <select class="ql-align"></select>
              <select class="ql-size">
                <option selected></option>
                <option value="14px"></option>
                <option value="16px"></option>
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
              <select class="ql-color"></select>
              <select class="ql-background"></select>
              <button class="ql-image"></button>
              <button class="ql-video"></button>
              <button class="ql-link"></button>
              <button class="ql-clean"></button>
              <button id="undo" @click="undoClick" title="回撤" type="button">
                <i class="el-icon-third-undo1"></i>
              </button>
              <button id="redo" @click="redoClick" title="重做" type="button">
                <i class="el-icon-third-redo1"></i>
              </button>
              <button id="html" @click="htmlClick" title="代码" type="button">
                <i class="el-icon-third-html"></i>
              </button>
              <button id="preview" @click="previewClick" title="预览" type="button">
                <i class="el-icon-third-eye"></i>
              </button>
            </span>
          </div>
        </quill-editor>
        <div class="quill-code" v-show="showCode">
          <code class="hljs xml" v-html="contentCode"></code>
        </div>
      </el-form-item>
    </el-form>
    <div class="btn-bar">
      <el-button type="infor">保存草稿</el-button>
      <el-button type="infor">发布</el-button>
      <el-button type="infor" @click="previewClick">预览</el-button>
    </div>
    <el-dialog title="预览" :visible.sync="dialogVisible" width="70%" fullscreen >
      <div class="ql-editor preview" v-html="artical.content"></div>
    </el-dialog>
  </div>
</template>
<style lang="less">
.preview img {
  max-width: 100%;
  cursor: pointer !important;
}
.quill-editor {
  .ql-toolbar {
    line-height: 24px;
  }
}
.ql-editor {
  font-size: 16px;
  font-family: "Microsoft Yahei", Avenir, "Segoe UI", "Hiragino Sans GB",
    STHeiti, "Microsoft Sans Serif", "WenQuanYi Micro Hei", sans-serif;
  .ql-video {
    min-width: 400px;
    min-height: 300px;
    display: block;
    margin: auto;
  }
}
.ql-container {
  min-height: 200px;
  .ql-editor p {
    margin-bottom: 1em;
  }
}
.preview p {
  margin-bottom: 1.5em;
  line-height: 2em;
}
</style>

<style lang="less" scoped>
.editor {
  display: block;
  margin-bottom: 80px;
  .btn-bar {
    position: fixed;
    bottom: 0px;
    width: 100%;
    padding: 10px 0px 10px 100px;
    background-color: #fff;
  }
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
import "@/assets/style/font.less";
import hljs from "highlight.js";

import { quillEditor } from "vue-quill-editor";
import * as Quill from "quill"; //引入编辑器
import Delta from "quill-delta";
import ImageResize from "quill-image-resize-module-fix";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
// import { VideoExtend, QuillVideoWatch } from './quill-video-extend-module';
import { MessageBox } from "element-ui";

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/ImageExtend", ImageExtend);

export default {
  name: "editor",
  components: {
    quillEditor
  },
  data() {
    return {
      loading: false,
      artical: {
        id: "",
        title: "",
        content: "",
        cover: ""
      },
      dialogVisible: false,
      showCode: false,
      id: "editor",
      editorOption: {
        placeholder: "请输入...",
        modules: {
          toolbar: {
            container: "#toolbar",
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id);
              },
              video: function() {
                MessageBox.prompt("请输入URL", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  inputPattern: /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
                  inputErrorMessage: "URL格式不正确"
                })
                  .then(({ value }) => {
                    this.quill.format("video", value);
                  })
                  .catch(() => {
                    this.quill.format("video", false);
                  });
              }
            }
          },
          history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
          },
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "Toolbar", "DisplaySize"]
          },
          ImageExtend: {
            loading: false,
            name: "file",
            action: "/vlog/image/upload",
            response: res => {
              return res.data;
            },
            start: () => {
              this.loading = true;
            },
            end: () => {
              this.loading = false;
            },
            error: () => {
              this.$message({
                type: "error",
                message: "上传异常"
              });
            }
          },
          clipboard: {
            matchers: [
              [
                "p",
                (node, delta) => {
                  //保留段落前的空格
                  let newDelta = new Delta();
                  delta.forEach(op => {
                    let line = false;
                    if (
                      typeof op["insert"] == "string" &&
                      op["insert"] != "\n"
                    ) {
                      if (op["insert"].endWith("\n")) {
                        line = true;
                      }
                      op["insert"] = node.innerText;
                    }
                    if (line) {
                      newDelta
                        .insert(op["insert"], op["attributes"])
                        .insert("\n");
                    } else {
                      newDelta.insert(op["insert"], op["attributes"]);
                    }
                  });
                  return newDelta;
                }
              ]
            ]
          }
        }
      }
    };
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
      return hljs.highlightAuto(this.artical.content).value;
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
    var sizes = ["14px", "16px", "18px", "20px"];
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