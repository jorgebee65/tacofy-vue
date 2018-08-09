<template>
	<div id="view-element">
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
          			Illy Coffee served with a complimentary Leonidas Belgian Chocolate with all beverages.
          			<p>
          				Phone: {{phone}}
          			</p>
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
	      </md-card-content>

	      <md-card-actions>
	        <md-button v-bind:to="{name:'edit-element', params:{taq_id:taq_id}}" class="md-primary">Editar</md-button>
	        <md-button @click="deleteTaq" :md-ripple="false">Eliminar</md-button>
	      </md-card-actions>
		</md-card>
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
	  			phone:null
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
				})
			})
			},
			deleteTaq(){
				if(confirm('Are you sure?')){
					db.collection('taquerias').where('taq_id',
				'==',this.$route.params.taq_id).get()
			.then(querySnapshot =>{
				querySnapshot.forEach(doc => {
					doc.ref.delete()
					this.$router.push('/')
				})
			})
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
  .md-card {
    width: 520px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

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