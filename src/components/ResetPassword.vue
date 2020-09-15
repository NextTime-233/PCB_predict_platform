<template>
    <a-card>
        <a-avatar :size="64" style="margin: 10px 100px; backgroundColor:#87d060">{{user}}</a-avatar>
        <p style="margin: 10px 200px">
            请输入原始密码和新密码来更改用户  {{user}}  的账号密码
        </p>
        <a-divider orientation="left">
            LJPZ
        </a-divider>
        <a-form-model ref="rform" :model="rform" :rules="rules" v-bind="layout" style="margin-top: 50px">
            <a-form-model-item has-feedback label="原始密码" prop="originPass">
                <a-input v-model="rform.originPass" type="password" autocomplete="off" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="新密码" prop="pass">
                <a-input v-model="rform.pass" type="password" autocomplete="off" />
            </a-form-model-item>
            <a-form-model-item has-feedback label="确认密码" prop="checkPass">
                <a-input v-model="rform.checkPass" type="password" autocomplete="off" />
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }" style="margin-left: 1000px; margin-top: 60px">
                <a-button type="primary" @click="submitForm('rform')">
                    提交
                </a-button>
                <a-button style="margin-left: 10px" @click="resetForm('rform')">
                    重置
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </a-card>
</template>
<script>
    export default {
        name: 'ResetPassword',
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password'));
                } else {
                    if (this.rform.checkPass !== '') {
                        this.$refs.rform.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password again'));
                } else if (value !== this.rform.pass) {
                    callback(new Error("Two inputs don't match!"));
                } else {
                    callback();
                }
            };
            return {
                // 用户名
                user: window.sessionStorage.getItem('user'),
                tokenStr: window.sessionStorage.getItem('token'),
                // 信息表
                rform: {
                    originPass:'',
                    pass: '',
                    checkPass: '',
                },
                rules: {
                    pass: [{ validator: validatePass, trigger: 'change' }],
                    checkPass: [{ validator: validatePass2, trigger: 'change' }],
                },
                layout: {
                    labelCol: { span: 4 },
                    wrapperCol: { span: 14 },
                },
            };
        },
        methods: {
            submitForm(form) {
                const that = this
                this.$refs[form].validate(valid => {
                    if (valid) {
                        alert('submit!')
                        console.log("此处提交修改")
                        // axios.put('http://192.168.1.106:8080/backend/user/updateUserPwd', {
                        //         params:{
                        //             userAccount: this.user,
                        //             userPwd: that.rform.pass,
                        //             tokenBackend: this.tokenStr,
                        //         },
                        axios.put('http://192.168.1.106:8080/backend/user/updateUserPwd?userAccount='+this.user+'&userPwd='+that.rform.pass+'&tokenBackend='+this.tokenStr, {
                                Headers:{token: this.tokenStr},
                            }).then( res => {
                            console.log(res.data)
                        }).catch()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(form) {
                this.$refs[form].resetFields();
            },
        },
    };
</script>
