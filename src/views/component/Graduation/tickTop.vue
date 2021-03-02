<template>
  <div class='tickTop' ref='tickTop' :style="{ 'width': clientWidth + 'px' }">
    <div class="items" v-for='(item,index) in arr' :key='"arr"+index'>
      <div v-if='index === 0 || index % 10 === 0' class='tickHeightItem'><span>{{ index * 5 }}</span></div>
      <div v-else class='tickItem'></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tickTop',
  components: {},
  data() {
    return {
      clientWidth: 50000,
      graduation: 0,
      arr: [],
    };
  },
  methods: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.clientWidth = this.$refs.tickTop.clientWidth || this.clientWidth;
      this.graduation = parseInt(this.clientWidth / 5, 0);
      this.arr = Array(this.graduation).fill(1);
    });
  },
};

</script>
<style lang="less" scoped>
.tickTop {
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 50px;
  user-select: none;

  .items{
    display: flex;
    justify-content: space-between;
  }

  .tickItem {
    background-color: rgb(204, 204, 204);
    width: 1px;
    height: 5px;
    display: inline-block;
  }

  .tickHeightItem {
    background-color: rgb(204, 204, 204);
    width: 1px;
    height: 12px;
    display: inline-block;
    position: relative;

    span {
      position: absolute;
      color: #888;
      top: 18px;
      left: -4px;
      font-size: 12px;
    }
  }
}

</style>
