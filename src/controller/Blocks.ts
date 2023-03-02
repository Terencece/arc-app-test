class Blocks {
  async getBlockHashData(value) {
    const s = value ? value : '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa';
    return await fetch('https://blockchain.info/rawblock/' + s)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}
const blocksManager = new Blocks();
export default blocksManager;
