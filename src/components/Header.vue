<template>
  <div class="header-wapper">
    <el-menu class="nav-header" :default-active="state.defaultIndex" mode="vertical" @select="handleSelect"
      background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item>
        <div><el-icon><Menu /></el-icon></div>
      </el-menu-item>
      <el-menu-item index="1"><el-icon><House /></el-icon>Home</el-menu-item>
      <el-menu-item index="2"><el-icon><Files /></el-icon>Projects</el-menu-item>
      <!-- <el-sub-menu index="3">
        <template #title><el-icon><Expand /></el-icon>Evaluation</template>
        <el-menu-item index="3-1"><el-icon><Grid /></el-icon>Coverage</el-menu-item>
        <el-menu-item index="3-2"><el-icon><Grid /></el-icon>Usage</el-menu-item>
        <el-menu-item index="3-3"><el-icon><Grid /></el-icon>Commit</el-menu-item>
      </el-sub-menu> -->
      <!-- <el-menu-item index="4"><el-icon><Tickets /></el-icon>Recommend</el-menu-item> -->
      <!-- <el-menu-item index="5"><el-icon><Ticket /></el-icon>Static</el-menu-item> -->
    </el-menu>
    <!-- <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item>
          <div
            v-if="!islogin"
            class="header-wapper__login-button"
            @click="login"
          >
            Login
          </div>
          <div v-else class="header-wapper__personal" @click="personal">
            <div class="el-icon-user"></div>
            个人中心
          </div>
        </el-menu-item>
      </el-menu> -->
  </div>
</template>  

<script>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "myHeader",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const state = ref({
      defaultIndex: "1",
    });
    const islogin = ref(false);

    onMounted(() => {
      switch (route.path) {
        case "/":
          state.value.defaultIndex = "1";
          break;
        case "/projects":
          state.value.defaultIndex = "2";
          break;
        case "/coverage":
          state.value.defaultIndex = "3-1";
          break;
        case "/usage":
          state.value.defaultIndex = "3-2";
          break;
        case "/commit-cov":
          state.value.defaultIndex = "3-3";
          break;
        case "/recommend":
          state.value.defaultIndex = "4";
          break;
        case "/static":
          state.value.defaultIndex = "5";
          break;
      }
    });

    const handleSelect = (key) => {
      switch (key) {
        case "1":
          router.push({ path: "/" });
          break;
        case "2":
          router.push({ path: "/projects" });
          break;
        case "3-1":
          router.push({ path: "/coverage" });
          break;
        case "3-2":
          router.push({ path: "/usage" });
          break;
        case "3-3":
          router.push({ path: "/commit-cov" });
          break;
        case "4":
          router.push({ path: "/recommend" });
          break;
        case "5":
          router.push({ path: "/static" });
          break;
      }
    };

    const login = () => {
      router.push({ path: "/login" });
    };

    return { state, islogin, handleSelect, login };
  },
};
</script>


<style lang="less">
.header-wapper {
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  background-color: #545c64;
  width: 100%;
  height: 100%;

  &__login-button {
    color: #fff;
    width: 60px;
  }

  &__personal {
    color: #fff;
    width: 80px;
  }
}

.nav-header {
  display: block;
}

.el-menu {
  display: block;
  border: 0px;
}

.el-menu--horizontal {
  overflow: hidden;
  flex-wrap: nowrap;
}

.el-dropdown-link {
  color: #ffffff;
}
</style>