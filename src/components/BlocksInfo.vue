<template>
  <div>
    <div class="top-header">
      <div class="search-div">
        <input class="search-input" v-model="value" placeholder="Search Blockchain,Transaction,Addresses and Blocks" />
        <button class="search-btn" @click="search" jest="search-button">Search</button>
      </div>
    </div>
    <h5 style="margin: 100px 0 0 20px">Details</h5>
    <div class="block-container" style="padding: 20px">
      <div class="block-content-item">
        <div style="flex: 1">Hash</div>
        <div style="flex: 1">
          {{ data.hash | strShort }}
        </div>
        <div style="flex: 1">Block Index</div>
        <div style="flex: 1">
          {{ data.block_index }}
        </div>
      </div>
      <div class="block-content-item">
        <div style="flex: 1">Fee</div>
        <div style="flex: 1">
          {{ data.fee }}
        </div>
        <div style="flex: 1">Size</div>
        <div style="flex: 1">
          {{ data.size }}
        </div>
      </div>
      <div class="block-content-item">
        <div style="flex: 1">Weight</div>
        <div style="flex: 1">{{ data.weight }}</div>
        <div style="flex: 1">Version</div>
        <div style="flex: 1">{{ data.ver }}</div>
      </div>
      <div class="block-content-item">
        <div style="flex: 1">Nonce</div>
        <div style="flex: 1">{{ data.nonce }}</div>
        <div style="flex: 1">Merkle Root</div>
        <div style="flex: 1">{{ data.mrkl_root | strShort }}</div>
      </div>
    </div>
    <h5 style="margin: 20px">Transactions</h5>
    <template v-if="loading">
      <div style="text-align: center">Loading...</div>
    </template>
    <template v-else>
      <TransactionItem
        v-for="(item, index) in paginatedData"
        :key="index"
        :data="item"
        :index="index + 1"></TransactionItem>
      <div v-if="pages.length > 0" style="text-align: center; padding: 20px">
        <button style="margin-right: 12px" :disabled="pageNumber === 1" @click="prevPage"><</button>
        <button
          v-for="page in pages"
          type="button"
          :class="pageNumber === page.name ? 'active-button' : ''"
          style="margin-right: 12px"
          @click="changePage(page)">
          {{ page.name }}
        </button>
        <button @click="nextPage" :disabled="pageNumber === pageCount">></button>
      </div>
    </template>
  </div>
</template>
<script>
import blocksManager from '../controller/Blocks';
import TransactionItem from './TransactionItem.vue';
export default {
  components: { TransactionItem },
  data() {
    return {
      data: {
        tx: [],
      },
      pageNumber: 1,
      pageSize: 10,
      loading: false,
      value: '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa',
    };
  },
  watch: {
    loading(val) {
      console.log(val);
    },
  },
  computed: {
    pages(ctx) {
      const range = [];

      for (let i = ctx.pageNumber; i <= Math.min(ctx.pageNumber + 3 - 1, this.pageCount); i++) {
        range.push({
          name: i,
        });
      }
      return range;
    },
    pageCount(ctx) {
      if (ctx.data?.tx?.length > 0) {
        let l = ctx.data.tx.length,
          s = ctx.pageSize;
        return Math.ceil(l / s);
      } else {
        return 0;
      }
    },
    paginatedData(ctx) {
      if (ctx.data?.tx?.length > 0) {
        const start = (ctx.pageNumber - 1) * ctx.pageSize,
          end = start + ctx.pageSize;
        return ctx.data.tx.slice(start, end);
      }
      return 0;
    },
  },
  mounted() {
    this.search();
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    changePage(page) {
      this.pageNumber = page.name;
    },
    async search() {
      if (this.value) {
        this.loading = true;
        this.data = {};
        const result = await blocksManager.getBlockHashData(this.value);
        console.log('Success:', result);
        this.data = result;
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.top-header {
  backdrop-filter: blur(20px);
  -webkit-box-pack: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: fixed;
  width: 100%;
  padding: 20px;
  top: 0px;
  z-index: 100;
  box-sizing: border-box;
  border-bottom: 1px solid rgb(238, 238, 238);
  background-color: rgba(255, 255, 255, 0.95);
}
.search-div {
  display: flex;
  overflow: hidden;
  width: 100%;
  border-radius: 2rem;
  margin: 0px;
  border: 1px solid rgb(238, 238, 238);
  flex-direction: row;
  position: relative;
}
.search-input {
  color: rgb(0, 0, 0);
  box-sizing: border-box;
  border: none;
  font-size: 1rem;
  overflow: hidden;
  height: 40px;
  background: rgba(255, 255, 255, 0.4);
  flex: 1;
}

.search-btn {
  flex: 1;
  all: unset;
  width: 100px;
  height: 40px;
  box-sizing: border-box;
  background-color: rgb(238, 238, 238);
  cursor: pointer;
  display: grid;
  right: 0px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  -webkit-mask-repeat: no-repeat;
  place-items: center;
}

.block-container {
  backdrop-filter: blur(20px);
  -webkit-box-pack: center;
  border-bottom: 1px solid rgb(238, 238, 238);
  background-color: rgba(255, 255, 255, 0.95);
}

.block-content-item {
  display: flex;
  font-size: 10px;
}

.active-button {
  place-items: center;
  border-radius: 4rem;
  cursor: pointer;
  height: 34px;
  width: 34px;
  font-weight: 600;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255) !important;
}
</style>
