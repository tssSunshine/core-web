<template>
    <div>
      <el-form :model="projectForm" :rules="projectRules" ref="projectForm">
        <el-input v-model="projectForm.id" autocomplete="off" style="display: none;"></el-input>
        <el-form-item label="项目代码" :label-width="formLabelWidth" prop="projectID">
          <el-col :span="12">
           <el-input v-model="projectForm.projectID" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称" :label-width="formLabelWidth" prop="projectName">
              <el-input v-model="projectForm.projectName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="项目负责人姓名" :label-width="formLabelWidth" prop="projectHeadName">
          <el-select v-model="projectForm.projectManagerID" @change="getPhoneNum(projectForm.projectManagerID,1)"
                     placeholder="请选择负责人" style="width: 100%;">
            <el-option :value="person.id" v-for="person in personList" :key="person.id"
                       :label="person.fullName">{{person.fullName}}-{{person.personnelID}}</el-option>
            </el-select>
        </el-form-item>

        <el-form-item required>
          <el-col :span="12">
            <el-form-item label="项目负责人电话" :label-width="formLabelWidth">
              <el-input v-model="projectForm.projectManagerPhoneNum" autocomplete="off" disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目负责人电子邮件" :label-width="formLabelWidth">
              <el-input v-model="projectForm.projectManagerEmail" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item required>
          <el-col :span="12">
            <el-form-item label="地址一" :label-width="formLabelWidth">
              <el-input v-model="projectForm.address1" autocomplete="off" disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址二" :label-width="formLabelWidth">
              <el-input v-model="projectForm.address2" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="项目描述" :label-width="formLabelWidth">
          <el-input v-model="projectForm.projectDesc" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item required>
          <el-col :span="12">
            <el-form-item label="计划开工时间" :label-width="formLabelWidth">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="projectForm.scheduledStartDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划竣工时间" :label-width="formLabelWidth">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="projectForm.scheduledCompletionDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item required>
          <el-col :span="12">
            <el-form-item label="实际开工时间" :label-width="formLabelWidth">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="projectForm.actualStartDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实际竣工时间" :label-width="formLabelWidth">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="projectForm.actualCompletionDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="当前进度" :label-width="formLabelWidth">
          <el-input v-model="projectForm.currentProgressPercent" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="当前进度描述" :label-width="formLabelWidth">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="projectForm.currentProgressDesc" style="width: 100%;"></el-date-picker>
        </el-form-item>

        <el-form-item label="最后一次更新日期" :label-width="formLabelWidth">
          <el-date-picker type="datetime" placeholder="选择日期" v-model="projectForm.lastModificationTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="submitForm('projectForm')">确 定</el-button>
        </div>
    </div>
</template>

<script>


    import {API_findPersonnelList,API_findPersonnelById} from '@/api/personnel/index'

    export default {
        name: "projectInfo",
        props: {
            //接收父组件传来的值
            projectFormVisible: Boolean,
            projectForm: {},
        },
        data() {
            return {
                formLabelWidth: '140px',
                projectForm: {
                    id:'',
                    lastModificationTime:'',
                    projectID:'',
                    projectName:'',
                    projectDesc:'',
                    projectManagerID:'',
                    projectManagerPhoneNum:'',
                    projectManagerEmail:'',
                    address1:'',
                    address2:'',
                    scheduledStartDate:'',
                    scheduledCompletionDate:'',
                    actualStartDate:'',
                    actualCompletionDate:'',
                    currentProgressPercent:'',
                    currentProgressDesc:''
                },
                projectRules: {
                    projectID: [
                        { required: true, message: '请输入项目代码', trigger: 'blur' }
                    ],
                    projectName: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' }
                    ]
                },
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
                        console.log(this.projectForm);
                        API_saveproject(this.projectForm).then(response => {
                            this.$emit('change-projectFormVisible', false);
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
                        this.projectForm.projectHeadPhoneNum = response.data.phoneNumber;
                    } else {
                       this.projectForm.projectDeputyPhoneNum = response.data.phoneNumber;
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
