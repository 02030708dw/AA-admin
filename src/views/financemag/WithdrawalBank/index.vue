<template>
    <el-card>
        <Control @Add="GetAdd" @Refresh="GetRefresh" ref="ControlView" @query="Getquery" @resetting="Getresetting"></Control>
        <Table ref="TableView" :tableData="tableData" @Eitor="GetEitor" @delete="getdelete" @updateStatus="getupdateStatus"></Table>
        <Pagination></Pagination>
        <UpdataWithdrawalBank @upta="HandelUpta" :TypeIndex="TypeIndex" ref="updatabank"></UpdataWithdrawalBank>
    </el-card>
</template>
<script>
import { PageData, Add, Del, Edit, UpdateStatus } from '../../../api/finance/WithdrawalBank'
import Control from './Control.vue';
import Table from './Table.vue'
import Pagination from '@/components/Pagination/Pagination.vue'
import UpdataWithdrawalBank from './UpdataWithdrawalBank.vue'
export default {
    components: {
        Control,
        Pagination,
        Table,
        UpdataWithdrawalBank
    },
    data() {
        return {
            TypeIndex: 0,
            bankCode: '',
            bankName: '',
            status: null,
            pageNo: 1,
            pageSize: 10,
            total: 0,
            tableData: []
        }
    },
    created() {
        this.GetPagesData(1)
    },
    methods: {
        // 编辑
        GetEitor(e) {
            this.TypeIndex = 1
            this.$refs.updatabank.HandelChange(e)
        },
        // 添加
        GetAdd() {
            this.TypeIndex = 0
            this.$refs.updatabank.HandelChange()
        },
        // 请求分页数据
        GetPagesData(index) {
            this.pageNo = index
            PageData({ pageNo: index, pageSize: this.pageSize, bankCode: this.bankCode, bankName: this.bankName, status: this.status }).then(res => {
                this.tableData = res.resultSet.data
                this.total = res.resultSet.total
            }).catch(err => {
                console.log(err)
            })
        },
        // 刷新
        GetRefresh() {
            this.$refs.TableView.HandelLoading(true)
            PageData({ pageNo: this.pageNo, pageSize: this.pageSize, bankCode: this.bankCode, bankName: this.bankName, status: this.status }).then(res => {
                this.tableData = res.resultSet.data
                this.total = res.resultSet.total
                this.$message({ message: '刷新成功!', type: 'success' })
                setTimeout(() => {
                    this.$refs.ControlView.HandelBtnStatus()
                    this.$refs.TableView.HandelLoading(false)
                }, 1000)
            }).catch(err => {
                setTimeout(() => {
                    this.$refs.TableView.HandelLoading(false)
                    this.$refs.ControlView.HandelBtnStatus()
                },1000)
                this.$message.error('刷新失败!')
            })
        },
        // 条件查询
        Getquery(e) {
            this.bankCode = e.bankCode
            this.bankName = e.bankName
            this.status = e.status
            this.GetPagesData(1)
        },
        // 重置
        Getresetting() {
            this.bankCode = ''
            this.bankName = ''
            this.status = null
            this.GetPagesData(1)
        },
        // 添加编辑事件
        HandelUpta(e) {
            if(this.TypeIndex === 0) {
                // 添加
                Add({bankCode:e.bankCode,bankName:e.bankName,icon:e.icon,status:e.status}).then(res => {
                    console.log(res)
                    this.$message({ message: '添加成功!', type: 'success' })
                    // 刷新数据
                    this.GetPagesData(this.pageNo)
                }).catch(err => {
                    console.log(err)
                    this.$message.error('添加失败!')
                })
            } else if(this.TypeIndex === 1) {
                // 编辑
                Edit({bankCode:e.bankCode,bankName:e.bankName,icon:e.icon,status:e.status,id:e.id}).then(res => {
                    this.$message({ message: '编辑成功!', type: 'success' })
                    // 刷新
                    this.GetPagesData(this.pageNo)
                }).catch(err => {
                    console.log(err)
                    this.$message.error('编辑失败!')
                })
            }
            console.log(e)
        },
        // 删除
        getdelete(e){
            Del({id:e}).then(res=>{
                this.$message({ message: '删除成功!', type: 'success' })
                this.GetPagesData(this.pageNo)
            }).catch(err => {
                console.log(err)
                this.$message.error('删除失败!')
            })
        },
        // 修改状态
        getupdateStatus(e) {
            UpdateStatus({id:e.id,status:e.status}).then(res => {
                this.$message({ message: '修改成功!', type: 'success' })
                this.GetPagesData(this.pageNo)
            }).catch(err => {
                this.GetPagesData(this.pageNo)
                this.$message.error('修改失败!')
            })
        }
    },
}
</script>
<style lang="scss" scoped></style>