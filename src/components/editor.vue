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
              <select class="ql-header">
                <option selected>普通文本</option>
                <option value="1">标题1</option>
                <option value="2">标题2</option>
                <option value="3">标题3</option>
                <option value="4">标题4</option>
              </select>
              <button class="ql-list" value="ordered">ordered</button>
              <button class="ql-list" value="bullet">bullet</button>
              <button class="ql-indent" value="-1">indent-1</button>
              <button class="ql-indent" value="+1">indent+1</button>
              <select class="ql-align"></select>
              <select class="ql-size">
                <option selected></option>
                <option value="12px"></option>
                <option value="14px"></option>
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
              <button id="undo" @click="undoClick" type="button" class="undo">
                <i class="el-icon-third-undo1"></i>
              </button>
              <button id="redo" @click="redoClick" type="button" class="redo">
                <i class="el-icon-third-redo1"></i>
              </button>
              <button id="html" @click="htmlClick" type="button" class="html">
                <i class="el-icon-third-html"></i>
              </button>
              <button id="preview" @click="previewClick" type="button" class="preview">
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
    <el-dialog title="预览" :visible.sync="dialogVisible" width="70%" fullscreen>
      <div class="ql-editor preview" v-html="artical.content"></div>
    </el-dialog>

    <el-dialog title="插入视频" :visible.sync="videoDialogShow">
      <el-form
        ref="videoForm"
        size="small"
        :model="videoForm"
        label-width="100px"
        :rules="videoRules"
        status-icon
      >
        <el-form-item label="地址" prop="src">
          <el-input v-model="videoForm.src"></el-input>
        </el-form-item>
        <el-form-item label="宽度" prop="width">
          <el-input v-model.number="videoForm.width"></el-input>
        </el-form-item>
        <el-form-item label="高度" prop="height">
          <el-input v-model.number="videoForm.height"></el-input>
        </el-form-item>
        <el-form-item label="对齐方式" prop="align">
          <el-radio-group v-model="videoForm.align">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="center">居中</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" size="small" @click="videoHandler">确认</el-button>
        <el-button size="small" @click="videoDialogShow = false">取消</el-button>
      </div>
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
    iframe {
      display: block;
      margin: auto;
    }
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
import { VideoFormat } from "@/lib/quill-video-format";
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
      videoDialogShow: false,
      videoForm: {
        src: "",
        width: 400,
        height: 300,
        align: ""
      },
      cusorIndex: 0,
      videoRules: {
        src: [
          {
            required: true,
            message: "请输入视频地址",
            trigger: ["blur", "change"]
          },
          {
            type: "string",
            pattern: /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
            message: "视频地址格式不正确",
            trigger: ["blur", "change"]
          }
        ],
        width: [
          {
            type: "integer",
            range: {
              min: 0
            },
            message: "请输入大于0的整数"
          }
        ],
        height: [
          {
            type: "integer",
            range: {
              min: 0
            },
            message: "请输入大于0的整数"
          }
        ],
        align: [
          {
            type: "enum",
            enum: ["left", "center", "right"]
          }
        ]
      },
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
    onEditorBlur(quill) {},
    onEditorFocus(quill) {
      // console.log(quill.getSelection());
    },
    onEditorReady(quill) {
      let toolbar = quill.getModule("toolbar");
      toolbar.addHandler("video", () => {
        this.videoDialogShow = true;
        this.$nextTick(() => {
          this.$refs.videoForm.resetFields();
        });

        this.cusorIndex = quill.getSelection().index;
      });
    },
    videoHandler() {
      this.$refs.videoForm.validate(valid => {
        if (!valid) {
          return;
        }
        let quill = this.$refs[this.id].quill;
        quill.insertEmbed(this.cusorIndex, "video", this.videoForm);
        quill.update();
        quill.setSelection(this.cusorIndex + 1);
        this.videoDialogShow = false;
      });
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
    },
    toolbarTitle() {
      const titleConfig = {
        "ql-bold": "粗体",
        "ql-color": "文字颜色",
        "ql-font": "字体",
        "ql-code": "插入代码",
        "ql-italic": "斜体",
        "ql-link": "链接",
        "ql-background": "背景颜色",
        "ql-size": "字号",
        "ql-strike": "删除线",
        "ql-script": "上标/下标",
        "ql-underline": "下划线",
        "ql-blockquote": "引用",
        "ql-header": "标题",
        "ql-indent": "缩进",
        "ql-list": "列表",
        "ql-align": "文本对齐",
        "ql-direction": "文本方向",
        "ql-code-block": "代码块",
        "ql-formula": "公式",
        "ql-image": "图片",
        "ql-video": "视频",
        "ql-clean": "清除样式",
        undo: "回撤",
        redo: "重做",
        html: "HTML代码",
        preview: "预览"
      };
      //提示
      const oToolBar = document.querySelector(".ql-toolbar"),
        aButton = oToolBar.querySelectorAll("button"),
        aSelect = oToolBar.querySelectorAll("select");
      aButton.forEach(function(item) {
        let text = titleConfig[item.classList[0]];
        if (item.className === "ql-indent") {
          item.value === "+1" ? (text = "增加" + text) : (text = "减少" + text);
        } else if (item.className == "ql-list") {
          item.value === "ordered"
            ? (text = "项目编号")
            : (text = "无序" + text);
        }

        text && (item.title = text);
      });
      aSelect.forEach(function(item) {
        let text = titleConfig[item.classList[0]];
        text && (item.previousElementSibling.title = text);
      });
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
    var sizes = ["12px", "14px", "16px", "18px", "20px"];
    var Font = Quill.import("formats/font");
    var Size = Quill.import("formats/size");
    Font.whitelist = fonts; //将字体加入到白名单
    Size.whitelist = sizes; //将字体加入到白名单
    Quill.register(Font, true);
    Quill.register(Size, true);
    Quill.register(VideoFormat, true);

    this.toolbarTitle();
  }
};
</script>