<template>
	<div id="new-element">
		<div class="md-layout md-gutter md-alignment-center">
			<div class="md-layout-item md-xlarge-size-40 md-large-size-50 md-medium-size-33 md-small-size-100 md-xsmall-size-100">
				<form @submit.prevent="saveTaqueria">
				 	<div>
						<md-toolbar :md-elevation="1">
					      <span class="md-title">Registro</span>
					    </md-toolbar>
					    <md-list class="md-double-line">
					    	<md-subheader>Información General</md-subheader>
					    	<md-list-item>
						        <md-icon class="md-primary">exposure_plus_1</md-icon>
						        <md-field>
							      <label>Id</label>
							      <md-input v-model="taqId"></md-input>
							    </md-field>
					        </md-list-item>
					    	<md-list-item>
						        <md-icon class="md-primary">store</md-icon>
						        <md-field>
							      <label>Nombre</label>
							      <md-input v-model="name"></md-input>
							    </md-field>
					        </md-list-item>
					        <md-list-item>
						        <md-icon class="md-primary">location_city</md-icon>
						        <md-field>
							      <label>Dirección</label>
							      <md-input v-model="address"></md-input>
							    </md-field>
					        </md-list-item>
					        <md-list-item>
						        <md-icon class="md-primary">phone</md-icon>
						        <md-field>
							      <label>Teléfono</label>
							      <md-input v-model="phone"></md-input>
							    </md-field>
					        </md-list-item>
					        <md-list-item>
						        <md-icon class="md-primary">photo_camera</md-icon>
						        <md-field>
							      <label>Foto</label>
							      <md-input v-model="urlImage"></md-input>
							    </md-field>
					        </md-list-item>
					    </md-list>
					    <md-list class="md-double-line">
					    	<md-subheader>Tipo de Negocio</md-subheader>
				    			<md-radio v-model="radio" class="radioOp" value="puesto">Puesto</md-radio>
				    			<md-radio v-model="radio" class="radioOp" value="local">Local</md-radio>
				    			<md-radio v-model="radio" class="radioOp" value="restaurante">Restaurante</md-radio>
					    </md-list>
				       		<md-button type="submit" class="md-raised md-primary" @click="second = true">Guardar</md-button>
							<md-button class="md-raised" to="/">Cancelar</md-button>
					</div>
				</form>	
			</div>
		</div>
      		<!--
      			<div class="viewport">
					<md-toolbar :md-elevation="1">
				      <span class="md-title">Amenidades</span>
				    </md-toolbar>
				    <md-list class="md-double-line">
				    	<md-list-item v-for="ame in amenidades" v-bind:key="ame.id">
				    		<md-icon class="md-primary">{{ame.icon}}</md-icon>
				    		<div class="md-list-item-text">
						    	<md-checkbox v-model="selectedAmen"  v-bind:value="ame.id">{{ame.name}}</md-checkbox>
							</div>
				        </md-list-item>
				    </md-list>
				</div>
      		
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
      		-->
	</div>
</template>
<script>
	import db from './firebaseInit'
	export default{
		name:'new-element',
		data: () => ({
			taqId:0,
			name: 'Taquería',
			address: 'Av Siempre Viva',
      		phone: '55-65-98569',
      		radio: 'puesto',
      		urlImage:'',
      		amenidades:[],
      		selectedAmen:[],
      		facebook:'',
      		instagram:'',
      		website:'www.tacofy.com'
		}),
		methods:{
			saveTaqueria(){
				db.collection('taquerias').add({
					taq_id:this.taqId,
					name:this.name,
					address:this.address,
					phone:this.phone,
					type:this.radio,
					picture:this.urlImage
				})
				.then(docRef => {
					this.$router.push('/')
					})
				.catch(	error=> console.log(error))
			}
		},
	  	created(){
	  		db.collection('amenidades').get().then(
	  			querySnapshot=>{
	  				querySnapshot.forEach(doc =>{
	  					console.log('objeto: '+doc.data().taq_id)
	  					const data = {
	  						'id':doc.id,
	  						'name':doc.data().name,
	  						'icon':doc.data().icon
	  					}
	  					this.amenidades.push(data)
	  				})
	  			})
	  	}
	}
</script>
<style lang="scss" scoped>
  .radioOp{
  	padding-left: 30px;
  }
</style>