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

</style>
