<template>
  <div class="home">
    <img-news>
    </img-news>
    <el-row :gutter="10">
      <el-col :span="18">
          <title-bar title="EV观" color="#f35757" url="/list"></title-bar>
          <ev-news></ev-news>
          <title-bar title="E车讯" color="#1e73be" url="/list"></title-bar>
          <ecar-news></ecar-news>
      </el-col>
      <el-col :span="6">
          <title-bar title="最热" color="#1e73be" url="/list" :more="0"></title-bar>
      </el-col>
    </el-row>
    <el-row>
        <title-bar title="科技苑" color="rgba(209,169,27,.83)" url="/list">
        </title-bar>
        <tech-news></tech-news>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="18">
        <title-bar title="精选文章" color="rgba(55,220,60,.82)" url="/list"></title-bar>
        <ev-news></ev-news>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
          <title-bar title="燃漫" color="rgba(55,220,60,.82)" url="/list"></title-bar>
          <hot-news></hot-news>
      </el-col>
      <el-col :span="8">
          <title-bar title="精彩热点" color="rgba(55,220,60,.82)" url="/list"></title-bar>
          <hot-news></hot-news>
        </el-col>
        <el-col :span="8">
            <title-bar title="精彩热点" color="rgba(55,220,60,.82)" url="/list"></title-bar>
            <hot-news></hot-news>
        </el-col>
    </el-row>
    
  </div>
</template>
<style scoped>
  .home{
    overflow: hidden;
  }
</style>

<script>
import ImgNews from '@/components/img-news';
import TitleBar from '@/components/title-bar';
import EvNews from '@/components/ev-news';
import EcarNews from '@/components/ecar-news';
import TechNews from '@/components/tech-news';
import HotNews from '@/components/hot-news';
export default {
  name: "Home",
  components:{
    'img-news':ImgNews,
    'title-bar':TitleBar,
    'ev-news':EvNews,
    'ecar-news':EcarNews,
    'tech-news':TechNews,
    'hot-news':HotNews,
  },
  data() {
    return {
      
    };
  },
  created() {
  },
  methods: {
    getData() {
    }
  }
};
</script>
