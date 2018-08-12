<template>
	<div id="view-element">
		<div class="md-layout md-gutter md-alignment-center">
			<div class="md-layout-item md-xlarge-size-50 md-large-size-50 md-medium-size-33 md-small-size-100 md-xsmall-size-100">
				<md-card class="md-card-example">
					<md-card-area md-inset>
						<md-card-media md-ratio="16:9">
				          <img v-bind:src="picture" />
				        </md-card-media>
				        <md-card-header>
				          <h2 class="md-title">{{name}}</h2>
				          <div class="md-subhead">
				            <md-icon>location_on</md-icon>
				            <span>2 miles</span>
				          </div>
				        </md-card-header>
				        <md-card-content>
		          			{{description}}
		        		</md-card-content>
					</md-card-area>
					<md-card-content>
			        <h3 class="md-subheading">Disponibilidad de horario hoy</h3>
			        <div class="card-reservation">
			          <md-icon>access_time</md-icon>
			          <div class="md-button-group">
			            <md-button>5:30PM</md-button>
			            <md-button>7:30PM</md-button>
			            <md-button>9:00PM</md-button>
			          </div>
			        </div>
			        <div>
			        	<md-chip v-for="ame in amenidades" v-bind:key="ame.id">
			        		{{ame.name}}
			        	</md-chip>
			        </div>
			      </md-card-content>

			      <md-card-actions>
			        <md-button v-bind:to="{name:'edit-element', params:{taq_id:taq_id}}" class="md-primary">Editar</md-button>
			        <md-button @click="deleteTaq" :md-ripple="false">Eliminar</md-button>
			      </md-card-actions>
				</md-card>
			</div>
		</div>
	</div>
</template>
<script>
	import db from './firebaseInit'
	export default{
		name:'view-element',
		data(){
			return {
				taq_id:null,
	  			name:null,
	  			address:null,
	  			picture:null,
	  			phone:null,
	  			description:null,
	  			amenidades:[]
			}
		},
		beforeRouteEnter(to,from,next){
			db.collection('taquerias').where('taq_id',
				'==',to.params.taq_id).get()
			.then(querySnapshot =>{
				querySnapshot.forEach(doc => {
					next(vm =>{
						vm.taq_id=doc.data().taq_id
	  					vm.name=doc.data().name
	  					vm.address=doc.data().address
	  					vm.picture=doc.data().picture
	  					vm.phone=doc.data().phone
	  					vm.description=doc.data().description
	  					vm.amenidades=doc.data().amenities
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
					this.taq_id=doc.data().taq_id
	  				this.name=doc.data().name
	  				this.address=doc.data().address
	  				this.picture=doc.data().picture
	  				this.phone=doc.data().phone
	  				this.description=doc.data().description
	  				this.amenidades=doc.data().amenities
				})
			})
			},
			deleteTaq(){
				this.$swal({
						  title: 'Are you sure?',
						  text: "You won't be able to revert this!",
						  type: 'warning',
						  showCancelButton: true,
						  confirmButtonColor: '#3085d6',
						  cancelButtonColor: '#d33',
						  confirmButtonText: 'Yes, delete it!'
						}).then((result) => {
						  if (result.value) {
						    db.collection('taquerias').where('taq_id',
							'==',this.$route.params.taq_id).get()
							.then(querySnapshot =>{
								querySnapshot.forEach(doc => {
								doc.ref.delete()
								this.$toasted.show("Taqueria eliminada correctamente", { 
									 theme: "bubble", 
									 position: "top-right", 
									 duration : 5000
								})
								this.$router.push('/')
								})
							})
						  }
						})
			}
		}
	}
</script>
<style lang="scss" scoped>
  .md-app {
    max-height: 400px;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .card-reservation {
      margin-top: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .md-icon {
        margin: 8px;
      }
    }
</style>