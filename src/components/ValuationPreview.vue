<template>
    <div class="preview-box">
        <div class="preview-title">North Beach Villa</div>
        <div class="preview-content">
            {{ address }}
            <br><br>
            Created on     {{ createdOn }}
            <br><br><br><br>
            <span>
                Cap Rate     {{ capRate }}%
                <br>
                PPSF   ${{ PPSF }}
            </span>
            <span id="price">${{ price }}</span>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      title: 'North Beach Villa',
      address: '690 Chestnut Street, San Francisco, CA 94133',
      capRate: 4.50,
      PPSF: 125.22,
      createdOn: '23-01-2017',
      price: 7000000
    }
  }
}
</script>
<style scoped>
</style>
