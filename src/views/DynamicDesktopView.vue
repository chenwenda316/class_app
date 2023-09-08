<template>
    <div
        style="margin:auto;background: 50% 100%/cover url('https://s1.ax1x.com/2023/02/16/pS7vzkV.jpg');height:calc(100vh - 60px);">
        <n-grid cols="15" :x-gap="30" item-responsive>
            <n-grid-item span="4">
                <n-card :bordered="false" style="backdrop-filter: blur(10px);background-color:rgba(255,255,255,0.7)">
                    <div class="vhsizel" style="width:100%;text-align: center;">{{ formatTime }}</div>
                    <n-progress type="line" :percentage="timePercentage" :show-indicator="false" height="2vh"
                        fill-border-radius="1vh 0 0 1vh" processing />
                </n-card>
                <n-card :bordered="false"
                    style="backdrop-filter: blur(10px);background-color:rgba(255,255,255,0.7);margin-top:30px;"
                    v-if="onDev">
                    <n-space vertical>
                        <n-select v-model:value="groupValue" :options="groupLeaders" />
                        <n-space justify="space-between">
                            <n-button type="info" @click="changeGroup">
                                确认
                            </n-button>
                            <n-button type="error" @click="onDev = false">
                                关闭
                            </n-button>
                        </n-space>
                    </n-space>
                </n-card>

            </n-grid-item>
            <n-grid-item span="7">
                <img src="https://s1.ax1x.com/2023/02/16/pS7zeDs.png" class="micon" @click="imgOnClick" />
            </n-grid-item>
            <n-grid-item span="2">
                <n-card :bordered="false" style="backdrop-filter: blur(10px);background-color:rgba(255,255,255,0.7)">
                    <template #header>
                        <span class="vhsize"><strong>课表</strong></span>
                    </template>
                    <n-timeline icon-size="4vh">
                        <n-timeline-item v-for="item in classData" :type="item.type"
                            :style="{ 'padding-bottom': (item.duration ? 5 : 0) + 'vh' }">
                            <template #header>
                                <span class="vhsize"><strong>{{ item.name }}</strong></span>
                            </template>
                            <template #footer>
                                <span class="vhsizes"><strong>{{ item.time }}</strong></span>
                            </template>
                            <template #icon>
                                <Radio-Button-On v-if="item.type != ''" />
                                <Radio-Button-Off v-if="item.type == ''" />
                            </template>
                        </n-timeline-item>

                    </n-timeline>
                </n-card>
            </n-grid-item><n-grid-item span="2">
                <n-card :bordered="false" style="backdrop-filter: blur(10px);background-color:rgba(255,255,255,0.7)">
                    <template #header>
                        <span class="vhsize"><strong>值日组</strong></span>
                    </template>
                    <n-list :show-divider="false" clickable style="background:none;">
                        <n-list-item v-for="item in shiftData" style="padding:0px;">
                            <n-thing style="margin-bottom: 10px;">
                                <template #header>
                                    <span class="vhsize"><strong>{{ item.name }}</strong></span>
                                </template>
                                <template #description>
                                    <n-space size="small">
                                        <n-tag :bordered="false" type="info" size="small" v-for="it in item.tags">
                                            <span class="vhsizes"><strong>{{ it }}</strong></span>
                                        </n-tag>
                                    </n-space>
                                </template>
                            </n-thing>
                        </n-list-item>
                    </n-list>
                </n-card>
            </n-grid-item>
        </n-grid>
    </div>
</template>

<script>
import {
    RadioButtonOnOutline as RadioButtonOn,
    RadioButtonOffOutline as RadioButtonOff,
} from "@vicons/ionicons5";

export default {
    components: {
        RadioButtonOn,
        RadioButtonOff
    },
    data() {
        let classDataOrigin = [
            [
                { name: "自习", time: "8:00", type: "", duration: 210 },
                { name: "自习", time: "13:00", type: "", duration: 210 }],
            [//mon
                { name: "数学", time: "8:00", type: "" },
                { name: "英语", time: "8:50", type: "" },
                { name: "语文", time: "10:05", type: "" },
                { name: "体育", time: "10:55", type: "" },
                { name: "B1", time: "13:00", type: "" },
                { name: "B2", time: "13:50", type: "" },
                { name: "B3", time: "14:45", type: "" },
                { name: "班会", time: "15:35", type: "" },
            ],
            [//tue
                { name: "语文", time: "8:00", type: "", duration: 90 },
                { name: "数学", time: "10:05", type: "", duration: 90 },
                { name: "体育", time: "13:00", type: "" },
                { name: "自习", time: "13:50", type: "" },
                { name: "英语", time: "14:45", type: "", duration: 90 },
            ],
            [//wed
                { name: "B2", time: "8:00", type: "", duration: 90 },
                { name: "B3", time: "10:05", type: "", duration: 90 },
                { name: "B1", time: "13:00", type: "", duration: 90 },
                { name: "体选", time: "14:45", type: "", duration: 90 },
            ],
            [//thur
                { name: "数学", time: "8:00", type: "", duration: 90 },
                { name: "英语", time: "10:05", type: "", duration: 90 },
                { name: "语文", time: "13:00", type: "", duration: 90 },
                { name: "B3", time: "14:45", type: "", duration: 90 },
            ],
            [//fir
                { name: "英语", time: "8:00", type: "" },
                { name: "数学", time: "8:50", type: "" },
                { name: "体育", time: "10:05", type: "" },
                { name: "语文", time: "10:55", type: "" },
                { name: "B1", time: "13:00", type: "", duration: 90 },
                { name: "B2", time: "14:45", type: "", duration: 90 },
            ],
            [
                { name: "讲座", time: "8:00", type: "", duration: 210 },
                { name: "自习", time: "13:00", type: "", duration: 210 }]
        ];
        let shiftDataOrigin = [
            [{ name: "李知恒", tags: ["组长"] }, { name: "王艺", tags: ["组员"] }, { name: "沈奕帆", tags: ["组员"] }, { name: "何亦白", tags: ["组员"] }, { name: "许琳章", tags: ["组员"] }],
            [{ name: "高天鹤", tags: ["组长"] }, { name: "严绍恒", tags: ["组员"] }, { name: "上官许铨", tags: ["组员"] }, { name: "王梓一", tags: ["组员"] }, { name: "郭玥彤", tags: ["组员"] }],
            [{ name: "周姜祎", tags: ["组长"] }, { name: "陈文达", tags: ["组员"] }, { name: "王梓淇", tags: ["组员"] }, { name: "肖雅迪", tags: ["组员"] }, { name: "吴咏烜", tags: ["组员"] }],
            [{ name: "徐子轩", tags: ["组长"] }, { name: "孔祥晨", tags: ["组员"] }, { name: "马子润", tags: ["组员"] }, { name: "张瀞匀", tags: ["组员"] }, { name: "孙妍", tags: ["组员"] }],
            [{ name: "洪玮骏", tags: ["组长"] }, { name: "梁义", tags: ["组员"] }, { name: "钟亚北", tags: ["组员"] }, { name: "李桐瑶", tags: ["组员"] }, { name: "郜韵然", tags: ["组员"] }],
            [{ name: "魏嘉禾", tags: ["组长"] }, { name: "张家睿", tags: ["组员"] }, { name: "许景宁", tags: ["组员"] }, { name: "鲁临翾", tags: ["组员"] }, { name: "徐畋", tags: ["组员"] }],
            [{ name: "马诗博", tags: ["组长"] }, { name: "郑宇轩", tags: ["组员"] }, { name: "李谨硕", tags: ["组员"] }, { name: "过德麟", tags: ["组员"] }, { name: "赵文婕", tags: ["组员"] }],
            [{ name: "吕宬恺", tags: ["组长"] }, { name: "周鼎宸", tags: ["组员"] }, { name: "徐梓晨", tags: ["组员"] }, { name: "周成豫", tags: ["组员"] }, { name: "魏雅萱", tags: ["组员"] }],
        ]
        let groupLeaders = [
            // {
            //   label: "请选择", value: -1,
            // },
            {
                label: "李知恒", value: 0,
            },
            {
                label: "高天鹤", value: 1,
            },
            {
                label: "周姜祎", value: 2,
            },
            {
                label: "徐子轩", value: 3,
            },
            {
                label: "洪玮骏", value: 4,
            },
            {
                label: "魏嘉禾", value: 5,
            },
            {
                label: "马诗博", value: 6,
            },
            {
                label: "吕宬恺", value: 7,
            }
        ]
        return {
            classData: classDataOrigin[(new Date()).getDay()],
            formatTime: "",
            timePercentage: 0,
            shiftDataOrigin,
            onDev: false,
            toDevNumber: 6,
            lastClickTime: 0,
            groupLeaders,
            groupValue: null,
        }
    },
    computed: {
        shiftData() {
            return this.shiftDataOrigin[this.groupValue] || [];
        }
    },
    methods: {
        imgOnClick() {
            function msg(e) {
                console.log(1, window, window.$devMsg);
                if (window.$devMsg) {
                    console.log(true);
                    // window.$devMsg.destroy();
                    window.$devMsg.content = e;
                } else {
                    window.$devMsg = window.$message.info(e, { duration: 0 });
                }
                if (window.$msto) {
                    clearTimeout(window.$msto);
                }
                window.$msto = setTimeout(() => {
                    window.$devMsg.destroy();
                    delete window.$devMsg;
                    delete window.$msto;
                }, 1000);

            }
            if (this.onDev) {
                msg("您已进入调试模式, 无需进行此操作");
                return;
            }
            let ntime = new Date();
            let thisClickTime = ntime.getTime();
            if (thisClickTime - this.lastClickTime < 300) {
                this.toDevNumber--;
                if (this.toDevNumber == 0) {
                    this.onDev = true;
                    msg("您已进入调试模式");
                } else if (this.toDevNumber <= 5) {
                    msg("您还需要点击" + this.toDevNumber + "次");
                }

            } else {
                this.toDevNumber = 6;
            }
            this.lastClickTime = thisClickTime;
            return;
        },
        changeGroup() {
            if (this.groupValue < 0) {
                window.$message.error("请选择");
            }
            else {
                let postdata = { value: this.groupValue };
                window.$axios({
                    method: "post",
                    url: "grouppost",
                    data: postdata
                }).then(function (res) {
                    window.$message.success("修改成功");
                }).catch((error) => {
                    window.$message.error("错误: " + error.code);
                });
            }
        }
    },
    mounted() {
        this.$emit('changeCollapsedWidth', 0)
        delete window.$devMsg;
        delete window.$msto;
        setInterval(() => {
            for (let i in this.classData) {
                let nDate = new Date();
                let rTime = Number(this.classData[i].time.split(":")[0]) * 60 + Number(this.classData[i].time.split(":")[1]);
                let nTime = nDate.getHours() * 60 + nDate.getMinutes();
                // console.log(nTime>rTime && this.classData[i].type=="");
                if (nTime >= rTime + (this.classData[i].duration || 40)) {
                    (this.classData[i].type != "success" ? this.classData[i].type = "success" : null);
                    continue;
                }
                if (nTime >= rTime) {
                    (this.classData[i].type != "info" ? this.classData[i].type = "info" : null);
                    continue;
                }
                if (nTime >= rTime - 2) {
                    (this.classData[i].type != "warning" ? this.classData[i].type = "warning" : null);
                    continue;
                }
            }
        }, 1000);
        setInterval(() => {
            function f(p) { return (p < 10 ? '0' + p : p) };
            let d = new Date();
            this.formatTime = (f(d.getHours()) + ":" + f(d.getMinutes()) + ":" + f(d.getSeconds()));
        }, 1000);
        setInterval(() => {
            function f(p) { return (p < 10 ? '0' + p : p) };
            let d = new Date();
            this.timePercentage = (d.getHours() * 60 + d.getMinutes()) / (14.4);
        }, 1000);
        window.$axios.get("group", {})
            .then((res) => {
                this.groupValue = res.data.value;
            }).catch(function (error) {
                window.$message.error("错误: " + error.code);
            })
    },
    unmounted() {
        this.$emit('changeCollapsedWidth', 64)
    }
}

</script>

<style >
.vhsize {
    font-size: 3vh;
}

.vhsizes {
    font-size: 2vh;
}

.vhsizel {
    font-size: 6vh;
    font-weight: bold;
}

.micon {
    position: absolute;
    width: calc(100vmin * 0.7);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0.95);
    animation: 5s ease-in-out 0s infinite alternate breath;
}

@keyframes breath {
    from {
        transform: translate(-50%, -50%) scale(0.95);
    }

    to {
        transform: translate(-50%, -50%) scale(1.05);
    }
}

.n-card {
    border-radius: 3vh
}
</style>