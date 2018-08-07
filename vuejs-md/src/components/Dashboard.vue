<template>
	<div id="dashboard">
		<h3>Dashboard</h3>
		<div  >
          <md-card md-with-hover v-for="taq in taquerias">
          	<md-card-media>
          		<img :src="getImageUrl(taq.id)" />
          	</md-card-media>
		      <md-card-header>
		        <div class="md-title">{{taq.nombre}}</div>
		      </md-card-header>

		      <md-card-content>
		     {{taq.ubicacion}}
		      </md-card-content>
		      <md-card-actions>
	            	<md-button v-bind:to="{name: 'view-element', params:{taq_id: taq.id}}">MAS</md-button>
	          </md-card-actions>
		   </md-card>

        </div>
	</div>
</template>
<script>
	import axios from 'axios'
	const URL = "http://localhost:8080/tacofy/taquerias"
	export default{
		name: 'dashboard',
		data(){
			return{
				taquerias:[]
			}
		},
	  mounted: function(){
	    axios.get(URL).then(response => {
	    	this.taquerias = response.data	
	    })
	    $('.parallax').parallax()
	  },
	  methods:{
	    getImageUrl: function(id){
	      return "http://localhost:8080/tacofy/taquerias/"+id+"/image";
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