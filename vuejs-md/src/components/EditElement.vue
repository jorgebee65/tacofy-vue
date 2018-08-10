<template>
	<div id="edit-element">
		<div class="md-layout md-gutter md-alignment-center">
			<div class="md-layout-item md-xlarge-size-40 md-large-size-50 md-medium-size-33 md-small-size-100 md-xsmall-size-100">
				<form @submit.prevent="updateTaq">
				 	<div>
						<md-toolbar :md-elevation="1">
					      <span class="md-title">Editar</span>
					    </md-toolbar>
					    <md-list class="md-double-line">
					    	<md-subheader>Información General</md-subheader>
					    	<md-list-item>
						        <md-icon class="md-primary">exposure_plus_1</md-icon>
						        <md-field>
							      <label>Id</label>
							      <md-input v-model="taqId" disabled ></md-input>
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
					        <md-card>
						      <md-card-header>
						        <md-card-header-text>
						          <div class="md-title">{{name}}</div>
						          <div class="md-subhead">Foto Principal</div>
						        </md-card-header-text>

						        <md-card-media md-big>
						         	<img v-bind:src="urlImage" />
						        </md-card-media>
						      </md-card-header>

						      <md-card-actions>
						        <md-button>Eliminar</md-button>
						        <md-button>Cambiar</md-button>
						      </md-card-actions>
						    </md-card>
					         
					        <md-list-item>
						        <md-field>
							      <label>Descripción</label>
							      <md-textarea v-model="description"></md-textarea>
							    </md-field>
						    </md-list-item>
					    </md-list>
					    <md-list class="md-double-line">
					    	<md-subheader>Tipo de Negocio</md-subheader>
				    			<md-radio v-model="radio" class="radioOp" value="puesto">Puesto</md-radio>
				    			<md-radio v-model="radio" class="radioOp" value="local">Local</md-radio>
				    			<md-radio v-model="radio" class="radioOp" value="restaurante">Restaurante</md-radio>
					    </md-list>
					    <md-button type="submit" class="md-raised md-primary">Actualizar</md-button>
						<md-button class="md-raised" :md-ripple="false" to="/">Cancelar</md-button>
					</div>
				</form>	
			</div>
		</div>
	</div>
</template>
<script>
	import db from './firebaseInit'
	export default{
		name:'edit-element',
		data(){
			return {
				taqId:null,
	  			name:null,
	  			address:null,
	  			urlImage:null,
	  			phone:null,
	  			radio:null,
	  			description:null
			}
		},
		beforeRouteEnter(to,from,next){
			db.collection('taquerias').where('taq_id',
				'==',to.params.taq_id).get()
			.then(querySnapshot =>{
				querySnapshot.forEach(doc => {
					next(vm =>{
						vm.taqId=doc.data().taq_id
	  					vm.name=doc.data().name
	  					vm.address=doc.data().address
	  					vm.urlImage=doc.data().picture
	  					vm.phone=doc.data().phone
	  					vm.radio=doc.data().type
	  					vm.description=doc.data().description
					})
				})
			})
		},
		watch:{
			'$route':'fetchData'
		},
		methods:{
			fetchData(){
				db.collection('taquerias').where('taq_id',
				'==',this.$route.params.taq_id).get()
			.then(querySnapshot =>{
				querySnapshot.forEach(doc => {
					this.taqId=doc.data().taq_id
	  				this.name=doc.data().name
	  				this.address=doc.data().address
	  				this.urlImage=doc.data().picture
	  				this.phone=doc.data().phone
	  				this.radio=doc.data().type
	  				this.description=doc.data().description
				})
			})
			},
			updateTaq(){
				db.collection('taquerias').where('taq_id',
				'==',this.$route.params.taq_id).get()
			.then(querySnapshot =>{
				querySnapshot.forEach(doc => {
					doc.ref.update({
						name:this.name,
						address: this.address,
						picture: this.urlImage,
						phone: this.phone,
						type: this.radio,
						description: this.description
					}).then(()=>{
						this.$router.push({name:'view-element',
							params:{taq_id:this.taqId}})
					})
				})
			})
			}
		}
	}
</script>
<style lang="scss" scoped>
  .radioOp{
  	padding-left: 30px;
  }
</style>