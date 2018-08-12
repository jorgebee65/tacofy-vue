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
							      <md-input v-model="taqId" required></md-input>
							    </md-field>
					        </md-list-item>
					    	<md-list-item>
						        <md-icon class="md-primary">store</md-icon>
						        <md-field>
							      <label>Nombre</label>
							      <md-input v-model="name" required></md-input>
							    </md-field>
					        </md-list-item>
					        <md-list-item>
						        <md-icon class="md-primary">location_city</md-icon>
						        <md-field>
							      <label>Dirección</label>
							      <md-input v-model="address" required></md-input>
							    </md-field>
					        </md-list-item>
					        <md-list-item>
						        <md-icon class="md-primary">phone</md-icon>
						        <md-field>
							      <label>Teléfono</label>
							      <md-input v-model="phone" required></md-input>
							    </md-field>
					        </md-list-item>
					        <md-list-item>
						        <md-icon class="md-primary">photo_camera</md-icon>
						        <md-field>
							      <label>Foto</label>
							      <md-file @change="onFileSelected" />
							    </md-field>
					        </md-list-item>
					        <img v-bind:src="urlImage" />
					        <md-list-item>
						        <md-field>
							      <label>Descripción</label>
							      <md-textarea v-model="description" required></md-textarea>
							    </md-field>
						    </md-list-item>
					    </md-list>
					    <md-list class="md-double-line">
					    	<md-subheader>Tipo de Negocio</md-subheader>
				    			<md-radio v-model="radio" class="radioOp" value="puesto">Puesto</md-radio>
				    			<md-radio v-model="radio" class="radioOp" value="local">Local</md-radio>
				    			<md-radio v-model="radio" class="radioOp" value="restaurante">Restaurante</md-radio>
					    </md-list>
				       		
					</div>
					<div class="viewport">
						<md-toolbar :md-elevation="1">
					      <span class="md-title">Amenidades</span>
					    </md-toolbar>
					    <md-list class="md-double-line">
					    	<md-list-item v-for="ame in amenidades" v-bind:key="ame.id">
					    		<md-icon class="md-primary">{{ame.icon}}</md-icon>
					    		<div class="md-list-item-text">
							    	<md-checkbox v-model="selectedAmen"  v-bind:value="ame">{{ame.name}}</md-checkbox>
								</div>
					        </md-list-item>
					    </md-list>
					</div>
						<md-button type="submit" class="md-raised md-primary" @click="second = true">Guardar</md-button>
						<md-button class="md-raised" to="/">Cancelar</md-button>
				</form>	
      			<!--div class="viewport">
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
				</div-->
			</div>
      	</div>
	</div>
</template>
<script>
	import db from './firebaseInit'
	import firebase from 'firebase'
	export default{
		name:'new-element',
		data: () => ({
			taqId:0,
			name: 'Taqueria Los ',
			address: 'Call San Felipe Neri 987',
      		phone: '(272) 87 5-9887',
      		radio: 'puesto',
      		image:null,
      		amenidades:[],
      		selectedAmen:[],
      		showDialog:false,
      		urlImage:'',
      		description:'Los feligreses de esta catedral del taco estilo Tixtla, Guerrero, vienen a postrarse ante un plato chico, mediano o grande del exquisito caldo blanco con su consabido maíz en grano. '
		}),
		methods:{
			saveTaqueria(){
				if(!this.image){
					return
				}
				let key
				db.collection('taquerias').add({
					taq_id:this.taqId,
					name:this.name,
					address:this.address,
					phone:this.phone,
					type:this.radio,
					description: this.description,
					amenities: this.selectedAmen
				})
				.then(docRef => {
					key = this.taqId
					console.log('guardado exitoso '+key)
					return key
					})
				.then(key =>{
					const filename = this.image.name
					console.log('filename: '+filename)
					if (!filename || !filename.length) { return }
					let ext = filename.slice(filename.lastIndexOf('.'))
					return firebase.storage().ref('taquerias/'+key+'.'+ext).put(this.image)
				})
				.then(fileData=>{
					return fileData.ref.getDownloadURL()
				})
				.then(downloadURL => {
					console.log('File available at', downloadURL)
					this.urlImage = downloadURL
					console.log('urImage: '+this.urlImage)
					console.log('key: '+key)
					db.collection('taquerias').where('taq_id','==',key).get()
					.then(querySnapshot =>{
						querySnapshot.forEach(doc => {
							doc.ref.update({
								picture: this.urlImage
							})
						})
					})
					//this.showDialog = true
					this.$toasted.show("Taqueria guardada correctamente", { 
						 theme: "bubble", 
						 position: "top-right", 
						 duration : 5000
					})
					this.$router.push('/')
				})
				.catch(	error=> console.log(error))
			},
			onFileSelected(event){
				console.log('onFileSelected')
				const files = event.target.files
				const fileReader = new FileReader()
				fileReader.addEventListener('load', ()=>{
					this.urlImage = fileReader.result
				})
				fileReader.readAsDataURL(files[0])
				this.image = files[0]
			},
			goHome(){
				this.$router.push('/')
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
  .contentPnl{
  	padding-left: 30px;
  	padding-right: 30px;
  }
</style>