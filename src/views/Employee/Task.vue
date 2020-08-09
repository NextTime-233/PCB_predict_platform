<template>
    <div>
        <br />
        <a-card hoverable style="width: 300px">
            <img
                    slot="cover"
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
            <template slot="actions" class="ant-card-actions">
                <a-icon key="setting" type="setting" />
                <a-icon key="edit" type="edit" />
                <a-icon key="ellipsis" type="ellipsis" />
            </template>
            <a-card-meta title="Card title" description="This is the description">
                <a-avatar
                        slot="avatar"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
            </a-card-meta>
        </a-card>
        <br />

        <div>
            <a-card title="Default size card" style="width: 300px">
                <a slot="extra" href="#">more</a>
                <p>card content</p>
                <p>card content</p>
                <p>card content</p>
            </a-card>
            <br />
            <a-card size="small" title="Small size card" style="width: 300px">
                <a slot="extra" href="#">more</a>
                <p>card content</p>
                <p>card content</p>
                <p>card content</p>
            </a-card>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Task",
    }
</script>

<style lang="less" scoped>

</style>
