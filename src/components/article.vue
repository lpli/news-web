<template>
  <div class="editor">
    <el-form :model="article" label-width="100px" :rules="rules" ref="articleForm">
      <el-form-item prop="title" label="标题">
        <el-input type="text" v-model="article.title" placeholder="请输入标题（6~30个字）"></el-input>
      </el-form-item>
      <el-form-item prop="content">
        <editor v-model="article.content" ref="editor" @change="getCover"></editor>
      </el-form-item>
      <el-form-item prop="coverType" label="封面图">
        <el-radio-group v-model.number="article.coverType" @change="getCover">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="2">多图</el-radio>
        </el-radio-group>
        <div class="img-preview">
          <ul v-if="coverList.length > 0">
            <li v-for="(img,i) in coverList" :key="i">
              <img :src="img">
            </li>
          </ul>
          <div v-else class="no-cover">
              无可用配图将发布无封面文章
          </div>
        </div>
      </el-form-item>
    </el-form>
    <div class="btn-bar">
      <el-button type="infor" @click="draft">保存草稿</el-button>
      <el-button type="infor" @click="publish">发布</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.btn-bar {
  padding-left: 100px;
}

.img-preview {
  ul {
    list-style: none;
    padding: 0;
    li {
      display: inline-block;
      padding: 4px 8px;
      img {
        width: 160px;
        height: 120px;
      }
    }
  }
  .no-cover{
    border:1px dotted #999;
    width:100px;
    height:80px;
    padding:10px 15px;
    text-align: center;
    color:#999;
    line-height: 22px;
  }
}
</style>

<script>
import Editor from "@/components/tinymce-editor";
export default {
  name: "ArticleEditor",
  components: {
    Editor
  },
  data() {
    return {
      loading: false,
      article: {
        id: "",
        title: "",
        content: "",
        coverType: 1
      },
      coverList: [],
      id: "editor",
      rules: {
        title: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请输入标题"
          }
        ],
        content: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请输入内容"
          }
        ],
        coverType:[{
          required: true,
            trigger: ["blur", "change"],
            message: "请选择"
        }]
      }
    };
  },
  methods: {
    draft() {
      this.$refs.articleForm.validate((valid)=>{
        if(!valid){
          return;
        }
        this.$http.post('/article/draft',this.article).then((json)=>{
            if(json.code==1){
              this.$router.push({
                path:'/article/my'
              })
            }
        });

      })
    },
    publish(){

    },
    getCover() {
      let list = [];
      let imgs = this.$refs.editor.$refs.mce.editor.$("img");
      if (imgs.length == 0) {
        this.coverList = list;
        return;
      }
      if (this.article.coverType === 1) {
        list.push(imgs[0].src);
      } else {
        imgs.each((i, item) => {
          list.push(item.src);
        });
      }
      if (list.length > 2) {
        this.coverList = list.slice(0, 3);
      } else {
        this.coverList = list;
      }
    }
  },

  computed: {},
  mounted() {}
};
</script>