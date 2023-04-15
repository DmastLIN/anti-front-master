<template>
  <layout>
    <swiper :url="imageArray" />
    <introduction></introduction>
  </layout>
</template>

<script>
import { ref } from "vue";
import Layout from "../../components/Layout.vue";
import Swiper from "../../components/Swiper";
import Introduction from "./components/Introduction";
export default {
  name: "home",
  components: {
    Swiper,
    layout: Layout,
    introduction: Introduction,
  },

  setup() {
    const activeName = ref("1");
    const imageArray = ["1.jpg", "2.jpg"];

    return { activeName, imageArray };
  },
};
</script>


<style scoped>
imageArray{
  width: 100%;
}
.module-intro {
  height: 100%;
  margin: 20px;
  padding: 20px 0;
  text-align: center;
}

</style>