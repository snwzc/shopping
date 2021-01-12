<template>
  <div class="wrapper">
    <div class="top" :class="[name]">
      <van-image round width="6rem" height="6rem" :src="headData.head" />
      <h2>{{ headData.title }}</h2>
      <p class="p1">{{ headData.msg }}</p>
      <p class="p2">
        {{ headData.msg1 }}
      </p>
    </div>
    <div style="height: 230px"></div>
    <div class="tabs">
      <van-tabs v-model="active" color="blue">
        <van-tab title="梦工厂">
          <van-row type="flex" class="list">
            <van-col span="5">
              <van-sidebar
                class="mun"
                :style="{ height: height + 'px' }"
                v-model="activeKey"
                @change="change"
                :a="height"
              >
                <van-sidebar-item
                  v-for="item in fldata"
                  :key="item.suId"
                  :title="item.name"
                />
              </van-sidebar>
            </van-col>
            <van-col span="19">
              <div class="content" :style="{ height: height - 60 + 'px' }">
                <van-card
                  v-for="item in list"
                  :key="item.suId"
                  :desc="item.background"
                  :title="item.title"
                  :thumb="item.image"
                  :price="item.priceStr"
                  @click="detail(item.suId)"
                />
                <van-divider>到底了...</van-divider>
              </div>
            </van-col>
          </van-row>
        </van-tab>
        <van-tab title="动态">
          <van-divider>暂无动态</van-divider>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import baiyangHead from "../assets/baiyang-head.jpg";
import xiaopengHead from "../assets/xiaopeng-head.jpg";
import kankanHead from "../assets/kankan.png";
import caijingHead from "../assets/caijing-head.jpg";
import axios from "axios";
export default {
  name: "List",
  components: {},
  props: {},
  data() {
    return {
      activeKey: "",
      active: "梦工厂",
      fldata: [],
      list: [],
      headData: {},
      height: 0,
      baiyang: {
        title: "白羊座梦工场",
        msg: "送给白羊座的定制创意礼物",
        msg1: "白羊座的人，单纯热烈没心机，做事即使不惊艳，内心也永远不服输。",
        head: baiyangHead,
      },
      xiaopeng: {
        title: "小鹏汽车梦工场",
        msg: "无印鹏品",
        msg1: "小鹏梦工场，精美周边等你发现",
        head: xiaopengHead,
      },
      kankan: {
        title: "侃侃的梦工厂",
        msg: "中国内地女歌手",
        msg1: "欢迎来到我的专属定制梦工厂",
        head: kankanHead,
      },
      caijing: {
        title: "《财经》 杂志梦工厂",
        msg: "独立、独家、独到",
        msg1: "由中国证券市场缔造团队创刊，见证中国金融市场成长。",
        head: caijingHead,
      },
      name: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    change(idx) {
      // let data = require("../assets/json/" +
      //   this.name +
      //   "/" +
      //   this.fldata[idx].categoryId);
      axios
        .get(
          "./json/" + this.name + "/" + this.fldata[idx].categoryId + ".json"
        )
        .then((res) => {
          this.list = res.data;
        });
    },

    detail(id) {
      this.$router.push({ name: "Detail", query: { id, name: this.name } });
    },
  },
  created() {
    let name = "baiyang";
    switch (this.$route.query.id) {
      case "1":
        this.headData = this.baiyang;
        name = "baiyang";
        break;
      case "2":
        this.headData = this.xiaopeng;
        name = "xiaopeng";
        break;
      case "3":
        this.headData = this.kankan;
        name = "kankan";
        break;
      case "4":
        this.headData = this.caijing;
        name = "caijing";
        break;
      default:
        this.headData = this.baiyang;
        break;
    }
    this.name = name;
    // this.fldata = require("../assets/json/" + name + "/" + name + ".json");
    axios.get("./json/" + name + "/" + name + ".json").then((res) => {
      this.fldata = res.data;
      this.change(0);
    });
    let height = document.documentElement.clientHeight - 250;
    this.height = height;
  },
  mounted() {},
};
</script>
<style  scoped>
.wrapper {
  overflow: hidden;
}
.mun {
  position: fixed;
  text-align: center;
  /* height:300px; */
  overflow-y: auto;
}
.content {
  overflow-y: auto;
}
.van-card__price-currency,
.van-card__price {
  color: red !important;
}
.top {
  width: 100%;
  text-align: center;
  padding: 20px 0px;
  color: #fff;
  height: 200px;
  position: fixed;
  z-index: 9;
}
.baiyang {
  background: url(../assets/baiyang-bg.png) no-repeat 100%;
}
.caijing {
  background: url(../assets/caijing-bg.jpg) no-repeat 100%;
}
.xiaopeng {
  background: url(../assets/xiaopeng-bg.png) no-repeat 100%;
}
.kankan {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url(../assets/kankan.png) no-repeat center center;
  background-size: 60%;
}
.tabs {
  position: fixed;
  width: 100%;
  margin-top: 20px;
}
h2 {
  font-size: 18px;
  margin-top: 5px;
}
.p1 {
  font-size: 12px;
  color: #66c166;
  margin-top: 5px;
}
.p2 {
  font-size: 14px;
  margin-top: 5px;
}
.list {
  overflow: hidden;
  padding: 10px 0;
}
</style>
 