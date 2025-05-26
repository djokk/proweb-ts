<!-- <template>
  <div class="loading">

  </div>
</template>

<style scoped>
.loading {
  width: 100%;
  height: 100%;
  background: #edead8;
  position: absolute;
  top: 0;
  left: 0;
}
</style> -->

<template>
  <div class="loading">
    <div class="lds-ripple">
      <div> </div>
      <div></div>
    </div>
  </div>
</template>

<style>
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F9FAF5;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
}

.lds-ripple div {
  position: absolute;
  /* border: 4px solid #fff; */
  border: 4px solid #edead8;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    /* top: 36px;
    left: 36px; */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    opacity: 0;
  }

  4.9% {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    opacity: 0;
  }

  5% {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 192px;
    height: 192px;
    opacity: 0;
  }
}
</style>
