<template>
  <div>
    <div class="item-container">
      <div class="item-type item-type-bg">TX</div>
      <div class="item-content">
        <div>
          <div>
            <span>{{ index }}</span
            ><span class="gray-text">ID:{{ data?.hash | strShort }}</span>
          </div>
          <div class="gray-text">{{ (data.time * 1000) | dateFmt }}</div>
        </div>
        <div>
          <div>
            <span>From </span>
            <span v-if="data.inputs.length === 1" class="gray-text">
              {{ data?.inputs[0]?.prev_out.addr | strShort }}
            </span>
            <span v-else-if="data.inputs.length > 1" class="gray-text"> {{ data.inputs.length }} Input </span>
          </div>
          <div>
            <span>To </span>
            <span v-if="data.out.length === 1" class="gray-text">
              {{ data?.out[0]?.addr | strShort }}
            </span>
            <span v-else-if="data.out.length > 1" class="gray-text"> {{ data.out.length }} Output </span>
          </div>
        </div>
        <div>
          <div>
            <span>{{ data.size }} BTC</span> <span class="gray-text">• $19.94</span>
          </div>
          <div>
            <span>Fee {{ data.fee }} Sats</span> <span class="gray-text">• $0.15</span>
          </div>
        </div>
      </div>
      <div class="item-more-btn">↓</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    data: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
};
</script>
<style>
.item-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid rgb(238, 238, 238);
  align-items: flex-start;
  padding: 1rem 0px;
  margin: -1px 0px;
  box-sizing: border-box;
}

.item-type {
  margin: 0px 1rem;
  display: flex;
  flex-direction: column;
  /*flex: 1;*/
  -webkit-font-smoothing: antialiased;
}

.item-type-bg {
  height: 40px;
  width: 40px;
  aspect-ratio: 1 / 1;
  border-radius: 30px;
  align-self: flex-start;
  display: grid;
  place-content: center;
  user-select: none;
  pointer-events: none;
  font-size: 1rem;
  border: 1px solid rgb(238, 238, 238);
  background-color: transparent;
}

.item-content {
  display: grid;
  width: 50%;
  grid-template-columns: 33.333% 1fr 1fr;
  grid-template-rows: max-content;
  opacity: 1;
  flex: 1;
  font-size: 0.85rem;
  gap: 0px 5px;
}

.item-more-btn {
  cursor: pointer;
  padding-right: 20px;
  padding-top: 10px;
}

.gray-text {
  display: inline-flex;
  color: rgb(153, 153, 153);
  font-size: 0.875rem;
}
</style>
