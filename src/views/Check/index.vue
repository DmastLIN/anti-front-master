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
    <el-card class="check-box2" shadow="always">
      <div class="list-header">
        <el-table
          ref="multipleTableRef"
          @selection-change="handleSelectionChange"

          v-loading="state.dataLoading"
          :data="
            /*state.projectList.filter(
              (data) =>
                !state.searchProj ||
                data.project_name
                  .toLowerCase()
                  .includes(state.searchProj.toLowerCase())
            )*/
            tableData
          "
          style="width: 100%"
          max-height="350"
          fit
          :cell-style="{'text-align':'left'}"
        >
          <el-table-column fixed type="selection" width="55" />
          <el-table-column fixed prop="list" label="粒度" width="100" />
          <el-table-column prop="proto" label="反模式1" width="150" />
          <el-table-column prop="assoc" label="反模式2" width="150" />
          <el-table-column prop="state" label="反模式3" width="150" />
          <el-table-column prop="date" label="..." width="250" />
          <!-- <el-table-column fixed="right" prop="operate" label="操作" width="100" >
            <template #default>
              <el-button link type="primary" size="small" @click="Check()">查看</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
    </el-card>
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
    const tableData = [
        {
          list: 'filepath1',
          proto: '10',
          assoc: '39',
          state: '40',
          date: '53',
        },
        {
          list: 'filepath1',
          proto: '10',
          assoc: '39',
          state: '40',
          date: '53',
        },
        {
          list: 'filepath1',
          proto: '10',
          assoc: '39',
          state: '40',
          date: '53',
        },
        {
          list: 'filepath1',
          proto: '10',
          assoc: '39',
          state: '40',
          date: '53',
        },
        {
          list: 'filepath1',
          proto: '10',
          assoc: '39',
          state: '40',
          date: '53',
        },
        {
          list: 'filepath1',
          proto: '10',
          assoc: '39',
          state: '40',
          date: '53',
        },
        {
          list: 'filepath1',
          proto: '10',
          assoc: '39',
          state: '40',
          date: '53',
        },
        {
          list: 'filepath1',
          proto: '10',
          assoc: '39',
          state: '40',
          date: '53',
        },
        {
          list: 'filepath1',
          proto: '10',
          assoc: '39',
          state: '40',
          date: '53',
        },
        {
          list: 'filepath1',
          proto: '10',
          assoc: '39',
          state: '40',
          date: '53',
        },
        {
          list: 'filepath1',
          proto: '10',
          assoc: '39',
          state: '40',
          date: '53',
        },
        {
          list: 'filepath1',
          proto: '10',
          assoc: '39',
          state: '40',
          date: '53',
        },
        {
          list: 'filepath1',
          proto: '10',
          assoc: '39',
          state: '40',
          date: '53',
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
    return { state, getRecommendFiles ,tableData};
  },
};
</script>
<style>
.che-box1 {
  margin: 20px;
  padding: 10px 10px; 
  text-align: left;
}
.check-box2 {
  margin: 20px;
  padding: 10px 10px; 
  text-align: start;
  height: 450px;
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