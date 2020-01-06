<template>
  <el-container>
    <el-container style="height: 910px;">
      <el-main>
        <form class="el-form query-form el-form--label-right el-form--inline" style="text-align: left;">
          <div class="el-form-item el-form-item--medium">
            <label  class="el-form-item__label"
                    style="width: 60px;">名称</label>
            <div class="el-form-item__content">
              <div class="el-input el-input--medium"><!----><input autocomplete="off" placeholder="请输入名称" type="text"
                                                                   rows="2" validateevent="true"
                                                                   class="el-input__inner"><!----><!----><!----></div>
              <!----></div>
          </div>
          <div class="el-form-item el-form-item--medium">
            <label  class="el-form-item__label"
                    style="width: 60px;">日期</label>
            <div class="el-form-item__content">
              <div
                class="el-date-editor el-range-editor el-input__inner el-date-editor--daterange el-range-editor--medium">
                <i class="el-input__icon el-range__icon el-icon-date"></i><input id="" name=""
                                                                                 class="el-range-input"><span
                class="el-range-separator">-</span><input id=" " name="" class="el-range-input"><i
                class="el-input__icon el-range__close-icon"></i></div><!----></div>
          </div>
          <div class="el-form-item el-form-item--medium"><!---->
            <div class="el-form-item__content">
              <button type="button" class="el-button el-button--primary el-button--medium"><!----><!----><span>搜索</span>
              </button><!----></div>
          </div>
        </form>
        <template>
          <el-table
            :data="userDate"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="用户名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别" :formatter="formatSex">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系电话">
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
                  @click="handleDelete(scope.$index, tableData)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-main>

    </el-container>
  </el-container>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
  import {API_findAllUser} from '@/api/user/user'

    export default {
      mounted: function() {
          this.init();
      },
        methods: {
            init() {
                API_findAllUser()
                    .then(response => {
                        this.userDate = response.data // 下拉菜单数据
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            handleEdit(index, row){

            },
            handleDelete(index, rows) {
                rows.splice(index, 1);
            },
            formatSex(row, column){
                return row.sex == '1' ? "男" : row.sex == '2' ? "女" : "未知";
            }
        },
        data() {
            return {
                userDate: []
            }
        }
    }
</script>
