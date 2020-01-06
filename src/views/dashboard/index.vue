<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span
        v-for="role in roles"
        :key="role"
      > {{ role }} </span></div>
    <div class="dashboard-text">permissions:<span
        v-for="permission in permissions"
        :key="permission"
      > {{ permission }} </span></div> -->

  </div>
</template>

<script>


export default {
  name: 'Dashboard',
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .el-row {
    margin-bottom: 0px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 9px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 9px;
    min-height: 554px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #174196;
  }

  .component-item {
    min-height: 360px;
  }

  .card-title {
    font-size: 20px;
    color: green;
  }
</style>
