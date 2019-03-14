<template>
  <div v-if="item.children">
    <template v-if="item.children.length == 0">
      <el-menu-item :index="item.url">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </template>

    <el-submenu v-else :index="item.url||item.id+''" :popper-append-to-body="poperToBody" :unique-opened="uniqueOpen" >
      <template slot="title">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </template>

      <template v-for="child in item.children">
        <sider-menu-item
          v-if="child.children&&child.children.length>0"
          :item="child"
          :key="child.id"
        />
        <el-menu-item v-else :key="child.id" :index="child.url">
          <i :class="child.icon"></i>
          <span slot="title">{{child.name}}</span>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>


<script>
export default {
  name: 'SiderMenuItem',
  data(){
    return {
      poperToBody:true,
      uniqueOpen:false
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods:{
    hover(e){
      console.log(e)
    }
  }
}
</script>