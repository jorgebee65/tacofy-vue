<template>
	<div id="dashboard">
		<h3>Dashboard</h3>
		<div>
          <md-card md-with-hover v-for="taq in taquerias" v-bind:key="taq.id">
          	<md-card-media>
          		<img v-bind:src="taq.picture" />
          	</md-card-media>
		      <md-card-header>
		        <div class="md-title">{{taq.name}}</div>
		      </md-card-header>

		      <md-card-content>
		     {{taq.address}}
		      </md-card-content>
		      <md-card-actions>
	            	<md-button v-bind:to="{name: 'view-element', params:{taq_id: taq.taq_id}}">MAS</md-button>
	          </md-card-actions>
		   </md-card>

        </div>
	</div>
</template>
<script>
	import db from './firebaseInit'
	export default{
		name: 'dashboard',
		data(){
			return{
				taquerias:[]
			}
		},
	  	created(){
	  		db.collection('taquerias').get().then(
	  			querySnapshot=>{
	  				querySnapshot.forEach(doc =>{
	  					console.log('objeto: '+doc.data().taq_id)
	  					const data = {
	  						'id':doc.id,
	  						'taq_id':doc.data().taq_id,
	  						'name':doc.data().name,
	  						'address':doc.data().address,
	  						'picture':doc.data().picture
	  					}
	  					this.taquerias.push(data)
	  				})
	  			})
	  	}
	}
</script>
<style lang="scss" scoped>
  .card-expansion {
    height: 480px;
  }

  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>