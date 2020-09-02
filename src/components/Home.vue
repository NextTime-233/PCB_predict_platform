<template>
    <div>
        <a-card>
            <a-avatar :size="64" icon="user" />

        </a-card>
        <a-card style="margin-top: 10px">
            <a-switch :checked="!loading" @change="onChange" />

            <a-list item-layout="vertical" size="large" :data-source="listData">
                <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
                    <template v-for="{ type, text } in actions" v-if="!loading" slot="actions">
          <span :key="type">
            <a-icon :type="type" style="margin-right: 8px" />
            {{ text }}
          </span>
                    </template>
                    <img
                            v-if="!loading"
                            slot="extra"
                            width="272"
                            alt="logo"
                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                    <a-skeleton :loading="loading" active avatar>
                        <a-list-item-meta :description="item.description">
                            <a slot="title" :href="item.href">{{ item.title }}</a>
                            <a-avatar slot="avatar" :src="item.avatar" />
                        </a-list-item-meta>
                        {{ item.content }}
                    </a-skeleton>
                </a-list-item>
            </a-list>
        </a-card>

    </div>
</template>
<script>
    const listData = [];
    for (let i = 0; i < 3; i++) {
        listData.push({
            href: 'https://www.antdv.com/',
            title: `ant design vue part ${i}`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description:
                'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
    }
    export default {
        data() {
            return {
                loading: false,
                listData,
                actions: [
                    { type: 'star-o', text: '156' },
                    { type: 'like-o', text: '156' },
                    { type: 'message', text: '2' },
                ],
            };
        },
        methods: {
            onChange(checked) {
                this.loading = !checked;
            },
        },
    };
</script>
<style>
    .skeleton-demo {
        border: 1px solid #f4f4f4;
    }
</style>

<!--<template>-->
<!--    <div>-->
<!--        <span>Welcome!</span>-->
<!--        <div>-->
<!--            <a-page-header-->
<!--                    style="border: 1px solid rgb(235, 237, 240)"-->
<!--                    title="Title"-->
<!--                    sub-title="This is a subtitle"-->
<!--                    @back="() => $router.go(-1)"-->
<!--            >-->
<!--                <template slot="extra">-->
<!--                    <a-button key="3">-->
<!--                        Operation-->
<!--                    </a-button>-->
<!--                    <a-button key="2">-->
<!--                        Operation-->
<!--                    </a-button>-->
<!--                    <a-button key="1" type="primary">-->
<!--                        Primary-->
<!--                    </a-button>-->
<!--                </template>-->
<!--                <template slot="footer">-->
<!--                    <a-tabs default-active-key="1">-->
<!--                        <a-tab-pane key="1" tab="Details" />-->
<!--                        <a-tab-pane key="2" tab="Rule" />-->
<!--                    </a-tabs>-->
<!--                </template>-->
<!--                <div class="content">-->
<!--                    <div class="main">-->
<!--                        <a-descriptions size="small" :column="2">-->
<!--                            <a-descriptions-item label="Created">-->
<!--                                Lili Qu-->
<!--                            </a-descriptions-item>-->
<!--                            <a-descriptions-item label="Association">-->
<!--                                <a>421421</a>-->
<!--                            </a-descriptions-item>-->
<!--                            <a-descriptions-item label="Creation Time">-->
<!--                                2017-01-10-->
<!--                            </a-descriptions-item>-->
<!--                            <a-descriptions-item label="Effective Time">-->
<!--                                2017-10-10-->
<!--                            </a-descriptions-item>-->
<!--                            <a-descriptions-item label="Remarks">-->
<!--                                Gonghu Road, Xihu District, Hangzhou, Zhejiang, China-->
<!--                            </a-descriptions-item>-->
<!--                        </a-descriptions>-->
<!--                    </div>-->
<!--                    <div class="extra">-->
<!--                        <div-->
<!--                                :style="{-->
<!--              display: 'flex',-->
<!--              width: 'max-content',-->
<!--              justifyContent: 'flex-end',-->
<!--            }"-->
<!--                        >-->
<!--                            <a-statistic-->
<!--                                    title="Status"-->
<!--                                    value="Pending"-->
<!--                                    :style="{-->
<!--                marginRight: '32px',-->
<!--              }"-->
<!--                            />-->
<!--                            <a-statistic title="Price" prefix="$" :value="568.08" />-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </a-page-header>-->
<!--        </div>-->
<!--        <div>-->
<!--            <a-back-top />-->
<!--            Scroll down to see the bottom-right-->
<!--            <strong style="color: rgba(64, 64, 64, 0.6)"> gray </strong>-->
<!--            button.-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "Home"-->
<!--    }-->
<!--</script>-->

<!--<style lang="less">-->

<!--    tr:last-child td {-->
<!--        padding-bottom: 0;-->
<!--    }-->
<!--    #components-page-header-demo-responsive .content {-->
<!--        display: flex;-->
<!--    }-->
<!--    #components-page-header-demo-responsive .ant-statistic-content {-->
<!--        font-size: 20px;-->
<!--        line-height: 28px;-->
<!--    }-->
<!--    @media (max-width: 576px) {-->
<!--        #components-page-header-demo-responsive .content {-->
<!--            display: block;-->
<!--        }-->

<!--        #components-page-header-demo-responsive .main {-->
<!--            width: 100%;-->
<!--            margin-bottom: 12px;-->
<!--        }-->

<!--        #components-page-header-demo-responsive .extra {-->
<!--            width: 100%;-->
<!--            margin-left: 0;-->
<!--            text-align: left;-->
<!--        }-->
<!--    }-->

<!--</style>-->