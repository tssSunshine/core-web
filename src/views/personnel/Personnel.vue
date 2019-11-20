<template>
  <el-container>
    <el-header style="text-align: right; font-size: 16px">
      <span style="float: left;font-weight: bold;font-size: 20px;">CORE</span>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>Admin</span>
    </el-header>
    <el-container style="height: 910px;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']" router="true">
          <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
            <span slot="title">控制台</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-info"></i>
            <span slot="title">个人中心</span>
          </el-menu-item>
          <el-menu-item index="3" route="/department">
            <i class="el-icon-document"></i>
            <span slot="title">部门</span>
          </el-menu-item>
          <el-menu-item index="4" class="active" route="/personnel">
            <i class="el-icon-user-solid"></i>
            <span slot="title">员工</span>
          </el-menu-item>
          <el-menu-item index="5" route="/project">
            <i class="el-icon-set-up"></i>
            <span slot="title">项目</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-office-building"></i>
            <span slot="title">工地</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-place"></i>
            <span slot="title">监测点</span>
          </el-menu-item>
          <el-menu-item index="8">
            <i class="el-icon-s-platform"></i>
            <span slot="title">工地监测管理</span>
          </el-menu-item>
          <el-menu-item index="9" route="/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户</span>
          </el-menu-item>
          <el-menu-item index="10">
            <i class="el-icon-s-check"></i>
            <span slot="title">角色</span>
          </el-menu-item>
          <el-menu-item index="11">
            <i class="el-icon-location"></i>
            <span slot="title">定位</span>
          </el-menu-item>
          <el-menu-item index="12">
            <i class="el-icon-s-help"></i>
            <span slot="title">关于我们</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-page-header  content="员工" style="margin-bottom: 20px;">
        </el-page-header>
        <form class="el-form query-form el-form--label-right el-form--inline" style="text-align: left;">
          <div class="el-form-item el-form-item--medium">
            <label  class="el-form-item__label" style="width: 60px;">名称</label>
            <div class="el-form-item__content">
              <div class="el-input el-input--medium">
                <input autocomplete="off" placeholder="请输入名称" type="text"  rows="2" validateevent="true"
                           class="el-input__inner" style="width: 300px;" v-model="queryParam">
              </div>
          </div>
          </div>
          <div class="el-form-item el-form-item--medium">
            <div class="el-form-item__content">
              <button type="button" class="el-button el-button--primary el-button--medium" @click="refreshPersonTable">
                <i class="el-icon-search"></i><span>搜索</span>
              </button>
            </div>
          </div>
          <button type="button" class="el-button el-button--primary el-button--medium" @click="addPersonnel" style="float: right;">
            <i class="el-icon-circle-plus-outline"></i><span>创建</span>
          </button>
        </form>
        <template>
          <el-table
            :data="tableData"
            style="width: 100%" ref="table">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="员工代码"
              width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.personnelID }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="姓名"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.fullName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="联系电话"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.phoneNumber }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="电子邮件"
              width="280">
              <template slot-scope="scope">
                <span>{{ scope.row.email }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="部门"
              width="180">
              <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper" @click="openDepartmentInfo(scope.row)">
                    <el-tag size="medium">{{ scope.row.departmentName }}</el-tag>
                  </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="sex" width="180"
              label="职位" :formatter="formatPosition">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-main>

      <el-dialog title="部门信息" :visible.sync="departmentFormVisible">
        <DepartmentInfo :departmentFormVisible="departmentFormVisible" @change-visible="onChangeVisible"
                        v-bind:departmentForm="departmentForm"></DepartmentInfo>
      </el-dialog>

      <el-dialog title="员工信息" :visible.sync="personFormVisible">
        <PersonnelInfo :personFormVisible="personFormVisible" @change-personFormVisible="onChangePersonFormVisible"
                       v-bind:personForm="personForm" @refreshPersonTable="refreshPersonTable"></PersonnelInfo>
      </el-dialog>

    </el-container>
  </el-container>
</template>


<script>

  import {API_findDepartmentList,API_findDepartmentById} from '../../api/department/index'
  import {API_findPersonnelById,API_queryPersonnelList,API_deletePersonnel} from '../../api/personnel/index'
  import DepartmentInfo from "../../components/department/DepartmentInfo";
  import PersonnelInfo from "../../components/personnel/PersonnelInfo";

export default {

    components:{DepartmentInfo,PersonnelInfo},

  data () {
    return {
        queryParam:'',
        tableData: [],
        departmentForm: {},
        departmentFormVisible: false,
        personForm: {},
        personFormVisible: false,
    }
  },
    mounted: function() {
        this.refreshPersonTable();
    },
    methods:{
        // 刷新员工列表
        refreshPersonTable() {
            this.tableData = [];
            API_queryPersonnelList(this.queryParam)
                .then(response => {
                    this.tableData = response.data // 员工表格数据
                })
                .catch(error => {
                    console.log(error)
                })
        },
        // 新建员工信息
        addPersonnel() {
            this.personForm = {};
            this.personFormVisible = true;
        },
        // 编辑部门信息
        handleEdit(index, row){
            this.personForm = row;
            this.personFormVisible = true;
        },
        // 删除部门信息
        handleDelete(index, row) {
            API_deletePersonnel(row.id).then(response => {
               this.refreshPersonTable();
            }).catch(error => {
                this.$message.error('删除失败！');
                console.log(error)
            });
        },
        // 打开部门详情框
        openDepartmentInfo(row) {
            API_findDepartmentById(row.departmentID).then(response => {
                this.departmentForm = response.data;
                this.departmentFormVisible = true;
            }).catch(error => {
                this.$message.error('查询部门信息失败！');
                console.log(error)
            });
        },
        // 改变部门详情框显示状态
        onChangeVisible(visible) {
            this.departmentFormVisible = visible;
        },
        // 改变员工详情框显示状态
        onChangePersonFormVisible(visible) {
            this.personFormVisible = visible;
        },
        formatPosition(row, column){
            return row.position == 0 ? "部门主负责人" : row.position == 1 ? "部门副负责人" : "部门员工"
        }
    }
}
</script>

<style>
  .el-header {
    background-color: #409EFF;
    color: #ffffff;
    line-height: 60px;
    font-size: 16px;
  }

  .el-aside {
    color: #333;
  }

  .el-menu li {
    text-align: left;
  }

  .el-page-header__content {
    font-weight: bold;
  }

  .el-dropdown {
    display: inline-block;
    position: relative;
    color: #ffffff;
    font-size: 16px;
  }
  .el-dialog__title{
    font-weight: bold;
  }
</style>
