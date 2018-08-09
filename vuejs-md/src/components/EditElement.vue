<template>
	<div id="edit-element">
		<h3>Edit-element</h3>
		<form @submit.prevent="updateTaq">
		 	<div class="viewport">
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
			    <md-button type="submit" class="md-raised md-primary">Registrar</md-button>
				<md-button class="md-raised" :md-ripple="false" to="/">Cancelar</md-button>
			</div>
		</form>	
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
	  			radio:null
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
						type: this.radio
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