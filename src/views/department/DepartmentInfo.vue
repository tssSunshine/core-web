<template>
    <div>
      <el-form :model="departmentForm" :rules="departmentRules" ref="departmentForm">
        <el-input v-model="departmentForm.id" autocomplete="off" style="display: none;"></el-input>
        <el-form-item label="部门代码" :label-width="formLabelWidth" prop="departmentID">
          <el-input v-model="departmentForm.departmentID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  required>
          <el-col :span="12">
            <el-form-item label="部门名称" :label-width="formLabelWidth" prop="departmentName">
              <el-input v-model="departmentForm.departmentName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门电话" :label-width="formLabelWidth">
              <el-input v-model="departmentForm.departmentPhoneNumber" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item required>
          <el-col :span="12">
            <el-form-item label="部门主负责人姓名" :label-width="formLabelWidth" prop="departmentHeadName">
              <el-select v-model="departmentForm.departmentHeadId" @change="getPhoneNum(departmentForm.departmentHeadId,1)"
                         placeholder="请选择主负责人" style="width: 100%;">
                <el-option :value="person.id" v-for="person in personList" :key="person.id"
                           :label="person.fullName">{{person.fullName}}-{{person.personnelID}}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门主负责人电话" :label-width="formLabelWidth">
              <el-input v-model="departmentForm.departmentHeadPhoneNum" autocomplete="off" disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item  required>
          <el-col :span="12">
            <el-form-item label="部门副负责人姓名" :label-width="formLabelWidth">
              <el-select v-model="departmentForm.departmentDeputyId" @change="getPhoneNum(departmentForm.departmentDeputyId,2)"
                         placeholder="请选择副负责人" style="width: 100%;">
                <el-option :value="person.id" v-for="person in personList" :key="person.id"
                           :label="person.fullName">{{person.fullName}}-{{person.personnelID}}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门副负责人电话" :label-width="formLabelWidth">
              <el-input v-model="departmentForm.departmentDeputyPhoneNum" autocomplete="off" disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="项目描述" :label-width="formLabelWidth">
          <el-input v-model="departmentForm.departmentDesc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最后一次更新日期" :label-width="formLabelWidth">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="departmentForm.lastModificationTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="submitForm('departmentForm')">确 定</el-button>
        </div>
    </div>
</template>

<script>

// eslint-disable-next-line camelcase
import {API_saveDepartment} from '@/api/department/index'
// eslint-disable-next-line camelcase
import {API_findPersonnelList, API_findPersonnelById} from '@/api/personnel/index'

export default {
  name: 'DepartmentInfo',
  props: {
    // 接收父组件传来的值
    departmentFormVisible: Boolean,
    departmentForm: {}
  },
  data () {
    return {
      formLabelWidth: '140px',
      // eslint-disable-next-line vue/no-dupe-keys
      departmentForm: {
        id: '',
        lastModificationTime: '',
        departmentID: '',
        departmentName: '',
        departmentDesc: '',
        departmentPhoneNumber: '',
        departmentHeadId: '',
        departmentDeputyId: '',
        departmentHeadPhone: '',
        departmentDeputyPhone: ''
      },
      departmentRules: {
        departmentID: [
          { required: true, message: '请输入部门代码', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ]
      },
      personList: [],
      isEdit: false
    }
  },
  computed: {
    // eslint-disable-next-line vue/no-dupe-keys,vue/return-in-computed-property
    personList: function () {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      API_findPersonnelList().then(response => {
        return response.data.data
      }).catch(error => {
        console.log(error)
      })
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /* formData格式提交： */
          console.log(this.departmentForm)
          API_saveDepartment(this.departmentForm).then(response => {
            this.$emit('change-visible', false) // 用来触发父组件定义的@change-visible
            this.$emit('refreshTable')
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close () {
      this.$emit('change-visible', false) // 用来触发父组件定义的@change-visible
    },
    getPersonList () {
      API_findPersonnelList().then(response => {
        this.personList = response.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取员工联系电话
    getPhoneNum (personnelId, source) {
      API_findPersonnelById(personnelId).then(response => {
        if (source === 1) {
          this.departmentForm.departmentHeadPhoneNum = response.data.data.phoneNumber
        } else {
          this.departmentForm.departmentDeputyPhoneNum = response.data.data.phoneNumber
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted: function () {
    this.getPersonList()
  }
}
</script>

<style scoped>

</style>
