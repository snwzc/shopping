<template>
  <div class="wrapper">
    <van-nav-bar
      :title="detailData.detail.productName"
      left-arrow
      fixed
      @click-left="$router.back()"
    />

    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item
        v-for="(image, index) in detailData.detail.imgList"
        :key="index"
      >
        <img :src="image.smallImg" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ idx + 1 }}/{{ detailData.detail.imgList.length }}
        </div>
      </template>
    </van-swipe>
    <!-- content  -->
    <div class="content">
      <div class="price-content">
        <div class="price">￥{{ detailData.detail.diffAddressPrice }}</div>
        <div class="iocn">
          <van-icon name="like-o" />
          收藏
        </div>
      </div>
      <div class="markers-text">
        <van-icon name="location-o" />
        {{ detailData.detail.poiInfo.poiName }}
      </div>
      <div class="title">
        {{ detailData.detail.longProductName }}
      </div>
    </div>
    <div>
      <van-notice-bar :scrollable="false" mode="link" @click="show = true">
        <span
          v-for="item in detailData.detail.supplierInfo.policy"
          :key="item.policyName"
          class="tags"
        >
          <van-icon name="passed" />
          {{ item.policyName }}
        </span>
      </van-notice-bar>
    </div>
    <!-- richTextInfo -->
    <div class="text-info">
      <div class="text-item" v-for="item in info" :key="item.paramName">
        <div class="t-left">{{ item.paramName }}</div>
        <div class="t-right">{{ item.paramValue }}</div>
      </div>
      <div
        @click="showmore"
        style="
          text-align: center;
          padding: 8px 0;
          font-size: 12px;
          color: #828282;
        "
      >
        {{ ismore ? "收起" : "展开全部" }}
        <van-icon :name="ismore ? 'arrow-up' : 'arrow-down'" />
      </div>
    </div>

    <!-- html -->
    <div v-html="detailData.detail.mContent" />
    <!-- footer -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <!-- <van-goods-action-icon icon="shop-o" text="店铺" /> -->
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="shopping = true"
      />
    </van-goods-action>

    <!--  -->

    <van-action-sheet v-model="show" title="服务说明" cancel-text="确认">
      <div
        class="sheet"
        v-for="item in detailData.detail.supplierInfo.policy"
        :key="item.policyName"
      >
        <div class="zt">
          <van-icon name="passed" />
          {{ item.policyName }}
        </div>
        <div class="zmsg">
          {{ item.policyDescription }}
        </div>
      </div>
    </van-action-sheet>

    <!--  -->

    <van-sku v-model="shopping" :sku="sku" :goods="goods" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Detail",
  components: {},
  props: {},
  data() {
    return {
      detailData: {},
      idx: 0,
      show: false,
      shopping: false,
      goods: { picture: "" },
      ismore: true,
      info: [],
      name: "",
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    onChange(index) {
      this.idx = index;
    },
    showmore() {
      this.ismore = !this.ismore;
      if (this.ismore) {
        this.info = this.detailData.detail.richTextInfo;
      } else {
        this.info = this.detailData.detail.richTextInfo.slice(0, 4);
      }
    },

    setDetail() {
      let data = this.detailData.detail.sizeDetail;
      let tree = [],
        list = [];
      data.forEach((item, index) => {
        let t = {
          v: [],
          k_s: "s" + index,
        };
        let l = {
          s1: index,
          s2: index,
          price: item.priceOriginStr,
          stock_num: Math.floor(Math.random() * 10000),
        };
        let name = "";
        item.specs.forEach((item1) => {
          name += item1.des + " ";
        });
        t.v.push({
          id: index,
          name,
          imgUrl: item.smallConfirmImg,
          previewImgUrl: item.smallConfirmImg,
        });
        list.push(l);
        tree.push(t);
      });

      this.sku.tree = tree;
      this.sku.list = list;
      this.sku.price = list[0].price;
    },
  },
  created() {
    let { id, name } = this.$route.query;
    // this.detailData = require("../assets/json/" + name + "/" + id + ".json");
    axios.get("./json/" + name + "/" + id + ".json").then((res) => {
      this.detailData = res.data;
      this.goods.picture = this.detailData.detail.firstDrawImage;
      this.showmore();
      this.setDetail();
    });
  },
  mounted() {},
};
</script>
<style  scoped>
.van-swipe {
  margin-top: 46px;
}
.custom-indicator {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
  color: #fff;
}
.content {
  padding: 10px 20px;
}
.price-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price {
  color: red;
  font-size: 24px;
}
.title {
  font-family: PingFangSC-Medium;
  margin-top: 0.24rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 18px;
  color: #4a4a4a;
  margin-top: 15px;
}
.markers-text {
  margin-top: 6px;
  max-width: 375px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  color: #bf9e6b;
}
.tags {
  display: inline-block;
  margin-left: 8px;
}
.van-icon {
  vertical-align: middle;
}
.van-notice-bar {
  padding: 0;
}

.sheet {
  padding: 10px 15px;
}
.zt {
  font-size: 14px;
  color: #7e4395;
  margin-bottom: 10px;
}
.zmsg {
  color: #353535;
  font-size: 14px;
}
.text-info {
  background-color: #eee;
}
.text-item {
  display: flex;
  border-bottom: 1px solid #d9d9d9;
  padding: 10px 10px;
}
.t-left {
  min-width: 100px;
  color: #828282;
}
</style>
 