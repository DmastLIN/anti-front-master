<template>
  <div>
    <div class="list-box">
      <div class="list-title">
        <div class="title-text">

          <el-text class="mx-1" style="margin: 30px;">规则编号:</el-text>

          <el-input
          v-model="state.searchProj"
          size="middle"
          placeholder="查询内容"
          style="width: 200px ;margin-right: 80px; "
        />

          <el-text class="mx-1" style="margin: 30px;">状态：</el-text>
          <!-- <el-select-v2           //多选
            v-model="value"
            :options="options"
            placeholder="Please select"
            style="width: 240px"
            multiple
          /> -->
          <el-select v-model="label" class="m-2" placeholder="Select" style="width: 200px; margin-right: 150px; ">
            {{ state.mode }}
          <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          />
          </el-select>

          <el-button type="primary" style="margin-right: 30px;">查询</el-button>

          <el-button round>重置</el-button>

        </div>
        
        <div class="title-tool">
          <upload-proj></upload-proj>
          <el-button style="margin-left: 20px ;margin-right: 20px;">批量操作</el-button>
          <el-dropdown>
            <el-button>
            更多操作<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
                <el-dropdown-item>Action 5</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

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
          <el-table-column fixed prop="list" label="扫描序列" width="100" />
          <el-table-column prop="proto" label="原生节点" width="250" />
          <el-table-column prop="assoc" label="伴生节点" width="250" />
          <el-table-column prop="state" label="状态" width="150" />
          <el-table-column prop="date" label="扫描时间" width="250" />
          <el-table-column fixed="right" prop="operate" label="操作" width="100" >
            <template #default>
              <el-button link type="primary" size="small" @click="Check()">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="state.currentPage"
          :page-size="state.currentPageSize"
          layout="total, prev, pager, next"
          :total="state.projectCount"
        >
        </el-pagination>
      </div>
    </div>
    <div>
      <el-dialog v-model="state.infoVisible" destroy-on-close width="800px">
        <div
          v-loading="state.graphDataLoading"
          element-loading-text="First loading need much time"
          id="typing-info"
          class="info-card"
        />
      </el-dialog>
    </div>
  </div>
</template>



<script>
import { onMounted, ref, getCurrentInstance } from "vue";
import UploadProj from "./UploadProj";
import { getProjectList } from "../../../api/proj";
import { getProjectCoverage } from "../../../api/coverage";
import { getProjectUsage } from "../../../api/usage";
import { getProjectPattern } from "../../../api/pattern";
import * as echarts from "echarts";
import { jsonToTable } from "../../../utils/jsonToTable";

//import { ElTable } from 'element-plus';


export default {
  components: {
    "upload-proj": UploadProj,
  },

  methods: {
    Check(){
      this.$router.push('/check')
    }
  },

  setup() {
    const { proxy } = getCurrentInstance();
    var myChart;
    const state = ref({
      projectList: [],
      projectCount: 0,
      coverage: {},
      infoVisible: false,
      searchProj: "",
      currentPage: 1,
      currentPageSize: 10,
      dataLoading: false,
      graphDataLoading: false,
      value:"",
    });

    
    // const multipleSelection = ref<tableData>([])
    // const handleSelectionChange = (val: tableData[]) => {
    //   multipleSelection.value = val
    // }

    const tableData = [
        {
          list: '1',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '已完成',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '2',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '运行中',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '3',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '已完成',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '4',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '运行中',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '5',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '运行中',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '6',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '异常',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '7',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '运行中',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '8',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '已完成',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '9',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '运行中',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '10',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '已完成',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '11',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '运行中',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '12',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '已完成',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '13',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '运行中',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '14',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '运行中',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '15',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '已完成',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '16',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '运行中',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '17',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '已完成',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '18',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '已完成',
          date: '2017-10-31 23：12：00',
        },
        {
          list: '19',
          proto: 'android12.0.0',
          assoc: '12151a151e5f15ea1f6e5',
          state: '已完成',
          date: '2017-10-31 23：12：00',
        },
        
      ]

    const options = [
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



    const showTypingInfo = (row) => {
      console.log(row);
      state.value.infoVisible = true;
    };

    const getProjects = (params) => {
      getProjectList(params).then(
        (res) => {
          state.value.projectList = res.data.res;
          state.value.projectCount = res.data.count;
          state.value.dataLoading = false;
        },
        () => {
          state.value.dataLoading = false;
        }
      );
    };

    const getCoverage = (project_id, project_name) => {
      state.value.infoVisible = true;
      state.value.graphDataLoading = true;
      getProjectCoverage(project_id).then(
        (res) => {
          showGraph(res.data, "Coverage", project_name);
        },
        () => {
          state.value.graphDataLoading = false;
        }
      );
    };

    const getUsage = (project_id, project_name) => {
      state.value.infoVisible = true;
      state.value.graphDataLoading = true;
      getProjectUsage(project_id).then(
        (res) => {
          showGraph(res.data, "Usage", project_name);
        },
        () => {
          state.value.graphDataLoading = false;
        }
      );
    };

    const getPattern = (project_id, project_name) => {
      state.value.infoVisible = true;
      state.value.graphDataLoading = true;
      getProjectPattern(project_id).then(
        (res) => {
          showGraph(res.data.pattern_count, "Pattern", project_name);
        },
        () => {
          state.value.graphDataLoading = false;
        }
      );
    };

    const showGraph = (dataSet, infoType, project_name) => {
      proxy.$nextTick(() => {
        if (myChart !== null && myChart !== "" && myChart !== undefined) {
          myChart.dispose();
        }
        myChart = echarts.init(document.getElementById("typing-info"));
        var option = jsonToTable(dataSet, infoType, project_name);
        myChart.setOption(option);
        state.value.graphDataLoading = false;
      });
    };

    const handleCurrentChange = (currentPage) => {
      state.value.dataLoading = true;
      getProjectList({
        page: currentPage - 1,
        limit: state.value.currentPageSize,
      }).then(
        (res) => {
          state.value.projectList = res.data.res;
          state.value.projectCount = res.data.count;
          state.value.dataLoading = false;
          state.value.currentPage = currentPage;
        },
        (res) => {
          proxy.$message.error(res.msg);
          state.value.dataLoading = false;
        }
      );
    };

    onMounted(() => {
      state.value.dataLoading = true;
      proxy.getProjects({
        page: state.value.currentPage - 1,
        limit: state.value.currentPageSize,
      });
    });

    return {
      state,
      showTypingInfo,
      getProjects,
      getCoverage,
      getUsage,
      getPattern,
      handleCurrentChange,
      showGraph,
      options,
      tableData,
      //handleSelectionChange,
    };
  },
};
</script>

<style scoped>
.list-box {
  padding: 30px;
  background-color: #ffffff;
  height: 550px;
  position: relative;
}
.list-title {
  box-sizing: border-box;
  height: 160px;
  width: 100%;
  background-color: #ffffff;
}
.title-text {
  box-sizing: border-box;
  height: 70px;
  padding: 10px;
  font-size: 28px;
  text-align: start;
}
.title-tool {
  box-sizing: border-box;
  height: 90px;
  padding: 10px;
  display: flex;
  justify-content: left;
}
.pagination {
  position: absolute;
  bottom: 10px;
  height: 30px;
  padding: 10px;
  right: 10px;
}

.info-card {
  height: 400px;
  width: 700px;
  padding: 0;
  text-align: center;
  background: #fff;
}
</style>