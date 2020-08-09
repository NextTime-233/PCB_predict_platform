<template>
    <div>
        <div class="client">
            <a-table :pagination="false" :columns="columns" :data-source="data">
                <a slot="name" slot-scope="text">{{ text }}</a>
                <!--            <span slot="customTitle">Name</span>-->
                <span slot="tags" slot-scope="tags">
              <a-tag
                      v-for="tag in tags"
                      :key="tag"
                      :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
              >
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
                <span slot="action" slot-scope="text, record">
              <a>编辑</a>
              <a-divider type="vertical" />
              <a>删除</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link"> 更多操作 <a-icon type="down" /> </a>
            </span>
            </a-table>
            <PageRoll></PageRoll>
        </div>
        <div class="detail">

        </div>

    </div>
</template>
<script>
    import PageRoll from "../../components/PageRoll";

    const columns = [
        {
            dataIndex: 'name',
            key: 'name',
            title: '姓名',
        },
        {
            title: '客户网名',
            dataIndex: 'nickname',
            key: 'nickname',
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '标签',
            key: 'tags',
            dataIndex: 'tags',
            scopedSlots: { customRender: 'tags' },
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'action' },
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    export default {
        name: "Client",
        components: {PageRoll},
        data() {
            return {
                data,
                columns,
            };
        },
        watch: {
            pageSize(val) {
                console.log('pageSize', val);
            },
            current(val) {
                console.log('current', val);
            },
        },
        created() {
          axios.get('http://localhost:8080/backend/').then( res => {
              console.log(res.data)
          })
        },
        methods: {

        },
    };
</script>
<style scoped>

</style>
