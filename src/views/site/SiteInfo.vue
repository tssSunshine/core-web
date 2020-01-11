<template>

  <div>
    <el-form :model="siteForm" :rules="siteRules" ref="siteForm">
      <el-input v-model="siteForm.id" autocomplete="off" style="display: none;"></el-input>
      <el-form-item label="项目" :label-width="formLabelWidth" prop="projectID">
        <el-select v-model="siteForm.projectID" @change="getPhoneNum(siteForm.siteManagerID,1)"
                   placeholder="请选择项目" style="width: 100%;">
          <el-option :value="project.id" v-for="project in projectList" :key="project.id"
                     :label="project.projectName">{{project.projectID}}-{{project.projectName}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="工地代码" :label-width="formLabelWidth" prop="siteID">
        <el-col :span="12">
          <el-input v-model="siteForm.siteID" autocomplete="off"></el-input>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工地名称" :label-width="formLabelWidth" prop="siteName">
            <el-input v-model="siteForm.siteName" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="工地负责人姓名" :label-width="formLabelWidth" prop="siteHeadName">
        <el-select v-model="siteForm.siteManagerID" @change="getPhoneNum(siteForm.siteManagerID,1)"
                   placeholder="请选择负责人" style="width: 100%;">
          <el-option :value="person.id" v-for="person in personList" :key="person.id"
                     :label="person.fullName">{{person.fullName}}-{{person.personnelID}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item required>
        <el-col :span="12">
          <el-form-item label="工地负责人电话" :label-width="formLabelWidth">
            <el-input v-model="siteForm.siteManagerPhoneNum" autocomplete="off" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工地负责人电子邮件" :label-width="formLabelWidth">
            <el-input v-model="siteForm.siteManagerEmail" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item required>
        <el-col :span="12">
          <el-form-item label="地址一" :label-width="formLabelWidth">
            <el-input v-model="siteForm.address1" autocomplete="off" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址二" :label-width="formLabelWidth">
            <el-input v-model="siteForm.address2" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="工地描述" :label-width="formLabelWidth">
        <el-input v-model="siteForm.siteDesc" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item required>
        <el-col :span="12">
          <el-form-item label="计划开工时间" :label-width="formLabelWidth">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="siteForm.scheduledStartDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计划竣工时间" :label-width="formLabelWidth">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="siteForm.scheduledCompletionDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item required>
        <el-col :span="12">
          <el-form-item label="实际开工时间" :label-width="formLabelWidth">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="siteForm.actualStartDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实际竣工时间" :label-width="formLabelWidth">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="siteForm.actualCompletionDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="当前进度" :label-width="formLabelWidth">
        <el-input v-model="siteForm.currentProgressPercent" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="当前进度描述" :label-width="formLabelWidth">
        <el-date-picker type="datetime" placeholder="选择日期" v-model="siteForm.currentProgressDesc" style="width: 100%;"></el-date-picker>
      </el-form-item>

      <el-form-item label="最后一次更新日期" :label-width="formLabelWidth">
        <el-date-picker type="datetime" placeholder="选择日期" v-model="siteForm.lastModificationTime" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitForm('siteForm')">确 定</el-button>
    </div>
  </div>

</template>

<script>

    import {API_findPersonnelList,API_findPersonnelById} from '@/api/personnel/index'

    export default {
        name: "SiteInfo",
        props: {
            //接收父组件传来的值
            siteFormVisible: Boolean,
            siteForm: {},
        },
        data() {
            return {
                formLabelWidth: '140px',
                siteForm: {
                    id:'',
                    lastModificationTime:'',
                    projectID: '',
                    siteID:'',
                    siteName:'',
                    siteDesc:'',
                    siteManagerID:'',
                    siteManagerPhoneNum:'',
                    siteManagerEmail:'',
                    address1:'',
                    address2:'',
                    scheduledStartDate:'',
                    scheduledCompletionDate:'',
                    actualStartDate:'',
                    actualCompletionDate:'',
                    currentProgressPercent:'',
                    currentProgressDesc:''
                },
                siteRules: {
                    siteID: [
                        { required: true, message: '请输入工地代码', trigger: 'blur' }
                    ],
                    siteName: [
                        { required: true, message: '请输入工地名称', trigger: 'blur' },
                        { required: true, message: '请输入工地名称', trigger: 'blur' }
                    ]
                },
                projectList: [],
                personList:[],
                isEdit: false
            }
        },
        computed: {
            personList: function () {
                API_findPersonnelList().then(response => {
                    return response.data;
                }).catch(error => {
                    console.log(error)
                });
            },
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        /* formData格式提交： */
                        console.log(this.siteForm);
                        API_savesite(this.siteForm).then(response => {
                            this.$emit('change-siteFormVisible', false);
                            this.$emit('refreshTable');
                        }).catch(error => {
                            console.log(error)
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            close()  {
                this.$emit('change-siteFormVisible', false);
            },
            getPersonList() {
                API_findPersonnelList().then(response => {
                    this.personList = response.data;
                }).catch(error => {
                    console.log(error)
                });
            },
            // 获取员工联系电话
            getPhoneNum(personnelId, source) {
                API_findPersonnelById(personnelId).then(response => {
                    if (source === 1) {
                        this.siteForm.siteHeadPhoneNum = response.data.phoneNumber;
                    } else {
                        this.siteForm.siteDeputyPhoneNum = response.data.phoneNumber;
                    }
                }).catch(error => {
                    console.log(error)
                });
            }
        },
        mounted:function () {
            this.getPersonList();
        }
    }
</script>

<style scoped>

</style>
