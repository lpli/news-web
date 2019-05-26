<template>
  <div class="car-selector">
    <el-input type="text" suffix-icon="el-icon-third-down"></el-input>
    <div class="category-div">
      <div class="letter-div">
        <div class="letter-i" v-for="item in letters" :key="item">{{item}}</div>
      </div>
      <div class="band-div">
          <div class="band-i" v-for="item in letters" :key="item" v-if="bands[item]">
              <div class="band-c">{{item}}</div>
              <div class="band-t" v-for="e in Object.keys(bands[item])" :key="e"> 
                  {{e}}
              </div>
          </div>
      </div>
      <div class="model-div">
          <div v-for="item in models" :key="item">
              {{item}}
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
    height:770px;
    width:400px;
    .letter-div{
        width: 31px;
        height:100%;
        background: #f5f5f5;
        border-right: 1px solid #ccc;
        float:left;
        text-align: center;
        .letter-i{
            width: 15px;
            font-size:12px;
            line-height: 20px;
            padding:5px 8px;
            color:#666;
            cursor: pointer;
            &:hover{
                color:#409EFF;
                font-weight: 600;
            }
        }
    }
    .band-div{
        float:left;
        width:180px;
        height:100%;
        text-align: left;
        line-height: 40px;
        height:40px;
        .band-c{
            padding-left:15px;
            background: #ecf5ff;
            color:#409EFF;
            border-right:1px solid #ccc;
            border-bottom:1px solid #ccc;
        }
        .band-t{
            padding-left:18px;
            border-right:1px solid #ccc;
            border-bottom:1px solid #ccc;
        }

    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      bands:[],
      models:[],
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
  mounted(){
    this.getCategory();
  },
  methods:{
    getCategory(){
        this.$http.get('/carCategory/config').then(json=>{
            if(json.code == '1'){
                this.bands = json.data;
            }
        })
    }
    
  }
};
</script>

