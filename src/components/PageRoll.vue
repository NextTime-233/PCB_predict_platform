<template>
    <div class="page-roll">
        <a-pagination
                v-model="current"
                :page-size-options="pageSizeOptions"
                :total="total"
                show-size-changer
                show-quick-jumper
                :page-size="pageSize"
                @showSizeChange="onShowSizeChange"
        >
<!--            <t>共{{}}条数据</t>-->
            <template slot="buildOptionText" slot-scope="props">
                <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
                <span v-if="props.value === '50'">全部</span>
            </template>
        </a-pagination>
    </div>
</template>

<script>
    export default {
        name: "PageRoll",
        data() {
            return {
                pageSizeOptions: ['10', '20', '30', '40', '50'],
                current: 1,
                pageSize: 10,
                total: 50,
            };
        },
        watch:{
            // 'pageSize'(newVal, oldVal){ // 实时监听数据变化
            //     sessionStorage.setItem('pageSize', this.pageSize);
            // },
            // current(val){
            //     sessionStorage.setItem('current', this.current);
            // },
            // value(val){ // 实时监听数据变化
            //     this.wat_fun(val)
            // }
        },
        created(){
            // 如果改变了咋办呢，这个只在创建时候有用
            sessionStorage.setItem('current', this.current);
            sessionStorage.setItem('pageSize', this.pageSize);
        },
        methods: {
            onShowSizeChange(current, pageSize) {
                this.pageSize = pageSize;
                sessionStorage.setItem('current', current);
                sessionStorage.setItem('pageSize', pageSize);
            },
        },
    };
</script>

<style scoped>
    .page-roll {
        display: flex;
        flex-direction: column;
        /*align-items: center;*/
        align-items: flex-end;
        margin-top: 20px;
    }
</style>