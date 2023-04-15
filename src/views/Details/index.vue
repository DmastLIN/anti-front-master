<template>
  <layout>
    <el-card class="che-box1" shadow="always">
      <h1> 任务详情 </h1>
      <div class="header">
        <el-text class="mx-1" style="margin-right: 20px;">粒度:</el-text>

          <el-input
          v-model="state.searchProj"
          size="middle"
          placeholder="查询内容"
          style="width: 200px ;margin-right: 80px; "
        />
        <el-text class="mx-1" style="margin-right: 20px;">筛选:</el-text>
        
          <el-input
          v-model="state.searchProj"
          size="middle"
          placeholder="查询内容"
          style="width: 200px ;margin-right: 80px; "
        />
      </div>
      <div class="menu">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1" @click="statistics()">统计</el-menu-item>
          <el-menu-item index="2" @click="details()">详细</el-menu-item>
        </el-menu>

      </div>
    </el-card>
    <div class="box2">
      <el-card class="che-box4" shadow="always">
        <div>
        <el-text style="padding-left: 30px;">类型：</el-text>
        <el-select v-model="value" class="m-2" style="padding: 15px;" placeholder="Select">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
        </el-select>
        </div>
        <div>
        <el-text style="padding-left: 30px;">&nbsp;&nbsp;&nbsp;&nbsp;ID：</el-text>
        <el-select v-model="value" class="m-3" style="padding: 15px;" placeholder="Select">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
        </el-select>
        </div>
      </el-card>
      <el-card class="che-box5" shadow="always">
      </el-card>
      <el-card class="che-box6" shadow="always">
      </el-card>
      <el-card class="che-box2" shadow="always">
        <h3> 原生</h3>
        <el-divider />
        <el-card shadow="hover" style="height: 340px;"> Content </el-card>
      </el-card>
      <el-card class="che-box3" shadow="always">
        <h3>伴生</h3>
        <el-divider />
        <el-card shadow="hover" style="height: 340px;"> Content </el-card>
      </el-card>
    </div>
  </layout>
</template>
<script>
import { ref, getCurrentInstance } from "vue";
import Layout from "../../components/Layout";
//import RecCard from "./components/RecCard";
import { recommendAfterFetch } from "../../api/recommend";

export default {
  components: {
    Layout,
    //"rec-card": RecCard,
  },
  methods: {
    statistics(){
      this.$router.push('/check')
    },
    details(){
      this.$router.push('/details')
    }
  },
  setup() {
    const options1 = [
      {
        value: 'Option1',
        label: '运行中',
      },
      {
        value: 'Option2',
        label: '已完成',
      },
      {
        value: 'Option3',
        label: '关闭',
      },
      {
        value: 'Option4',
        label: '已上线',
      },
      {
        value: 'Option5',
        label: '异常',
      },
    ]
    const options2 = [
      {
        value: 'Option1',
        label: '运行中',
      },
      {
        value: 'Option2',
        label: '已完成',
      },
      {
        value: 'Option3',
        label: '关闭',
      },
      {
        value: 'Option4',
        label: '已上线',
      },
      {
        value: 'Option5',
        label: '异常',
      },
    ]
    const { proxy } = getCurrentInstance();
    const state = ref({
      gitUrl: "",
      fileList: [],
      gitOptions: [
        { value: "https://github.com/", label: "https://github.com" },
        { value: "https://gitee.com/", label: "https://gitee.com" },
      ],
      gitOption: "https://github.com/",
      features: ["degree"],
      featureOptions: ["degree", "drh", "maintenance"],
      degreeTop: "10",
      mcTop: "10",
      topOptions: ["10", "15", "20", "30"],
      calLoading: false,
    });

    const getRecommendFiles = () => {
      state.value.calLoading = true;
      if (state.value.gitUrl === "") {
        proxy.$message.warning("Please input Repository Name");
        state.value.calLoading = false;
        return;
      }
      recommendAfterFetch({
        git_source: state.value.gitOption,
        git_url: state.value.gitUrl,
        features: state.value.features,
        top: [state.value.degreeTop, state.value.mcTop],
      }).then(
        (res) => {
          state.value.fileList = res.data.recommend;
          state.value.calLoading = false;
        },
        () => {
          state.value.calLoading = false;
        }
      );
    };
    return { state, getRecommendFiles, options1, options2};
  },
};
</script>
<style>
.che-box1 {
  margin: 20px;
  padding: 10px 10px; 
  text-align: left;
}
.box2 {
  margin: 20px;
  text-align: start;
  height: 1000px;
  width: 1000px;
}
.che-box2 {
  margin: 20px 0 20px 0;
  padding: 10px 10px; 
  text-align: start;
  height: 450px;
  width: 800px;
}
.box3 {
  margin-left: 820px;
  text-align: start;
  height: 320px;
  width: 800px;
}
.che-box3 {
  margin: 20px 0 20px 0;
  padding: 10px 10px; 
  text-align: start;
  height: 450px;
  width: 800px;
}
.che-box4 {
  position: absolute;
  margin: 0px 20px 20px 840px;
  text-align: start;
  height: 150px;
  width: 440px;
}
.che-box5 {
  position: absolute;
  margin: 170px 20px 20px 840px;
  text-align: start;
  height: 450px;
  width: 440px;
}
.che-box6 {
  position: absolute;
  margin: 640px 20px 20px 840px;
  text-align: start;
  height: 320px;
  width: 440px;
}
.header {
  padding: 20px 10px 10px 10px; 
  text-align: left;
}
.menu {
  padding: 10px 10px; 
  text-align: left;
}
</style>