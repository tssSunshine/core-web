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
          <button type="button" class="el-button el-button--primary el-button--medium" @click="addProject" style="float: right;">
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
              label="项目代码"
              width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.projectID }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="项目名称"
              width="260">
              <template slot-scope="scope">
                <span>{{ scope.row.projectName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="当前进度"
              width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.currentProgressPercent }}%</span>
              </template>
            </el-table-column>
            <el-table-column
              label="项目主负责人"
              width="180">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.projectManagerName }}</p>
                  <p>电话号码: {{ scope.row.projectManagerPhoneNum }}</p>
                  <div slot="reference" class="name-wrapper" @click="openPersonInfo(scope.row)">
                    <el-tag size="medium">{{ scope.row.projectManagerName }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="开工日期"
              width="260">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">计划：{{ scope.row.scheduledStartDate }}</span><br/>
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">实际：{{ scope.row.actualStartDate }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="竣工日期"
              width="260">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">计划：{{ scope.row.scheduledCompletionDate }}</span><br/>
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">实际：{{ scope.row.actualCompletionDate }}</span>
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

      <el-dialog title="项目信息" :visible.sync="projectFormVisible">
        <ProjectInfo :projectFormVisible="projectFormVisible" @change-projectFormVisible="onChangeProjectFormVisible"
                        v-bind:projectForm="projectForm" @refreshTable="refreshTable"></ProjectInfo>
      </el-dialog>

      <el-dialog title="员工信息" :visible.sync="personFormVisible">
        <PersonnelInfo :personFormVisible="personFormVisible" @change-personFormVisible="onChangePersonFormVisible"
                       v-bind:personForm="personForm"></PersonnelInfo>
      </el-dialog>

    </el-container>
  </el-container>
</template>


<script>


    import {API_findPersonnelById} from '../../api/personnel/index'
    import ProjectInfo from "./ProjectInfo";
    import PersonnelInfo from "../personnel/PersonnelInfo";

    export default {

        components:{ProjectInfo,PersonnelInfo},

        data () {
            return {
                queryParam:'',
                tableData: [{
                    projectID:'JSNJ0001',
                    projectName:'南京紫金大厦',
                    currentProgressPercent:'20',
                    projectManagerID:'2',
                    projectManagerName:'王家印',
                    projectManagerPhoneNum:'15789546545',
                    scheduledStartDate:'2018-06-27',
                    actualStartDate:'2018-07-12',
                    scheduledCompletionDate:'2019-06-28',
                    actualCompletionDate:'2019-08-21'
                },{
                    projectID:'SHSH0001',
                    projectName:'上海张江高科技园二期',
                    currentProgressPercent:'10',
                    projectManagerID:'1',
                    projectManagerName:'姚健林',
                    projectManagerPhoneNum:'15807318158',
                    scheduledStartDate:'2019-03-04',
                    actualStartDate:'2019-03-11',
                    scheduledCompletionDate:'2020-06-28',
                    actualCompletionDate:''
                }
                ],
                projectForm: {},
                projectFormVisible: false,
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
                // this.tableData = [];
                // API_findprojectList(this.queryParam)
                //     .then(response => {
                //         // this.tableData = response.data // 部门表格数据
                //     })
                //     .catch(error => {
                //         console.log(error)
                //     })
            },
            // 新建部门信息
            addProject() {
                this.projectForm = {};
                this.projectFormVisible = true;
            },
            // 编辑部门信息
            handleEdit(index, row){
                this.projectForm = row;
                this.projectFormVisible = true;
            },
            // 删除部门信息
            handleDelete(index, row) {
                // API_deleteproject(row.id).then(response => {
                //     this.refreshTable();
                // }).catch(error => {
                //     this.$message.error('删除失败！');
                //     console.log(error)
                // });
            },
            // 打开员工详情框
            openPersonInfo(row) {
                API_findPersonnelById(row.projectManagerID).then(response => {
                    this.personForm = response.data;
                    this.personFormVisible = true;
                }).catch(error => {
                    this.$message.error('查询员工信息失败！');
                    console.log(error)
                });
            },
            // 改变部门详情框显示状态
            onChangeProjectFormVisible(visible) {
                this.projectFormVisible = visible;
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
