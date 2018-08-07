<template>
	<div id="new-element">
		 <md-steppers :md-active-step.sync="active" md-vertical md-linear>
		 	<md-step id="first" md-label="First Step" md-description="Optional" :md-editable="false" :md-done.sync="first">
		 		<div class="viewport">
				<md-toolbar :md-elevation="1">
			      <span class="md-title">Registra</span>
			    </md-toolbar>
			    <md-list class="md-double-line">
			    	<md-subheader>Información General</md-subheader>
			    	<md-list-item>
				        <md-icon class="md-primary">store</md-icon>

				        <md-field>
					      <label>Nombre</label>
					      <md-input v-model="name"></md-input>
					    </md-field>

			        </md-list-item>
			        <md-list-item>
				        <md-icon class="md-primary">phone</md-icon>

				        <md-field>
					      <label>Teléfono</label>
					      <md-input v-model="phone"></md-input>
					    </md-field>

			        </md-list-item>
			    </md-list>
			    <md-list class="md-double-line">
			    	<md-subheader>Tipo de Negocio</md-subheader>
		    			<md-radio v-model="radio" class="radioOp" value="1">Puesto</md-radio>
		    			<md-radio v-model="radio" class="radioOp" value="2">Local</md-radio>
		    			<md-radio v-model="radio" class="radioOp" value="3">Restaurante</md-radio>
			    </md-list>
			    <md-button class="md-raised md-primary" @click="setDone('first', 'second')">Continue</md-button>
			</div>
		 		
      		</md-step>
      		<md-step id="second" md-label="Second Step" :md-error="secondStepError" :md-editable="false" :md-done.sync="second">
      			<div class="viewport">
					<md-toolbar :md-elevation="1">
				      <span class="md-title">Amenidades</span>
				    </md-toolbar>
				    <md-list class="md-double-line">
				    	<md-list-item v-for="ame in amenidades">
						    <md-checkbox v-model="selectedAmen"  v-bind:value="ame.id">{{ame.descripcion}}</md-checkbox>
				        </md-list-item>
				    </md-list>
				    <md-button class="md-raised md-primary" @click="setDone('second', 'third')">Continue</md-button>
        			<md-button class="md-raised md-primary" @click="setError()">Set error!</md-button>
				</div>
      		</md-step>
      		<md-step id="third" md-label="Third Step" :md-editable="false" :md-done.sync="third">
      			<div class="viewport">
					<md-toolbar :md-elevation="1">
				      <span class="md-title">Redes Sociales</span>
				    </md-toolbar>
				    <md-list class="md-double-line">
				    	<md-subheader>Facebook</md-subheader>
				    	<md-list-item>
						    <md-icon class="md-primary">thumb_up</md-icon>
					        <md-field>
						      <label>Facebook</label>
						      <md-input v-model="facebook"></md-input>
						    </md-field>
				        </md-list-item>
				        <md-list-item>
						    <md-icon class="md-primary">camera_alt</md-icon>
					        <md-field>
						      <label>Instagram</label>
						      <md-input v-model="instagram"></md-input>
						    </md-field>
				        </md-list-item>
				        <md-list-item>
						    <md-icon class="md-primary">public</md-icon>
					        <md-field>
						      <label>Sitio Web</label>
						      <md-input v-model="website"></md-input>
						    </md-field>
				        </md-list-item>
				   </md-list>
				   <md-button class="md-raised md-primary" @click="setDone('third')">Done</md-button>
				</div>
      		</md-step>
		 </md-steppers>
		<form>
			
			
		</form>
	</div>
</template>
<script>
	import axios from 'axios'
	const URL = "http://localhost:8080/tacofy/amenidades"
	export default{
		name:'new-element',
		data: () => ({
			name: 'Taquería',
      		phone: '55-65-98569',
      		radio: false,
      		amenidades:[],
      		selectedAmen:[],
      		facebook:'',
      		instagram:'',
      		website:'www.tacofy.com',
      		active: 'first',
	        first: false,
	        second: false,
	        third: false,
	        secondStepError: null
		}),
		methods: {
	      setDone (id, index) {
	        this[id] = true

	        this.secondStepError = null

	        if (index) {
	          this.active = index
	        }
	      },
	      setError () {
	        this.secondStepError = 'This is an error!'
	      }
	    },
		mounted: function(){
		    axios.get(URL).then(response => {
		    	this.amenidades = response.data	
		    })
		  }
	}
</script>
<style lang="scss" scoped>
  .viewport {
    width: 500px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: auto;
    border: 1px solid rgba(#000, .12);
  }
  .radioOp{
  	padding-left: 30px;
  }
</style>