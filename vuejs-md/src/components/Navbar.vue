<template>
	<div id="navbar">
		<md-app>
			<md-app-toolbar class="md-large md-dense md-primary">
				<div class="md-toolbar-row">
					<div class="md-toolbar-section-start">
			            <span class="md-title">Tacofy</span>
		            </div>
					<div class="md-toolbar-section-end">
			            <md-button class="md-icon-button">
			              <md-icon>more_vert</md-icon>
			            </md-button>
		            </div>
	        	</div>
		        <div class="md-toolbar-row">
		          <md-tabs class="md-primary">
		            <md-tab to="/" md-label="Home"/>
		            <md-tab to="/new" md-label="Registro"/>
		            <md-tab v-if="logOutBtn ===true" @click="logout" md-label="Cerrar Sesión"></md-tab>
		            <md-tab v-else @click="login" md-label="Iniciar Sesión"></md-tab>
		          </md-tabs>
		        </div>
	      	</md-app-toolbar>
		</md-app>
	</div>
</template>
<script>
	import firebase from 'firebase'
	export default{
		name:'dashboard',
		data(){
			return {
				logOutBtn:false,
				menuVisible: false
			}
		},
		methods:{
			validate:function(){
				console.log('validando inicio de sesión')
				if(firebase.auth().currentUser){
					console.log('Hay usuario')
					this.logOutBtn=true
				}else{
					console.log('no Hay usuario')
					this.logOutBtn=false
				}
			},
			login:function(){
				console.log('Login')
				var provider = new firebase.auth.FacebookAuthProvider()
				provider.addScope('public_profile')
				firebase.auth().signInWithPopup(provider)
				.then((datosUsuario) =>{
					alert('Inicio sesión como: '+datosUsuario.user.displayName)
					this.logOutBtn= true
				}).catch(function(error){
					console.log(error)
				})
			},
			logout:function(){
				if(confirm('Are you sure to logout?')){
					var provider = new firebase.auth.FacebookAuthProvider()
					firebase.auth().signOut()
					.then(()=>{
						this.logOutBtn= false
					})
				}
			}
		},
		mounted() {
			this.validate()
		}
	}
</script>