<template>
  <div class="editor">
    <el-form :model="article" label-width="100px" :rules="rules" ref="articleForm">
      <el-form-item prop="id" v-show="false">
        <el-input type="hidden" v-model="article.id"></el-input>
      </el-form-item>
      <el-form-item prop="status" v-show="false">
        <el-input type="hidden" v-model="article.status"></el-input>
      </el-form-item>
      <el-form-item prop="title" label="标题" class="article-title">
        <el-input type="text" v-model="article.title" placeholder="请输入标题（最多30个字）" :maxlength="30">
          <span slot="append">{{article.title.length}}/30</span>
        </el-input>
      </el-form-item>
      <el-form-item prop="articleCategory" label="分类">
        <el-cascader :props="props" v-model="article.articleCategory"></el-cascader>
      </el-form-item>
      <el-form-item prop="carCategory" label="车系">
        <car-selector @select="selectCategory" ref="carSelector"></car-selector>
        <el-select v-model="article.carCategory" placeholder="请选择" ref="carCategory">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="content">
        <editor v-model="article.content" ref="editor" @change="getCover" :height="300"></editor>
      </el-form-item>
      <el-form-item prop="coverType" label="封面图">
        <el-radio-group v-model.number="article.coverType" @change="getCover">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="2">多图</el-radio>
        </el-radio-group>
        <div class="img-preview">
          <ul v-if="coverList.length > 0">
            <li v-for="img in coverList" :key="img.imgUrl">
              <img :src="img.imgUrl">
            </li>
          </ul>
          <div v-else class="no-cover">无可用配图将发布无封面文章</div>
        </div>
      </el-form-item>
    </el-form>
    <div class="btn-bar">
      <el-button type="infor" @click="draft">保存草稿</el-button>
      <el-button type="primary" @click="publish">提交审核</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.editor {
  width: 80%;
  .btn-bar {
    position: fixed;
    top: 80px;
    right: 10px;
  }
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
  .no-cover {
    border: 1px dotted #999;
    width: 150px;
    height: 45px;
    padding: 10px 15px;
    text-align: center;
    color: #999;
    line-height: 22px;
  }
}
</style>

<script>
import Editor from "@/components/tinymce-editor";
import CarSelector from "@/components/car-selector";
let id = 0;
export default {
  name: "ArticleEditor",
  components: {
    Editor,
    CarSelector
  },
  data() {
    let that = this;
    return {
      loading: false,
      titleLength: 0,
      article: {
        id: "",
        title: "",
        status: 0,
        content: "",
        coverType: 1,
        articleCategory: null,
        carCategory: null,
        coverList: []
      },
      coverList: [],
      id: "editor",
      options: [],
      props: {
        checkStrictly: true,
        emitPath: false,
        label: "name",
        value: "id",
        lazy: true,
        lazyLoad(node, resolve) {
          const { level, value } = node;
          that.$http
            .get("/category/list", {
              level: level + 1,
              id: level > 0 ? value : ""
            })
            .then(json => {
              if (json.code == 1) {
                resolve(json.data);
              }
            });
        }
      },
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
        coverType: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择"
          }
        ],
        articleCategory: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择"
          }
        ],
        carCategory: [
          {
            required: true,
            trigger: ["blur", "change"],
            message: "请选择"
          }
        ]
      }
    };
  },
  methods: {
    loadData(id) {
      this.$http.get("/article/" + id).then(json => {
        if (json.code == 1) {
          this.article = json.data;
          this.article.content = this.$util.toHtml(this.article.content);
          this.coverList = this.article.coverList;
          if (this.article.carCategory) {
            this.$nextTick(() => {
              this.$http
                .get("/carClass/" + this.article.carCategory)
                .then(json => {
                  if (json.code == 1) {
                    this.$refs.carSelector.select(json.data);
                  }
                });
            });
          }
        }
      });
    },
    selectCategory(item) {
      if (item) {
        this.$http.get("/carClass/list", { model: item.model }).then(json => {
          if (json.code == 1) {
            this.options = json.data;
          }
        });
      }
    },
    draft() {
      this.$refs.articleForm.validate(valid => {
        if (!valid) {
          return;
        }
        this.article.coverList = this.coverList;
        this.$http.post("/article/draft", this.article).then(json => {
          if (json.code == 1) {
            this.$router.push({
              path: "/article/myList"
            });
          }
        });
      });
    },
    publish() {
      this.$refs.articleForm.validate(valid => {
        if (!valid) {
          return;
        }
        this.article.coverList = this.coverList;
        this.$http.post("/article/toApprove", this.article).then(json => {
          if (json.code == 1) {
            this.$router.push({
              path: "/article/myList"
            });
          }
        });
      });
    },
    getCover() {
      let list = [];
      let imgs = this.$refs.editor.$refs.mce.editor.$("img");
      if (imgs.length == 0) {
        this.coverList = list;
        return;
      }
      if (this.article.coverType === 1) {
        list.push({ imgUrl: imgs[0].src, articleId: this.articleId });
      } else {
        imgs.each((i, item) => {
          list.push({ imgUrl: item.src, articleId: this.articleId });
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
  mounted() {
    if (this.$route.name == "editArticle") {
      this.loadData(this.$route.params.id);
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "editArticle") {
        this.loadData(to.params.id);
      }
    }
  }
};
</script>