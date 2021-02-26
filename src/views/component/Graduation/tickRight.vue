<template>
  <div class='tickRight' ref='tickRight' :style="{ 'height': clientHeight + 'px' }">
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
      clientHeight: 1000,
      graduation: 0,
      arr: [],
    };
  },
  methods: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.clientHeight = this.$refs.tickRight.clientHeight || this.clientHeight;
      this.graduation = parseInt(this.clientHeight / 5, 0);
      this.arr = Array(this.graduation).fill(1);
    });
  },
};

</script>
<style lang="less" scoped>
.tickRight {
  width: 50px;
  height: calc(100% - 56px);
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 50px;
  flex-flow: column;
  user-select: none;

  .items {
    display: flex;
    justify-content: space-between;
  }

  .tickItem {
    background-color: rgb(204, 204, 204);
    width: 5px;
    height: 1px;
    display: inline-block;
  }

  .tickHeightItem {
    background-color: rgb(204, 204, 204);
    width: 12px;
    height: 1px;
    display: inline-block;
    position: relative;

    span {
      color: #888;
      position: absolute;
      top: -5px;
      left: 20px;
      font-size: 12px;
    }
  }
}

</style>
