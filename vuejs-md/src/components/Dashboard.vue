<template>
	<div id="dashboard">
		<h3>Taquerias</h3>
		<div class="md-layout md-gutter md-alignment-center">
			<div class="md-layout-item md-xlarge-size-20 md-large-size-25 md-medium-size-33 md-small-size-100 md-xsmall-size-100">
	      		<md-input v-model="search" placeholder="buscar"/>
			    <md-icon>search</md-icon>
			</div>
  		</div>
		<div class="md-layout md-gutter md-alignment-center">
			<div class="md-layout-item md-xlarge-size-20 md-large-size-25 md-medium-size-33 md-small-size-100 md-xsmall-size-100" 
				v-for="taq in filteredTaqs" v-bind:key="taq.id">
	          <md-card md-with-hover>
	          	<md-card-media>
	          		<img v-bind:src="taq.picture"/>
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
	</div>
</template>
<script>
	import db from './firebaseInit'
	export default{
		name: 'dashboard',
		data(){
			return{
				taquerias:[],
				search:''
			}
		},
	  	created(){
	  		db.collection('taquerias').get().then(
	  			querySnapshot=>{
	  				querySnapshot.forEach(doc =>{
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
	  	},
	  	computed:{
	  		filteredTaqs:function(){
	  			return this.taquerias.filter((taq)=>{
	  				return taq.name.match(this.search)
	  			})
	  		}
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