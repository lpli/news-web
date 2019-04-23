<template>
    <div>
        <div class="op-btn">
            <el-button size="small">审核通过</el-button>
            <el-button size="small">审核不通过</el-button>
            <el-input type="textareas" placeholder="请输入审核意见" :rows="4"></el-input>
        </div>
        <article-view ref="view"></article-view>
    </div>
</template>
<script>
import ArticleView from '@/components/article-view';
export default {
    name:'ArticleApprove',
    components:{ArticleView},
    data(){
        return {

        }
    },
    mounted(){
        this.loadArticle();
    },
    methods:{
        loadArticle(){
            this.$refs.view.getArticle(this.$route.params.id);
        }
    }

    
}
</script>
