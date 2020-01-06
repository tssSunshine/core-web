<template>
  <el-container>
    <el-container style="height: 910px;">
      <el-main>
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
              <button type="button" class="el-button el-button--primary el-button--medium" @click="refreshTable">
                <i class="el-icon-search"></i><span>搜索</span>
              </button>
            </div>
          </div>
          <button type="button" class="el-button el-button--primary el-button--medium" @click="addDepartment" style="float: right;">
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
              label="部门代码"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.departmentID }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="部门名称"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.departmentName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="部门主负责人"
              width="180">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.departmentHeadName }}</p>
                  <p>电话号码: {{ scope.row.departmentHeadPhoneNum }}</p>
                  <div slot="reference" class="name-wrapper" @click="openPersonInfo(scope.row)">
                    <el-tag size="medium">{{ scope.row.departmentHeadName }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="日期"
              width="260">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.lastModificationTime }}</span>
              </template>
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
                        v-bind:departmentForm="departmentForm" @refreshTable="refreshTable"></DepartmentInfo>
      </el-dialog>

      <el-dialog title="员工信息" :visible.sync="personFormVisible">
        <PersonnelInfo :personFormVisible="personFormVisible" @change-personFormVisible="onChangePersonFormVisible"
                       v-bind:personForm="personForm"></PersonnelInfo>
      </el-dialog>

    </el-container>
  </el-container>
</template>


<script>

  import {API_findDepartmentList,API_deleteDepartment,API_findDepartmentAll} from '../../api/department/index'
  import {API_findPersonnelById} from '../../api/personnel/index'
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
        this.refreshTable();
    },
    methods:{
        // 刷新部门列表
        refreshTable() {
            this.tableData = [];
            API_findDepartmentList(this.queryParam)
                .then(response => {
                    this.tableData = response.data // 部门表格数据
                })
                .catch(error => {
                    console.log(error)
                })
        },
        // 新建部门信息
        addDepartment() {
            this.departmentForm = {};
            this.departmentFormVisible = true;
        },
        // 编辑部门信息
        handleEdit(index, row){
            this.departmentForm = row;
            this.departmentFormVisible = true;
        },
        // 删除部门信息
        handleDelete(index, row) {
            API_deleteDepartment(row.id).then(response => {
               this.refreshTable();
            }).catch(error => {
                this.$message.error('删除失败！');
                console.log(error)
            });
        },
        // 打开员工详情框
        openPersonInfo(row) {
            API_findPersonnelById(row.departmentHeadId).then(response => {
                this.personForm = response.data;
                this.personFormVisible = true;
            }).catch(error => {
                this.$message.error('查询员工信息失败！');
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
    }
}
</script>

<style>

</style>
