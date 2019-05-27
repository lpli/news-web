<template>
  <div class="car-selector" ref="car-selector">
    <el-input type="text" suffix-icon="el-icon-third-down"></el-input>
    <div class="category-div">
      <div class="letter-div">
        <div
          class="letter-i"
          v-for="item in letters"
          :key="item"
          @click="changeLetter(item)"
        >{{item}}</div>
      </div>
      <div class="band-div">
        <div class="band-i" v-for="item in letters" :key="item" v-if="brands[item]">
          <div class="band-c" :data-c="item">{{item}}</div>
          <div class="band-t" v-for="e in brands[item]" :key="e" @click="getModel(e)">{{e}}</div>
        </div>
      </div>
      <div class="model-div" v-show="showModel">
        <div class="model-i">全部车系</div>
        <div v-for="k in Object.keys(models)" :key="k">
          <div class="model-c">{{k}}</div>
          <div class="model-t" v-for="item in models[k]" :key="item.model">{{item.model}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.car-selector {
  height: 1000px;
  position: relative;
  .category-div {
    position: absolute;
    border: 1px solid #ccc;
    height: 520px;
    width: 230px;
    .letter-div {
      height: 100%;
      background: #f5f5f5;
      border-right: 1px solid #ccc;
      float: left;
      text-align: center;
      .letter-i {
        width: 15px;
        font-size: 12px;
        line-height: 12px;
        padding: 4px 6px;
        color: #666;
        cursor: pointer;
        &:hover {
          color: #fff;
          background-color: #409eff;
          font-weight: 600;
        }
      }
    }
    .band-div {
      float: left;
      width: 200px;
      height: 100%;
      text-align: left;
      line-height: 30px;
      overflow-y: auto;
      font-size: 15px;
      .band-c {
        padding-left: 15px;
        background: #ecf5ff;
        color: #409eff;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        font-weight: 500;
      }
      .band-t {
        padding-left: 18px;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        &:hover {
          background: #409eff;
          color: #fff;
        }
      }
    }
    .model-div {
      width: 200px;
      position: absolute;
      left: 200px;
      height: 100%;
      border: 1px solid #ccc;
      background: #fff;
      top: -1px;
      text-indent: 1em;
      .model-i,
      & > div {
        line-height: 30px;
        font-size: 15px;
        border-bottom: 1px solid #ccc;
        .model-c {
          border-bottom: 1px solid #ccc;
          background: #ecf5ff;
          color: #409eff;
          font-weight: 600;
        }
        .model-t {
          &:hover {
            background: #409eff;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      brandList: [],
      modelList: [],
      showModel: false,
      letters: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ]
    };
  },
  mounted() {
    this.getBrand();
  },
  computed: {
    brands() {
      let brands = {};
      this.brandList.forEach(item => {
        if (!brands.hasOwnProperty(item.letter)) {
          brands[item.letter] = [];
        }
        brands[item.letter].push(item.brand);
      });
      return brands;
    },
    models() {
      let models = {};
      this.modelList.forEach(item => {
        if (!models.hasOwnProperty(item.company)) {
          models[item.company] = [];
        }
        models[item.company].push(item);
      });
      return models;
    }
  },
  methods: {
    getBrand() {
      this.$http.get("/carBrand/list").then(json => {
        if (json.code == "1") {
          this.brandList = json.data;
        }
      });
    },
    changeLetter(item) {
      let target = this.$refs["car-selector"].querySelector(
        '.band-c[data-c="' + item + '"]'
      );
      if (target) {
        this.$refs["car-selector"].querySelector(".band-div").scrollTop =
          target.offsetTop;
      }
    },
    getModel(brand) {
      this.showModel = true;
      this.$http.get("/carModel/list", { brand: brand }).then(json => {
        if (json.code == "1") {
          this.modelList = json.data;
        }
      });
    }
  }
};
</script>

