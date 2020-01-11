<template>
    <div>
      <el-form :model="personForm" :rules="personRules" ref="personForm">
        <el-form-item label="员工代码" :label-width="formLabelWidth" prop="personnelID">
          <el-input v-model="personForm.personnelID" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  required>
          <el-col :span="12">
            <el-form-item label="姓" :label-width="formLabelWidth" prop="firstName">
              <el-input v-model="personForm.firstName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="名" :label-width="formLabelWidth" prop="lastName">
              <el-input v-model="personForm.lastName" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item  required>
          <el-col :span="12">
            <el-form-item label="电子邮件" :label-width="formLabelWidth">
              <el-input v-model="personForm.email" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话号码" :label-width="formLabelWidth">
              <el-input v-model="personForm.phoneNumber" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item  required>
          <el-col :span="12">
            <el-form-item label="部门" :label-width="formLabelWidth" prop="departmentName">
              <el-select v-model="personForm.departmentID" placeholder="请选择部门" style="width: 100%;">
                <el-option :value="department.id" v-for="department in departmentList" :key="department.id" :label="department.departmentName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位" :label-width="formLabelWidth" prop="position">
              <el-select v-model="personForm.position" placeholder="请选择职位" style="width: 100%;">
                <el-option :value="position.id" v-for="position in positionList" :key="position.id" :label="position.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="地址一" :label-width="formLabelWidth">
          <el-input v-model="personForm.address1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址二" :label-width="formLabelWidth">
          <el-input v-model="personForm.address2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工描述" :label-width="formLabelWidth">
          <el-input v-model="personForm.personnelDesc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最后一次更新日期" :label-width="formLabelWidth">
          <el-date-picker type="date" placeholder="选择日期" v-model="personForm.LastModificationTime" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submitForm('personForm')">确 定</el-button>
      </div>
    </div>
</template>

<script>

    import {API_savePersonnel} from '@/api/personnel/index'
    import {API_findDepartmentAll} from '../../api/department/index'

    export default {
        name: "PersonnelInfo",
        props: {
            //接收父组件传来的值
            personFormVisible: Boolean,
            personForm: [],
        },
        data() {
            return {
                formLabelWidth: '140px',
                personForm: {
                    personnelID: '',
                    lastName: '',
                    firstName: '',
                    email: '',
                    phoneNumber : '',
                    departmentID : '',
                    position : '',
                    address1: '',
                    address2 : '',
                    personnelDesc:'',
                    LastModificationTime:''
                },
                personRules: {
                    personnelID: [
                        { required: true, message: '请输入员工代码', trigger: 'blur' }
                    ],
                    lastName: [
                        { required: true, message: '请输入姓', trigger: 'blur' }
                    ],
                    firstName: [
                        { required: true, message: '请输入名', trigger: 'blur' }
                    ],
                    departmentID: [
                        { required: true, message: '请选择部门', trigger: 'change' }
                    ],
                    position: [
                        { required: true, message: '请选择职位', trigger: 'change' }
                    ]
                },
                departmentList:[],
                positionList: [
                    {id: 0,name:'部门主负责人'},
                    {id: 1,name:'部门副负责人'},
                    {id: 2,name:'部门员工'},
                ],
            }
        },
        mounted: function() {
            this.getDepartmentList();
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        /* formData格式提交： */
                        console.log(this.personForm);
                        API_savePersonnel(this.personForm).then(response => {
                            this.$emit('change-personFormVisible', false) // 用来触发父组件定义的@onChangePersonFormVisible
                            this.$emit('refreshPersonTable');
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
                this.$emit('change-personFormVisible', false) // 用来触发父组件定义的@onChangePersonFormVisible
            },
            getDepartmentList() {
                API_findDepartmentAll().then(response => {
                    this.departmentList = response.data.data;
                }).catch(error => {
                    console.log(error)
                });
            }
        },
        computed: {

        },
    }
</script>

<style scoped>

</style>
