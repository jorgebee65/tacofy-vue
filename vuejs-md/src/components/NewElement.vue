<template>
	<div id="new-element">
		<h3>New-element</h3>
		<form>
			<md-field>
		      <label>Nombre</label>
		      <md-input v-model="initial"></md-input>
		    </md-field>
		    <md-field>
		      <label>Type here!</label>
		      <md-input v-model="type"></md-input>
		      <span class="md-helper-text">Helper text</span>
		    </md-field>
		</form>
	</div>
</template>
<script>
	export default{
		name:'new-element',
		data: () => ({
			initial: 'Initial Value',
      		type: null,
		})
	}
</script>