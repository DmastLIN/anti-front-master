<template>
    <el-header style="text-align: right; font-size: 16px">
        <div class="toolbar">
          <el-icon style="color: #333; margin: 20px;"><Search /></el-icon>
          <el-icon style="color: #333; margin: 20px;"><Bell /></el-icon>
          <el-icon style="color: #333; margin: 20px;"><Tools /></el-icon>
          <span style="margin: 20px;" truncated>
            <el-icon><UserFilled /></el-icon>
            UserName
          </span>
        </div>
      </el-header>
</template>

<script>

  export default {
    name: "myTop",
  }
</script>

<style>
    .el-header {
    background-color: #a9acaf;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>