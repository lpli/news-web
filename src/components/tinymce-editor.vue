<template>
  <div class="tinymce-editor">
    <editor
      v-model="myValue"
      :init="init"
      :disabled="disabled"
      @onClick="onClick"
      @onChange="onChange"
      :height="height"
      :show-file-list="false"
      ref="mce"
    ></editor>
    <el-dialog
      custom-class="image-selector"
      :visible.sync="image_selector_show"
      title="选择图片"
      width="680px"
      :close-on-click-modal="false"
    >
      <el-row class="image-selector-body">
        <el-col tag="ul" class="tab-list" :span="4">
          <li
            v-for="item in tabList"
            :key="item.groupId"
            :class="groupId == item.groupId?'tab-item selected':'tab-item'"
            @click="listImage(item.groupId)"
          >{{item.groupName}}({{item.total}})</li>
          <li class="add-item" @click="addGroup">
            <i class="el-icon-third-plus"></i>新建分组
          </li>
          <span class="choose-tips">已选{{choose.length}}个,可选{{maxChecked}}个</span>
        </el-col>
        <el-col class="image-container" :span="20">
          <div class="upload">
            <el-upload
              class="upload-demo"
              action="/vlog/image/upload"
              multiple
              :limit="3"
              :data="uploadData"
              :show-file-list="false"
              :on-exceed="handleExceed"
              :on-error="handleError"
              :on-success="handleSuccess"
            >
              <el-button size="mini" type="success">本地上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过5Mb</div>
            </el-upload>
          </div>
          <el-scrollbar tag="div" class="image-container-view">
            <div class="image-list">
              <ul v-if="imgList.length>0">
                <li
                  v-for="img in imgList"
                  :key="img.id"
                  @click="checkImg(img)"
                  :class="img.checked?'checked':''"
                >
                  <img :src="img.url">
                  <span :title="img.title" @click="editTitle($event,img)">
                    {{img.title}}
                    <i class="el-icon-third-edit"></i>
                  </span>
                  <i class="el-icon-third-check-circle-fill"></i>
                </li>
              </ul>
              <div v-else class="no-image"></div>
            </div>
          </el-scrollbar>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button size="mini" type="primary" @click="ok" :disabled="choose.length == 0">确定</el-button>
        <el-button size="mini" @click="image_selector_show = false">取消</el-button>
      </div>
    </el-dialog>
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
import "tinymce/plugins/autoresize";
import "@/lib/tinymce-plugins/imageselector";
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
    height: {
      type: [Number, String],
      default: 400
    },
    plugins: {
      type: [String, Array],
      default:
        "imageselector autoresize hr anchor pagebreak preview emoticons help directionality autosave link lists advlist image code table colorpicker textcolor wordcount  fullscreen media "
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo | bold forecolor fontsizeselect |   | \alignleft aligncenter alignright alignjustify |  blockquote|numlist bullist| link  imageselector media |  removeformat | fullscreen preview |help"
    },
    contextmenu: {
      type: [String, Array],
      default: "undo redo | cut copy   | selectall"
    }
  },
  data() {
    return {
      image_selector_show: false,
      tabList: [
        {
          groupName: "全部图片",
          groupId: -1,
          total: 0
        }
      ],
      groupId: -1,
      imgList: [],
      uploadData: {},
      maxChecked: 10,
      choose: [],
      //初始化配置
      init: {
        link_title: false,
        language_url: "/static/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/static/tinymce/skins/ui/oxide/",
        emoticons_database_url: "/static/tinymce/js/emojis.min.js",
        min_height: this.height,
        plugins: this.plugins,
        toolbar: this.toolbar,
        contextmenu: this.contextmenu,
        advlist_bullet_styles: "default,circle,disc,square",
        advlist_number_styles:
          "default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman",
        branding: false,
        menubar: false,
        autosave_ask_before_unload: true,
        media_live_embeds: true,
        //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        image_selector_click: this.imageSelectorClick,
        target_list:false
        
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
    onChange(e) {
      this.$emit("change", e, tinymce);
    },
    //可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = "";
    },
    uploadImg(blobInfo, success, failure) {
      var formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());
      this.$http
        .post("/image/upload", formData, {})
        .then(json => {
          success(json.data);
        })
        .catch(() => {
          failure("上传失败");
        });
    },
    imageSelectorClick() {
      this.image_selector_show = true;
      this.initTab();
    },
    initTab() {
      this.$http.get("/image/count").then(json => {
        if (json.code == 1) {
          this.tabList = json.data;
        }
      });
      this.$nextTick(() => {
        this.listImage(-1);
      });
    },
    listImage(groupId) {
      this.groupId = groupId;
      this.uploadData = {
        groupId: groupId
      };
      let url = groupId == -1 ? "/image/all" : "/image/" + groupId + "/list";
      this.$http.get(url).then(json => {
        if (json.code == 1) {
          this.imgList = json.data;
        }
      });
    },

    handleExceed(files, fileList) {
      this.$message({
        type: "warning",
        message: "超出文件个数限制"
      });
    },
    handleError(err, files, fileList) {
      this.$message({
        type: "error",
        message: "文件上传失败"
      });
    },
    handleSuccess(response, files, fileList) {
      if (response.code == 1) {
        this.$message({
          type: "success",
          message: "文件上传成功"
        });
        this.initTab();
      } else {
        this.$message({
          type: "success",
          message: "文件上传失败：" + response.msg
        });
      }
    },
    checkImg(img) {
      this.imgList.forEach(item => {
        if (item.id == img.id) {
          if (!item.checked) {
            if (this.choose.length + 1 > this.maxChecked) {
              this.$message({
                type: "warning",
                message: "一次对多选择" + this.maxChecked + "个"
              });
              return false;
            }
          }
          item.checked = !item.checked;
        }
      });
      this.choose = this.imgList.filter(item => {
        return item.checked;
      });
    },
    ok() {
      let html = "";
      this.choose.forEach(item => {
        html +=
          '<img src="' +
          item.url +
          '" alt="' +
          item.title +
          '" title="' +
          item.title +
          '">';
      });

      this.$refs.mce.editor.execCommand("mceInsertContent", false, html);
      this.image_selector_show = false;
    },
    editTitle(event, img) {
      event.stopPropagation();
      this.$prompt("", "图片标题", {
        inputPlaceholder: "请输入标题",
        inputValue: img.title,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9_]{1,60}$/g,
        inputErrorMessage: "由最大长度60位的英文、汉字、下划线组成",
        closeOnClickModal: false
      })
        .then(({ value }) => {
          img.title = value;
          this.$http.put("/image/" + img.id, img).then(json => {
            if (json.code == 1) {
              this.listImage(this.groupId);
            } else {
              this.$message({
                type: "error",
                message: json.msg
              });
            }
          });
        })
        .catch(() => {});
    },
    addGroup() {
      this.$prompt("", "新建分组", {
        inputPlaceholder: "请输入分组名",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\u4E00-\u9FA5A-Za-z0-9_]{1,60}$/g,
        inputErrorMessage: "由最大长度60位的英文、汉字、下划线组成",
        closeOnClickModal: false
      })
        .then(({ value }) => {
          this.$http.post("/image/group", { name: value }).then(json => {
            if (json.code == 1) {
              this.initTab();
            } else {
              this.$message({
                type: "error",
                message: json.msg
              });
            }
          });
        })
        .catch(() => {});
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
<style lang="less" scoped>
.tinymce-editor {
  width: 100%;
}
.el-dialog.image-selector {
  .el-dialog__body {
    padding: 0px;
  }
  .image-selector-body {
    height: 360px;
    line-height: 12px;
    .tab-list {
      list-style: none;
      padding: 0;
      margin: 0;
      border-right: 1px solid #e8e8e8;
      height: 100%;
      margin-right: 10px;
      font-size: 12px;
      position: relative;
      .tab-item,
      .add-item {
        display: block;
        line-height: 22px;
        height: 24px;
        padding: 4px 6px;
        margin: 0px;
        cursor: pointer;
        &:hover,
        &.selected {
          background: #ecf5ff;
        }
      }
      .choose-tips {
        position: absolute;
        bottom: -60px;
      }
    }
    .image-container {
      width: calc(100% - 120px);
      height: 100%;
      .upload{
        height: 50px;
      }
      .image-container-view {
        height: calc(100% - 55px);
        .image-list {
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
            li {
              display: inline-block;
              width: 80px;
              height: 92px;
              margin: 10px 8px;
              border: 1px solid #e8e8e8;
              cursor: pointer;
              position: relative;
              > i {
                position: absolute;
                top: -8px;
                right: -2px;
                display: none;
              }
              &.checked {
                > i {
                  display: block;
                  color: green;
                }
              }
              img {
                width: 80px;
                height: 70px;
              }
              span {
                padding: 2px 4px;
                height: 20px;
                line-height: 12px;
                font-size: 12px;
                width: 80px;
                display: inline-block;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                box-sizing: border-box;
                position: relative;
                > i {
                  display: none;
                  position: absolute;
                  right: 0px;
                  top: 0px;
                }
                &:hover > i {
                  display: block;
                }
              }
            }
          }
          .no-image {
            background: #eee;
            width: 100%;
            height: 300px;
            &::after {
              content: "暂无图片";
              position: relative;
              top: 50%;
              left: 45%;
            }
          }
        }
      }
    }
  }
}
</style>

