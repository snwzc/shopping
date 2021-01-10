<template>
  <div class="wrapper">

    <van-row type="flex">
      <van-col span="5">
        <van-sidebar
          class='mun'
          v-model="activeKey"
          @change='change'
        >
          <van-sidebar-item
            v-for="item in fldata"
            :key="item.suId"
            :title="item.name"
          />
        </van-sidebar>
      </van-col>
      <van-col span="19">

        <van-card
          v-for="item in list"
          :key="item.suId"
          :desc="item.background"
          :title="item.title"
          :thumb="item.image"
          :price="item.priceStr"
          @click="detail(item.suId)"
        />

      </van-col>
    </van-row>

  </div>
</template>

<script>
const fldata = require('../json/fenlei')
export default {
  name: 'List',
  components: {},
  props: {},
  data () {
    return {
      activeKey: '',
      fldata,
      list: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    change (idx) {
      let data = require('../json/' + fldata[idx].categoryId)
      this.list = data
    },
    detail (id) {
      console.log(id);
      this.$router.push({ name: 'Detail', query: { id } })
    }
  },
  created () { },
  mounted () {
    this.change(1)
  }
}
</script>
<style  scoped>
.mun {
  position: fixed;
  text-align: center;
}
.van-card__price-currency,
.van-card__price {
  color: red !important;
}
</style>
 