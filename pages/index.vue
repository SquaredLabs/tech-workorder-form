<template>
  <div class="form">
    <div class="header">
      <h1>CORE Tech Services Work Order Form</h1>
  
    </div>
    <div class="area account">
      <h2>Account Information</h2>
      <hr/>
      <div class="oneLiner">
          <h3>KFS Account Number</h3>
          <input class="textBox" type="text" v-model="account.KFS" placeholder="KFS #"/>
      </div>
      <div class="oneLiner">
          <h3>Account Contact</h3>
          <input class="textBox" type="text" v-model="account.Name" placeholder="Name"/>
          <input class="textBox" type="text" v-model="account.Department" placeholder="Department"/>
          <input class="textBox" type="text" v-model="account.Phone" placeholder="Phone"/>
      </div>
      <div class="oneLiner">
          <input class="textBox" type="text" v-model="account.Email" placeholder="Email"/>
          <input class="textBox" id="addressBox" type="text" v-model="account.Address" placeholder="Address"/>
      </div>
    
    </div>
    <div class="area request">

      <h2>Request Details</h2>
      <hr/>
      <div class="oneLiner">
          <h3>Type</h3>
          <input class="textBox" type="text" v-model="request.Type" placeholder="Type"/>
      </div>
      <div class="oneLiner">
          <h3>Cost Estimate</h3>
          <input class="textBox" type="text" v-model="request.CostEstimate" 
          placeholder="Cost Estimate (optional)"/>
      </div>
      <div class="oneLiner">
          <h3>TFS Unit</h3>
          <select v-model="request.TFSUnit">
            <option value="mechanical">Glass / Mechanical</option>
            <option value="electronics">Electronics / Office Equipment</option>
          </select> 
          
      </div>
      <div class="oneLiner">
        <input class="textBox" type="text" v-show="request.TFSUnit==='electronics'"
        v-model="request.MakeModel" placeholder="Make/Model"/>
        <input class="textBox" type="text" v-model="request.Location" 
        placeholder="Location"/>
        
      </div>
      
      <br/>
      <textarea class="textBox description" v-model="request.Description" placeholder="Description"/>

    </div>
    <div class="area contact">
      <h2>Contact Information</h2>
      <hr/>
      <div class="oneLiner">
        <button class="copyContact" v-on:click="copyContact">Copy Account Contact</button>
      </div>
      <div class="oneLiner">
          <input class="textBox" type="text" v-model="contact.Name" placeholder="Name"/>
          <input class="textBox" type="text" v-model="contact.Phone" placeholder="Phone"/>
          <input class="textBox" type="text" v-model="contact.Email" placeholder="Email"/>
      </div>

    </div>

    <button class="submit" v-on:click="submit">{{submitText}}</button>

  </div>
</template>

<script>
import checkBox from '~/components/checkBox.vue'
require('es6-promise').polyfill();
require('isomorphic-fetch');
const verifyForm = require('~/lib/verifyForm')

export default {
  components: {
    checkBox
  },
  data: () => ({
    account: { //Not using camel case because user may see these keys
      KFS:'',
      Name:'',
      Department:'',
      Address:'',
      Phone:'',
      Email:''
    },

    request: {
      Type:'',
      CostEstimate:0,
      TFSUnit:'',
      Description:'',
      MakeModel: '',
      Location: ''
    },

    contact: {
      Name:'',
      Phone:'',
      Email:''
    },
  }),
  methods: {
    copyContact(){
      this.contact.Name=this.account.Name
      this.contact.Phone=this.account.Phone
      this.contact.Email=this.account.Email
    },
    submit(){


fetch('/api/submit',{
    method: 'post',
    headers: {"Content-Type": "application/json; charset=utf-8",},
    body: JSON.stringify(this.$data)
  })
	.then(function(response) {
		if (response.status >= 400) {
			throw new Error("Bad response from server");
		}
		return response.json();
	})
	.then(function(stories) {
		console.log(stories);
	});
    }
  },
  computed: {
    submitText(){
      return verifyForm(this.$data)
    }
  }
}
</script>

<style>
input {
  font-size: 1em;
}

.header {
  text-align: center;
}
.header h1 {
  margin-bottom: 1em;
}
.form{
  display: flex;
  flex-direction: column;
  margin: 2em;
}
.area {
  margin: 2em;
  border: solid black 1px;
  padding: 1em;
}
.area h2 {
  margin-bottom: 1em;
}
.oneLiner {
  display: flex;
  margin-top: 1em;
  flex-wrap: wrap;
}
.oneLiner * {
  margin-top: 1em;
  flex: 1 1 0;
}
.oneLiner h3{
  margin-right: 2em;
}
.oneLiner input {
  margin-right: 1em; 
}
#addressBox {
  flex-grow: 1;
}
.description {
  width: 100%;
  margin-top: 1em;
}
.submit {
  margin: 1em 8em 0 8em;
  font-size: 1.5em;
}

</style>
