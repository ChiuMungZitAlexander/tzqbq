<template>
  <section class="not-found">
    <section>You do not hava permission to access the current page</section>
    <h2>您没有权限访问当前页面</h2>
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