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
          <button type="button" class="el-button el-button--primary el-button--medium" @click="addSensor" style="float: right;">
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
              label="工地"
              width="150">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>工地代码: {{ scope.row.siteID }}</p>
                  <p>工地名称: {{ scope.row.siteName }}</p>
                  <div slot="reference" class="name-wrapper" @click="openPersonInfo(scope.row)">
                    <el-tag size="medium">{{ scope.row.siteName }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="监测点代码"
              width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.sensorID }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="监测点名称"
              width="260">
              <template slot-scope="scope">
                <span>{{ scope.row.sensorName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="监测点负责人"
              width="150">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.sensorManagerName }}</p>
                  <p>电话号码: {{ scope.row.sensorManagerPhoneNum }}</p>
                  <div slot="reference" class="name-wrapper" @click="openPersonInfo(scope.row)">
                    <el-tag size="medium">{{ scope.row.sensorManagerName }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              label="当前状态"
              width="80">
              <template slot-scope="scope">
                <span>{{ scope.row.sensorState }}</span>
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

      <el-dialog title="监测点信息" :visible.sync="sensorFormVisible">
        <SensorInfo :sensorFormVisible="sensorFormVisible" @change-sensorFormVisible="onChangeSensorFormVisible"
                     v-bind:sensorForm="sensorForm" @refreshTable="refreshTable"></SensorInfo>
      </el-dialog>

      <el-dialog title="工地信息" :visible.sync="siteFormVisible">
        <SiteInfo :siteFormVisible="siteFormVisible" @change-siteFormVisible="onChangeSiteFormVisible"
                     v-bind:siteForm="siteForm"></SiteInfo>
      </el-dialog>

      <el-dialog title="员工信息" :visible.sync="personFormVisible">
        <PersonnelInfo :personFormVisible="personFormVisible" @change-personFormVisible="onChangePersonFormVisible"
                       v-bind:personForm="personForm"></PersonnelInfo>
      </el-dialog>

    </el-container>
  </el-container>

</template>

<script>

    import {API_findPersonnelById} from '../../api/personnel/index';
    import SensorInfo from "./SensorInfo";
    import ProjectInfo from "../project/ProjectInfo";
    import PersonnelInfo from "../personnel/PersonnelInfo";
    import SiteInfo from "../site/SiteInfo";

    export default {
        components:{SiteInfo, SensorInfo,ProjectInfo,PersonnelInfo},
        name: "Sensor",
        data () {
            return {
                queryParam:'',
                tableData: [{
                    sensorID:'JSNJ0001',
                    sensorName:'南京紫金大厦',
                    currentProgressPercent:'20',
                    sensorManagerID:'2',
                    sensorManagerName:'王家印',
                    sensorManagerPhoneNum:'15789546545',
                    scheduledStartDate:'2018-06-27',
                    actualStartDate:'2018-07-12',
                    scheduledCompletionDate:'2019-06-28',
                    actualCompletionDate:'2019-08-21',
                    address1:'江苏省南京市'
                },{
                    sensorID:'SHSH0001',
                    sensorName:'上海张江高科技园二期',
                    currentProgressPercent:'10',
                    sensorManagerID:'1',
                    sensorManagerName:'姚健林',
                    sensorManagerPhoneNum:'15807318158',
                    scheduledStartDate:'2019-03-04',
                    actualStartDate:'2019-03-11',
                    scheduledCompletionDate:'2020-06-28',
                    actualCompletionDate:'2020-02-12',
                    address1:'上海市静安区'
                }
                ],
                sensorFormVisible: false,
                sensorForm: {},
                siteForm: {},
                siteFormVisible: false,
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
            // 新建工地信息
            addSensor() {
                this.sensorForm = {};
                this.sensorFormVisible = true;
            },
            // 编辑工地信息
            handleEdit(index, row){
                this.sensorForm = row;
                this.sensorFormVisible = true;
            },
            // 删除工地信息
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
                API_findPersonnelById(row.sensorManagerID).then(response => {
                    this.personForm = response.data;
                    this.personFormVisible = true;
                }).catch(error => {
                    this.$message.error('查询员工信息失败！');
                    console.log(error)
                });
            },
            // 改变监测点详情框显示状态
            onChangeSensorFormVisible(visible) {
                this.sensorFormVisible = visible;
            },
            // 改变工地详情框显示状态
            onChangeSiteFormVisible(visible) {
                this.siteFormVisible = visible;
            },
            // 改变员工详情框显示状态
            onChangePersonFormVisible(visible) {
                this.personFormVisible = visible;
            },
        }
    }
</script>

<style scoped>

</style>
