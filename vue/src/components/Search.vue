<template>
  <!--      搜索栏-->
  <el-row>
    <el-col :span="8">
      <a href="/topview">
        <img src="../resource/img/logo.png" style="float: right;width: 100px;height: 100px"/>
      </a>
    </el-col>
    <el-col :span="16">
      <div class="search" style="display: inline-block">
        <div style="height: 60px;margin-left: 30px">
          <input @keydown.enter="$emit('search',searchText)" type="text" placeholder="请输入要查找的商品" v-model="searchText">
          <button @click="$emit('search',searchText)"></button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Search",
  data(){
    return{
      searchText:'',
    }
  }

}
</script>

<style scoped>

</style>