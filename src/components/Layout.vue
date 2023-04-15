<template>
  <!-- <el-container>
    <el-aside><my-header /></el-aside>
    <el-main><slot></slot></el-main>
  </el-container> -->
  <el-container>
    <el-header><my-top /></el-header>
  <el-container>
    <el-aside width="200px"><my-header /></el-aside>
    <el-main><slot></slot></el-main>
  </el-container>
</el-container>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import Header from "./Header";
import Top from "./Top";

export default {
  name: "App",
  components: { "my-header": Header, 
                "my-top": Top 
              },
  setup() {
    const route = useRoute();
    const footerShow = ref(true);
    onMounted(() => {
      switch (route.path) {
        case "/docs":
          footerShow.value = false;
          break;
        case "/utils":
          footerShow.value = false;
          break;
        default:
          footerShow.value = true;
          break;
      }
    });
    return { footerShow };
  },
};
</script>

