<template>

  <div>
    <el-form :model="sensorForm" :rules="sensorRules" ref="sensorForm">
      <el-input v-model="sensorForm.id" autocomplete="off" style="display: none;"></el-input>
      <el-form-item label="监测点代码" :label-width="formLabelWidth" prop="sensorID">
        <el-col :span="12">
          <el-input v-model="sensorForm.sensorID" autocomplete="off"></el-input>
        </el-col>
        <el-col :span="12">
          <el-form-item label="监测点名称" :label-width="formLabelWidth" prop="sensorName">
            <el-input v-model="sensorForm.sensorName" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="监测点负责人姓名" :label-width="formLabelWidth" prop="sensorHeadName">
        <el-select v-model="sensorForm.sensorManagerID" @change="getPhoneNum(sensorForm.sensorManagerID,1)"
                   placeholder="请选择负责人" style="width: 100%;">
          <el-option :value="person.id" v-for="person in personList" :key="person.id"
                     :label="person.fullName">{{person.fullName}}-{{person.personnelID}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item required>
        <el-col :span="12">
          <el-form-item label="监测点负责人电话" :label-width="formLabelWidth">
            <el-input v-model="sensorForm.sensorManagerPhoneNum" autocomplete="off" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="监测点负责人电子邮件" :label-width="formLabelWidth">
            <el-input v-model="sensorForm.sensorManagerEmail" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="工地" :label-width="formLabelWidth" prop="siteID">
        <el-select v-model="sensorForm.siteID" @change="getPhoneNum(sensorForm.siteManagerID,1)"
                   placeholder="请选择工地" style="width: 100%;">
          <el-option :value="site.id" v-for="site in siteList" :key="site.id"
                     :label="site.siteName">{{site.siteID}}-{{site.siteName}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item required>
        <el-col :span="12">
          <el-form-item label="地址一" :label-width="formLabelWidth">
            <el-input v-model="sensorForm.address1" autocomplete="off" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址二" :label-width="formLabelWidth">
            <el-input v-model="sensorForm.address2" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="工地描述" :label-width="formLabelWidth">
        <el-input v-model="sensorForm.sensorDesc" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item required>
        <el-col :span="12">
          <el-form-item label="计划开工时间" :label-width="formLabelWidth">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="sensorForm.scheduledStartDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计划竣工时间" :label-width="formLabelWidth">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="sensorForm.scheduledCompletionDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item required>
        <el-col :span="12">
          <el-form-item label="实际开工时间" :label-width="formLabelWidth">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="sensorForm.actualStartDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实际竣工时间" :label-width="formLabelWidth">
            <el-date-picker type="datetime" placeholder="选择日期" v-model="sensorForm.actualCompletionDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="当前进度" :label-width="formLabelWidth">
        <el-input v-model="sensorForm.currentProgressPercent" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="当前进度描述" :label-width="formLabelWidth">
        <el-date-picker type="datetime" placeholder="选择日期" v-model="sensorForm.currentProgressDesc" style="width: 100%;"></el-date-picker>
      </el-form-item>

      <el-form-item label="最后一次更新日期" :label-width="formLabelWidth">
        <el-date-picker type="datetime" placeholder="选择日期" v-model="sensorForm.lastModificationTime" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitForm('sensorForm')">确 定</el-button>
    </div>
  </div>

</template>

<script>

    import {API_findPersonnelList,API_findPersonnelById} from '@/api/personnel/index'

    export default {
        name: "SensorInfo",
        props: {
            //接收父组件传来的值
            sensorFormVisible: Boolean,
            sensorForm: {},
        },
        data() {
            return {
                formLabelWidth: '140px',
                sensorForm: {
                    id:'',
                    lastModificationTime:'',
                    projectID: '',
                    sensorID:'',
                    sensorName:'',
                    sensorDesc:'',
                    sensorManagerID:'',
                    sensorManagerPhoneNum:'',
                    sensorManagerEmail:'',
                    address1:'',
                    address2:'',
                    scheduledStartDate:'',
                    scheduledCompletionDate:'',
                    actualStartDate:'',
                    actualCompletionDate:'',
                    currentProgressPercent:'',
                    currentProgressDesc:''
                },
                sensorRules: {
                    sensorID: [
                        { required: true, message: '请输入监测点代码', trigger: 'blur' }
                    ],
                    sensorName: [
                        { required: true, message: '请输入监测点名称', trigger: 'blur' },
                        { required: true, message: '请输入监测点名称', trigger: 'blur' }
                    ]
                },
                siteList: [],
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
                        console.log(this.sensorForm);
                        API_savesensor(this.sensorForm).then(response => {
                            this.$emit('change-sensorFormVisible', false);
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
                this.$emit('change-sensorFormVisible', false);
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
                        this.sensorForm.sensorHeadPhoneNum = response.data.phoneNumber;
                    } else {
                        this.sensorForm.sensorDeputyPhoneNum = response.data.phoneNumber;
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
