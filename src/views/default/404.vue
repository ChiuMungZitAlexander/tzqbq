<template>
  <section class="not-found">
    <section>404 not found</section>
    <h2>没有这个页面</h2>
  </section>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.not-found {
	text-align: center;
	margin-top: 10px;
	
	section {
	  font-size: 4em;
	  color: #80BD01;
	  text-shadow: 2px 2px 5px rgba(0, 0, 0, .6);
	}
	
	p {
	  color: lighten(#000, 35%);
	}
}
</style>